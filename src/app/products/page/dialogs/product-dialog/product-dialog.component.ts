import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Product, ProductChange, ProductCreate } from '@app/products/common';
import { ProductFacade } from '@app/products/state/product.facade';

const Material = [
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
];

export type ProductDialogType = 'create' | 'update';

export interface ProductDialogData {
  type: ProductDialogType;
  product: Product;
}

interface ProductForm {
  title: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [CommonModule, ...Material, ReactiveFormsModule],
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent implements OnInit {
  form: FormGroup<ProductForm> = this.fb.group({
    title: this.fb.control<string>('', [Validators.required]),
    description: this.fb.control<string>('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ProductDialogData,
    private readonly dialogRef: MatDialogRef<ProductDialogComponent>,
    private readonly fb: NonNullableFormBuilder,
    private readonly productFacade: ProductFacade
  ) {}

  ngOnInit(): void {
    this.dialogRef.updateSize('250px');

    this.form.patchValue(this.data.product);
  }

  submit(): void {
    switch (this.data.type) {
      case 'create': {
        this._create();
        break;
      }
      case 'update': {
        this._update();
        break;
      }
    }
  }

  private _create(): void {
    const productCreate: ProductCreate = this.form.getRawValue();

    this.productFacade.сreate(productCreate);
  }

  private _update(): void {
    const productChange: ProductChange = {
      ...this.form.getRawValue(),
      id: this.data.product.id,
    };

    this.productFacade.update(productChange);
  }
}
