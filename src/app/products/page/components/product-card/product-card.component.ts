import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

import { Product } from '@app/products/common';
import { ProductStoreModule } from '@app/products/state/product-store.module';
import { ProductFacade } from '@app/products/state/product.facade';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ProductStoreModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  faEye = faEye;
  faCalendar = faCalendar;
  faCircleXmark = faCircleXmark;

  @Input({ required: true })
  product!: Product;

  constructor(private readonly productsFacade: ProductFacade) {}

  remove(): void {
    console.log(this.product.id);
    this.productsFacade.remove(this.product.id);
  }
}
