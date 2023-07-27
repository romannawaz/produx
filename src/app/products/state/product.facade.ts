import { Injectable } from '@angular/core';
import { Actions, Select, Store, ofActionDispatched } from '@ngxs/store';
import { Observable, map } from 'rxjs';

import { Product, ProductChange, ProductCreate } from '@app/products/common';
import { ProductState } from './product.state';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductFacade {
  @Select(ProductState.load)
  loaded$!: Observable<boolean>;

  @Select(ProductState.products)
  products$!: Observable<Product[]>;

  @Select(ProductState.productsByViews)
  productsByViews$!: Observable<Product[]>;

  loadSuccess$: Observable<Product[]> = this.actions.pipe(
    ofActionDispatched(ProductActions.LoadSuccess),
    map(({ products }) => products)
  );

  loadFailure$: Observable<unknown> = this.actions.pipe(
    ofActionDispatched(ProductActions.LoadFailure),
    map(({ error }) => error)
  );

  loadOneSuccess$: Observable<Product> = this.actions.pipe(
    ofActionDispatched(ProductActions.LoadOneSuccess),
    map(({ product }) => product)
  );

  loadOneFailure$: Observable<unknown> = this.actions.pipe(
    ofActionDispatched(ProductActions.LoadOneFailure),
    map(({ error }) => error)
  );

  createSuccess$: Observable<Product> = this.actions.pipe(
    ofActionDispatched(ProductActions.CreateSuccess),
    map(({ product }) => product)
  );

  createFailure$: Observable<unknown> = this.actions.pipe(
    ofActionDispatched(ProductActions.CreateFailure),
    map(({ error }) => error)
  );

  changeSuccess$: Observable<Product> = this.actions.pipe(
    ofActionDispatched(ProductActions.ChangeSuccess),
    map(({ product }) => product)
  );

  changeFailure$: Observable<unknown> = this.actions.pipe(
    ofActionDispatched(ProductActions.ChangeFailure),
    map(({ error }) => error)
  );

  removeSuccess$: Observable<Product> = this.actions.pipe(
    ofActionDispatched(ProductActions.RemoveSuccess),
    map(({ product }) => product)
  );

  removeFailure$: Observable<unknown> = this.actions.pipe(
    ofActionDispatched(ProductActions.RemoveFailure),
    map(({ error }) => error)
  );

  product = (id: string) => this.store.select(ProductState.product(id));

  constructor(
    private readonly store: Store,
    private readonly actions: Actions
  ) {}

  load(): void {
    this.store.dispatch(new ProductActions.Load());
  }

  loadOne(id: string): void {
    this.store.dispatch(new ProductActions.LoadOne(id));
  }

  сreate(productCreate: ProductCreate): void {
    this.store.dispatch(new ProductActions.Create(productCreate));
  }

  update(productChange: ProductChange): void {
    this.store.dispatch(new ProductActions.Change(productChange));
  }

  remove(id: string): void {
    this.store.dispatch(new ProductActions.Remove(id));
  }
}
