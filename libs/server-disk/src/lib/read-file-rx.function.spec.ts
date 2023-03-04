import { readFileRx } from './read-file-rx.function';

const fail = () => { throw new Error('fail!') };

describe('readFileRx', () => {
    describe('GIVEN the file path exists', () => {
        it('emits the file contents', (done) => {
            readFileRx(__filename).subscribe(result => {
                expect(result).toEqual(expect.stringContaining('readFileRx worx!'));
                done();
            }, fail);
        });
    });

    describe('GIVEN the file path does not exist', () => {
        it('nexts the error stream', (done) => {
            readFileRx(__filename + 'no way this exists').subscribe(fail, () => {
                done();
            });
        });
    });
});

