import { Provider } from "@nestjs/common";
import { INSPECT_MODULE_OPTION } from "./inspect.constants";
import { InspectOptions } from "./inspect.interfaces";

export function createInspectProviders(options: InspectOptions): Provider[] {
    return [
      {
        provide: INSPECT_MODULE_OPTION,
        useValue: options || {},
      },
    ];
  }
  