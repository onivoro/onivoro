import { applyDecorators } from "@nestjs/common";
import { Entity } from "typeorm";
import snake from 'lodash.snakecase';

export const Table = (EntityClass: { name: string }) => {
    const tableName = snake(EntityClass.name);
    return applyDecorators(Entity(tableName));
};
