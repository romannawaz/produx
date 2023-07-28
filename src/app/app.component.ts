import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import { ProductFacade } from '@app/products/state/product.facade';
import { ProductStoreModule } from '@app/products/state/product-store.module';
import { ProductDialogComponent } from '@app/products/page/dialogs/product-dialog/product-dialog.component';

const Material = [MatButtonModule, MatDialogModule];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ProductStoreModule,
    ...Material,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  faHeart = faHeart;

  constructor(
    public readonly productFacade: ProductFacade,
    private readonly dialog: MatDialog
  ) {}

  createDialog(): void {
    this.dialog.open(ProductDialogComponent, { data: { type: 'create' } });
  }
}
