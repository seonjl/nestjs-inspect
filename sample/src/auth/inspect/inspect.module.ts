import { DynamicModule, Module, Provider } from '@nestjs/common';
import { INSPECT_MODULE_OPTION } from './inspect.constants';
import { InspectAsyncOptions, InspectOptions, InspectOptionsFactory } from './inspect.interfaces';
import { createInspectProviders } from './inspect.providers';
import { InspectService } from './inspect.service';

@Module({
  providers: [InspectService],
  exports: [InspectService]
})
export class InspectModule {
  public static register(options: InspectOptions): DynamicModule {
    return {
      module: InspectModule,
      providers: createInspectProviders(options),
    };
  }

  static registerAsync(options: InspectAsyncOptions): DynamicModule {
    return {
      module: InspectModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options)
    };
  }


  private static createAsyncProviders(
    options: InspectAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ];
  }


  private static createAsyncOptionsProvider(
    options: InspectAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: INSPECT_MODULE_OPTION,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: INSPECT_MODULE_OPTION,
      useFactory: async (optionsFactory: InspectOptionsFactory) =>
        await optionsFactory.createInspectOptions(),
      inject: [options.useExisting || options.useClass]
    };
  }
}
