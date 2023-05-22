import { TiktokenModel, encoding_for_model } from "@dqbd/tiktoken";

export function tokenizeText(contents: string, GPT_MODEL: string): string[] {
    if (!contents) {
        return [];
    }

    const max_tokens = 1000;
    const extractDataRegEx = /{{([\s\S]*?)}}/;
    const dataArray = contents
        .split(extractDataRegEx)
        .map((i) => {
            return i.replaceAll(/^\s+|\s+$/g, '');
        })
        .filter(Boolean)
        .map((i) => {
            return i.replaceAll(/(\r\n|\n|\r)/gm, '');
        });
    const titles = dataArray
        .filter((el) => el?.trim())
        // .filter((el, ind) => ind % 2 === 0)
        .map((i) => {
            return i.replaceAll(/(\r\n|\n|\r)/gm, '');
        });
    const filteredDataArray = dataArray.filter((el, ind) => ind % 2 !== 0);
    const enc = encoding_for_model(GPT_MODEL as TiktokenModel);
    let arrayOfSingleSentences = [];
    titles.forEach((text, i) => {
        const mainText = filteredDataArray[i];
        const tempArray = mainText.split(/(?!. )/g);
        let placeholder = '';
        tempArray.forEach((txt, i) => {
            if (placeholder) {
                placeholder += `${txt}`;
            } else {
                placeholder = `${text}: ${txt}`;
            }
            const tokenCount = enc.encode(placeholder);
            if (
                tokenCount.length > max_tokens * 0.75 ||
                tempArray.length === i + 1
            ) {
                arrayOfSingleSentences.push(placeholder);
                placeholder = '';
            }
        });
    });
    enc.free();

    arrayOfSingleSentences = arrayOfSingleSentences.map((text) => {
        return text?.replaceAll('\u0000', '');
    });
    console.log(arrayOfSingleSentences);
    return arrayOfSingleSentences
        .map((_) => _.trim())
        .filter(Boolean)
        .filter((sent) => sent.length > 16);
}