import { Inject, Injectable } from '@nestjs/common';
import util, { InspectOptions } from 'util';
import { INSPECT_MODULE_OPTION } from './inspect.constants';

@Injectable()
export class InspectService {
    constructor(@Inject(INSPECT_MODULE_OPTION) private readonly options: InspectOptions) {}

    inspect(object: any): string {
        return util.inspect(object, this.options)
    }
}
