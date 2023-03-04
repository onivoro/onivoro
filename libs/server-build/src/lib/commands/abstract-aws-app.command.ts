import { Option } from 'nest-commander';
import { IAwsAppParams } from '../types/aws-app-params.interface';
import { AbstractAppCommand } from './abstract-app.command';

export abstract class AbstractAwsAppCommand<TParams extends IAwsAppParams> extends AbstractAppCommand<TParams> {
  abstract main(args: string[], params: TParams): Promise<void>;

  constructor(public name: string) {
    super(name);
  }

  async run(_args: string[], params: TParams): Promise<void> {
    await this.main(_args, params);
  }

  @Option({
    flags: '-p, --profile [profile]',
    description:
      'AWS profile name',
    required: true
  })
  parseProfile(val?: string) {
    return val;
  }

  @Option({
    flags: '-r, --region [region]',
    description: 'AWS region',
    required: true
  })
  parseRegion(val?: string) {
    return val;
  }
}
