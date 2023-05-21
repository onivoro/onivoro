import { TypeOrmRepository } from "@onivoro/server-typeorm-postgres";
import { OpenAiData } from "./open-ai-data.class";

export class OpenAiDataRepository extends TypeOrmRepository<OpenAiData> {}
