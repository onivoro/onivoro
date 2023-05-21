import { TypeOrmRepository } from "@onivoro/server-typeorm-postgres";
import { OpenAiData } from "./open-ai-data.class";
import { Injectable } from "@nestjs/common";

export class OpenAiDataRepository extends TypeOrmRepository<OpenAiData> {}
