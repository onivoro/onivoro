import { TypeOrmRepository } from "@onivoro/server-typeorm-postgres";
import { OpenAiAnswer } from "./open-ai-answer.class";
import { Injectable } from "@nestjs/common";

export class OpenAiAnswerRepository extends TypeOrmRepository<OpenAiAnswer> {}
