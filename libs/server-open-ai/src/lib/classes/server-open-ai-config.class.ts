export class ServerOpenAiConfig {

    constructor(
        public apiKey: string,
        public EMBEDDING_MODEL = 'text-embedding-ada-002',
        public GPT_MODEL = 'gpt-3.5-turbo',
        public introduction = 'Use the information available to answer the subsequent question. If the answer cannot be found in the articles, write "I could not find an answer."',
        public maxTokensPerTextChunk = 1000,
        public sentenceDeliminator = '. ',
        public tokenRatio = 0.75,
        public maxQuestionInput = 3,
        public temperature = 0,
    ) {}
}