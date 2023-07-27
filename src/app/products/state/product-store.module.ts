import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { ProductState } from './product.state';
import { ProductFacade } from './product.facade';

@NgModule({
  imports: [NgxsModule.forFeature([ProductState])],
  providers: [ProductFacade],
})
export class ProductStoreModule {}
