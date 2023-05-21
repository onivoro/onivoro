import { TypeOrmRepository } from "@onivoro/server-typeorm-postgres";
import { OpenAiAnswer } from "./open-ai-answer.class";

export class OpenAiAnswerRepository extends TypeOrmRepository<OpenAiAnswer> {}
