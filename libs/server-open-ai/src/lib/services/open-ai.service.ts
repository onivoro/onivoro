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

@Injectable()
export class OpenAiService {
  constructor(
    public config: ServerOpenAiConfig,
    public openai: OpenAIApi
  ) {
  }

  async post(file: Express.Multer.File) {
    let records: OpenAiData[] = [];
    try {
      await this.writeBufferToDisk(file.originalname, file);
      const data: string[] = await this.processFile(file.originalname);
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

  private async processFile(originalname: string): Promise<string[]> {
    const max_tokens = 1000;
    const contents = await extractText(originalname);
    const extractDataRegEx = /{{([\s\S]*?)}}/;
    const dataArray = contents
      .split(extractDataRegEx)
      .map((i) => {
        return i.replaceAll(/^\s+|\s+$/g, '');
      })
      .filter(Boolean)
      .map((i) => {
        return i.replaceAll(/(\r\n|\n|\r)/gm, '');
      });
    const titles = dataArray
      .filter((el, ind) => ind % 2 === 0)
      .map((i) => {
        return i.replaceAll(/(\r\n|\n|\r)/gm, '');
      });
    const filteredDataArray = dataArray.filter((el, ind) => ind % 2 !== 0);
    const enc = encoding_for_model(this.config.GPT_MODEL as TiktokenModel);
    let arrayOfSingleSentences = [];
    titles.forEach((text, i) => {
      const mainText = filteredDataArray[i];
      const tempArray = mainText.split(/(?!. )/g);
      let placeholder = '';
      tempArray.forEach((txt, i) => {
        if (placeholder) {
          placeholder += `${txt}`;
        } else {
          placeholder = `${text}: ${txt}`;
        }
        const tokenCount = enc.encode(placeholder);
        if (
          tokenCount.length > max_tokens * 0.75 ||
          tempArray.length === i + 1
        ) {
          arrayOfSingleSentences.push(placeholder);
          placeholder = '';
        }
      });
    });
    enc.free();

    arrayOfSingleSentences = arrayOfSingleSentences.map((text) => {
      return text?.replaceAll('\u0000', '');
    });
    console.log(arrayOfSingleSentences);
    return arrayOfSingleSentences
      .map((_) => _.trim())
      .filter(Boolean)
      .filter((sent) => sent.length > 16);
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
