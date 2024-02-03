import { docx } from './docx.function';

const docxFilePath = 'test/test.docx';
const token = 'TEST CONTENT';
const replacement = 'UPDATED CONTENT';

describe('docx', () => {
    it('extracts xml from docx file', async () => {
        await docx(docxFilePath, async ({ xml }) => {
            expect(xml.includes(token)).toBe(true);
        });
    });

    it('writes xml to docx file', async () => {
        await docx(docxFilePath, async ({ xml }) => {
            return { xml: xml.replace(token, replacement) };
        });

        await docx(docxFilePath, async ({ xml }) => {
            expect(xml.includes(token)).toBe(false);
            expect(xml.includes(replacement)).toBe(true);
        });

    });
});