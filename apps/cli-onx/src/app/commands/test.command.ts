import { Command, CommandRunner, Option } from 'nest-commander';

type IParams = { email: string, password: string };

@Command({ name: Test.name })
export class Test extends CommandRunner {
    constructor() {
        super();
    }

    async run(_args: string[], params: IParams): Promise<void> {
        return this.main([], params);
    }

    async main(_args: string[], { email, password }: IParams): Promise<void> {
        console.log('Test Test Test');
    }

    @Option({
        flags: '-e, --email [email]',
        description:
            'user email',
        required: true
    })
    parseEmail(val: string) {
        return val;
    }

    @Option({
        flags: '-p, --password [password]',
        description:
            'new password',
        required: true
    })
    parsePassword(val: string) {
        return val;
    }
}
