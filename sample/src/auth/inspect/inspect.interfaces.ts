import { ModuleMetadata, Type } from '@nestjs/common';
import { InspectOptions } from 'util';

interface InspectOptionsFactory {
    createInspectOptions(): Promise<InspectOptions> | InspectOptions;
}
interface InspectAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useExisting?: Type<InspectOptionsFactory>;
    useClass?: Type<InspectOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<InspectOptions> | InspectOptions;
    inject?: any[];
}

export { InspectOptions, InspectAsyncOptions, InspectOptionsFactory }