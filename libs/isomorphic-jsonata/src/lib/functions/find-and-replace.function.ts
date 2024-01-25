import { IJsonataExpression } from "../interfaces/jsonata-expression.interface";
import { IJsonataFunctions } from "../interfaces/jsonata-fn-config.interface";
import { executeJsonata } from "./execute-jsonata.function";

export async function findAndReplace<TContext>(
    content: string,
    expressions: IJsonataExpression[],
    context: TContext,
    functions?: IJsonataFunctions
): Promise<string> {
    for await (const exp of expressions) {
        try {
            const { expression, code } = exp;

            const replacementValue = await executeJsonata(
                code,
                context,
                functions
            );

            if (replacementValue) {
                content = content.replaceAll(
                    this.doxExpressionSvc.addBracesToInterpolation(expression),
                    replacementValue
                );
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    return content;
}