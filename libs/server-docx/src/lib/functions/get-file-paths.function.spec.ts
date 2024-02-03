import { getFilePaths } from './get-file-paths.function';

describe('getFilePaths', () => {
    it('creates a set of unique but conventional strings for inflating/deflating docx files on disk', () => {
        expect(getFilePaths('asdf.docx')).toMatchSnapshot();
    });
});