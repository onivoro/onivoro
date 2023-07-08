import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PagedResponseDto } from "../dtos/paged-response.dto";

export const ApiPagedResponse = <TEntity extends Type<unknown>>(entityDto: TEntity) =>
    applyDecorators(
        ApiExtraModels(PagedResponseDto, entityDto),
        ApiOkResponse({
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
