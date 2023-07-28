import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

import { Product } from '@app/products/common';
import { ProductStoreModule } from '@app/products/state/product-store.module';
import { ProductFacade } from '@app/products/state/product.facade';
import { ProductDialogComponent } from '@app/products/page/dialogs/product-dialog/product-dialog.component';

const Material = [MatDialogModule];

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ...Material, FontAwesomeModule, ProductStoreModule],
  providers: [MatDialog],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  faEye = faEye;
  faCalendar = faCalendar;
  faCircleXmark = faCircleXmark;
  faEdit = faEdit;

  @Input({ required: true })
  product!: Product;

  constructor(
    private readonly productsFacade: ProductFacade,
    private readonly dialog: MatDialog
  ) {}

  edit(): void {
    this.dialog.open(ProductDialogComponent, {
      data: {
        type: 'update',
        product: this.product,
      },
    });
  }

  remove(): void {
    console.log(this.product.id);
    this.productsFacade.remove(this.product.id);
  }
}
