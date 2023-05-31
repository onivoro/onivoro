import { Injectable } from '@nestjs/common';
import 'multer';
import { v4 } from 'uuid';
import { extractText } from '../functions/extract-text.function';
import { CreateChatCompletionResponse, CreateEmbeddingResponseDataInner, OpenAIApi } from 'openai';
import { encoding_for_model, TiktokenModel } from '@dqbd/tiktoken';
import { createWriteStream } from 'node:fs';
const similarity = require('compute-cosine-similarity');
import { execPromise } from '@onivoro/server-process';
import { OpenAiAnswer } from '../classes/open-ai-answer.class';
import { OpenAiData } from '../classes/open-ai-data.class';
import { AxiosResponse } from 'axios';
import { ServerOpenAiConfig } from '../classes/server-open-ai-config.class';

@Injectable()
export class OpenAiService {
  constructor(
    public config: ServerOpenAiConfig,
    public openai: OpenAIApi
  ) {
  }

  async post(file: Express.Multer.File, persister: (data: OpenAiData[]) => Promise<void>) {
    try {
      await this.writeBufferToDisk(file.originalname, file);

      const contents = await extractText(file.originalname);

      await this.tokenizeTextAndPersistAsEmbedding(contents, persister);

      await this.deleteFile(file.originalname);
    } catch (error: any) {
      console.error(error);
    }
  }

  async tokenizeTextAndPersistAsEmbedding(rawContents: string, persister: (data: OpenAiData[]) => Promise<void>): Promise<string[]> {
    if (!rawContents) {
      return [];
    }

    const sentences = rawContents
      .replaceAll(/\s{2,}/g, '')
      .replaceAll('\u0000', '')
      .replaceAll(/(\r\n|\n|\r)/gm, '')
      .split(this.config.sentenceDeliminator);
    // todo: add configurable hook here to sanitize contents

    const lengthNormalizedSentences = this.normalizeLength(sentences);

    for await (const sentence of lengthNormalizedSentences) {
      let errorEncountered = false;
      let records: OpenAiData[];

      // todo: make this code more concise and readable
      try {
        records = errorEncountered
          ? [this.embeddingToDataModel(sentence)]
          : await this.genEmbeddings([sentence]);
      } catch (error) {
        errorEncountered = true;
        console.error(error);
        records = [this.embeddingToDataModel(sentence)];
      }

      await persister(records);
    }
  }

  async ask(question: string, records: OpenAiData[]): Promise<OpenAiAnswer> {
    const introduction = this.config.introduction;
    const questionEmbeddingData = await this.genEmbeddings([question]);
    const questionEmbedding = questionEmbeddingData[0]['embedding'];
    const recordEmbeddings = records.map((input) => ({
      similarity: similarity(input.embedding, questionEmbedding),
      text: input.text,
      input
    }));
    recordEmbeddings.sort((a, b) => b.similarity - a.similarity);
    let message = introduction;
    const iterations = Math.min(this.config.maxQuestionInput, recordEmbeddings.length);
    const relevantInput = [];
    for (let x = 1; x <= iterations; x++) {
      const recordEmbedding = recordEmbeddings[x - 1];
      message += recordEmbedding.text + '\n';
      relevantInput.push(recordEmbedding.input);
    }
    message += question;
    const messages = [
      {
        role: 'system' as any,
        content: 'You answer questions based on the information available.',
      },
      { role: 'user', content: message },
    ];
    let response: AxiosResponse<CreateChatCompletionResponse, any>;
    try {
      response = await this.openai.createChatCompletion({
        model: this.config.GPT_MODEL,
        messages,
        temperature: this.config.temperature,
      });
    } catch (error) {
      if (error.response) {
        console.error(error.response.status);
        console.error(error.response.data);
      } else {
        console.error(error.message);
      }
    }
    const answer: OpenAiAnswer = {
        id: v4(),
        question: question,
        answer: response['data']['choices'][0]['message']['content'],
        relevantInput
      };

    return answer;
  }

  async genEmbeddings(input: string[]): Promise<OpenAiData[]> {
    const response = await this.openai.createEmbedding({
      model: this.config.EMBEDDING_MODEL,
      input,
    });

    return (response?.data?.data || [])
      .map((embedding, index) => this.embeddingToDataModel(input[index], embedding));
  }

  private normalizeLength(sentences: string[]) {

    const enc = encoding_for_model(this.config.GPT_MODEL as TiktokenModel);
    const normalizedLengthGroups = [];

    let i = 0;
    let aggregatedText = '';
    let tokenTotal = 0;
    const sentenceCount = sentences.length;

    while (i < sentenceCount) {
      const sentence = sentences[i];
      const newAggregatedText = aggregatedText ? `${aggregatedText}. ${sentence}` : sentence;
      const tokenCount = enc.encode(newAggregatedText);
      const isOverLimit = tokenCount.length > this.config.maxTokensPerTextChunk * this.config.tokenRatio;
      const isLast = i === (sentenceCount - 1);
      if (
        isOverLimit || isLast
      ) {
        tokenTotal += enc.encode(aggregatedText).length;
        normalizedLengthGroups.push(aggregatedText);
        aggregatedText = '';
      } else {
        aggregatedText = newAggregatedText;
      }

      i++;
    }

    enc.free();

    // todo: add the aggregated token count to the individual records instead of logging it out here
    console.log(normalizedLengthGroups.length, tokenTotal);

    return normalizedLengthGroups;
  }

  private embeddingToDataModel(text: string, embeddingResponse?: CreateEmbeddingResponseDataInner) {
    const { embedding } = embeddingResponse || { embedding: [] };

    return {
      id: v4(),
      text,
      embedding,
    };
  }

  private async deleteFile(path: string) {
    // todo: use node:fs instead of shell
    await execPromise(`rm -rf "${path}"`);
  }

  private async writeBufferToDisk(
    inputFilePath: string,
    file: Express.Multer.File
  ) {
    const ws = createWriteStream(inputFilePath);
    ws.write(file.buffer);
    const closed = new Promise((r) => ws.on('close', r));
    ws.close();
    await closed;
  }
}
