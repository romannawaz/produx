import { ApplicationConfig } from '@angular/core';

import { rootStoreDevConfig } from '@app/store/root/root-store.config';

export const appConfig: ApplicationConfig = {
  providers: [rootStoreDevConfig],
};
