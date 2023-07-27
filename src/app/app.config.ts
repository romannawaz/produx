import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { rootStoreDevConfig } from '@app/store/root/root-store.config';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(HttpClientModule), rootStoreDevConfig, provideAnimations()],
};
