import { Injectable } from '@nestjs/common';
import 'multer';
import { v4 } from 'uuid';
import { extractText } from '../functions/extract-text.function';
import { CreateChatCompletionResponse, OpenAIApi } from 'openai';
import { encoding_for_model, TiktokenModel } from '@dqbd/tiktoken';
import { createWriteStream } from 'node:fs';
const similarity = require('compute-cosine-similarity');
import { execPromise } from '@onivoro/server-process';
import { OpenAiAnswer } from '../classes/open-ai-answer.class';
import { OpenAiData } from '../classes/open-ai-data.class';
import { AxiosResponse } from 'axios';
import { ServerOpenAiConfig } from '../classes/server-open-ai-config.class';
import { tokenizeText } from '../functions/tokenize-text.function';

@Injectable()
export class OpenAiService {
  constructor(
    public config: ServerOpenAiConfig,
    public openai: OpenAIApi
  ) {
  }

  async post(file: Express.Multer.File) {
    let records: OpenAiData[] = [];
    // sanitize file name here first (or let S3 service do it)
    try {
      await this.writeBufferToDisk(file.originalname, file);
      const contents = await extractText(file.originalname);
      const data: string[] = tokenizeText(contents, this.config.GPT_MODEL);
      if(!data?.length) {
        return [];
      }
      records = await this.genEmbeddings(data);
      await this.deleteFile(file.originalname);
    } catch (error: any) {
      console.error(error);
    }
    return records;
  }

  async ask(question: string, records: OpenAiData[]): Promise<OpenAiAnswer[]> {
    const introduction = this.config.introduction;
    const questionEmbeddingData = await this.genEmbeddings([question]);
    const questionEmbedding = questionEmbeddingData[0]['embedding'];
    const recordEmbeddings = [];
    records.forEach((rec) => {
      recordEmbeddings.push({
        similarity: similarity(rec.embedding, questionEmbedding),
        text: rec.text,
      });
    });
    recordEmbeddings.sort((a, b) => b.similarity - a.similarity);
    let message = introduction;
    for (let x = 0; x < 4; x++) {
      message += recordEmbeddings[x].text + '\n';
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
        temperature: 0,
      });
      console.log(response);
      console.log(response['data']['choices']);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
    const answers: OpenAiAnswer[] = [
      {
        id: v4(),
        question: question,
        answer: response['data']['choices'][0]['message']['content'],
      },
    ];

    return answers;
  }

  private async genEmbeddings(fileData: string[]): Promise<OpenAiData[]> {
    const response = await this.openai.createEmbedding({
      model: this.config.EMBEDDING_MODEL,
      input: fileData,
    });
    const records: OpenAiData[] = [];
    for (let i = 0; i < fileData.length; i++) {
      records[i] = {
        id: v4(),
        text: fileData[i],
        embedding: response?.data?.data[i]?.embedding || [1, 1, 1],
      };
    }
    return records;
  }

  private async deleteFile(path: string) {
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
