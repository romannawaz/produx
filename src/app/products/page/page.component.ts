import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductStoreModule } from '../state/product-store.module';
import { ProductFacade } from '../state/product.facade';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ProductStoreModule],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  constructor(public readonly productFacade: ProductFacade) {}
}
