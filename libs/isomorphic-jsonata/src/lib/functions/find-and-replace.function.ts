import { IDoxExpression } from "../interfaces/dox-expression.interface";
import { IDoxFunctions } from "../interfaces/dox-function-config.interface";
import { executeJsonata } from "./execute-jsonata.function";

export async function findAndReplace<TContext>(
    content: string,
    expressions: IDoxExpression[],
    context: TContext,
    functions?: IDoxFunctions
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