import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCardComponent } from './components/product-card/product-card.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {}
