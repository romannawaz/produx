import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { rootStoreDevConfig } from '@app/store/root/root-store.config';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(HttpClientModule), rootStoreDevConfig],
};
