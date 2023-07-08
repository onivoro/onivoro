import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { PagedResponseDto } from "../dtos/paged-response.dto";

export const ApiPagedResponse = <TEntity extends Type<unknown>>(entityDto: TEntity) =>
    applyDecorators(
        ApiExtraModels(PagedResponseDto, entityDto),
        ApiResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(PagedResponseDto) },
                    {
                        properties: {
                            data: {
                                type: 'array',
                                items: { $ref: getSchemaPath(entityDto) },
                            },
                        },
                    },
                ],
            },
        })
    );
