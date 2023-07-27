import { Injectable } from '@angular/core';
import {
  State,
  Selector,
  NgxsOnInit,
  StateContext,
  Action,
  createSelector,
} from '@ngxs/store';
import { Product } from '@app/products/common';

import * as ProductActions from './product.actions';
import { ProductsService } from '../service/products.service';
import { catchError, map } from 'rxjs';

export interface ProductStateModel {
  readonly loaded: boolean;
  readonly ids: string[];
  readonly entities: Record<string, Product>;
}

export const initialProductState: ProductStateModel = {
  loaded: false,
  ids: [],
  entities: {},
};

@State<ProductStateModel>({
  name: 'product',
  defaults: initialProductState,
})
@Injectable()
export class ProductState implements NgxsOnInit {
  @Selector()
  static load(state: ProductStateModel): boolean {
    return state.loaded;
  }

  @Selector()
  static products(state: ProductStateModel): Product[] {
    return Object.values(state.entities);
  }

  @Selector()
  static productsByViews(state: ProductStateModel): Product[] {
    return Object.values(state.entities).sort((a, b) => b.views - a.views);
  }

  static product(id: string): (state: ProductStateModel) => Product | null {
    return createSelector(
      [ProductState],
      (state: ProductStateModel) => state.entities[id] ?? null
    );
  }

  constructor(private readonly productsService: ProductsService) {}

  ngxsOnInit(ctx: StateContext<ProductStateModel>): void {
    ctx.dispatch(new ProductActions.Load());
  }

  @Action(ProductActions.Load)
  load(ctx: StateContext<ProductStateModel>) {
    return this.productsService.getAll().pipe(
      map((products) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          ids: products.map((product) => product.id),
          entities: products.reduce(
            (acc, current) => ({ ...acc, [current.id]: current }),
            {}
          ),
        });

        return ctx.dispatch(new ProductActions.LoadSuccess(products));
      }),
      catchError((error: unknown) =>
        ctx.dispatch(new ProductActions.LoadFailure(error))
      )
    );
  }

  @Action(ProductActions.LoadOne)
  loadOne(
    ctx: StateContext<ProductStateModel>,
    { id }: ProductActions.LoadOne
  ) {
    return this.productsService.getById(id).pipe(
      map((product) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          ids:
            product && !state.ids.includes(product.id)
              ? [...state.ids, product.id]
              : state.ids,
          entities:
            product && !state.entities[product.id]
              ? { ...state.entities, [product.id]: product }
              : state.entities,
        });

        return ctx.dispatch(new ProductActions.LoadOneSuccess(product));
      }),
      catchError((error: unknown) =>
        ctx.dispatch(new ProductActions.LoadOneFailure(error, id))
      )
    );
  }

  @Action(ProductActions.Create)
  create(
    ctx: StateContext<ProductStateModel>,
    { productCreate }: ProductActions.Create
  ) {
    return this.productsService.create(productCreate).pipe(
      map((product) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          ids: !state.ids.includes(product.id)
            ? [...state.ids, product.id]
            : state.ids,
          entities: !state.entities[product.id]
            ? { ...state.entities, [product.id]: product }
            : state.entities,
        });

        return ctx.dispatch(new ProductActions.CreateSuccess(product));
      }),
      catchError((error: unknown) =>
        ctx.dispatch(new ProductActions.CreateFailure(error))
      )
    );
  }

  @Action(ProductActions.Change)
  change(
    ctx: StateContext<ProductStateModel>,
    { productChange }: ProductActions.Change
  ) {
    return this.productsService.update(productChange).pipe(
      map((product) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          ids: !state.ids.includes(product.id)
            ? [...state.ids, product.id]
            : state.ids,
          entities: { ...state.entities, [product.id]: product },
        });

        return ctx.dispatch(new ProductActions.ChangeSuccess(product));
      }),
      catchError((error: unknown) =>
        ctx.dispatch(new ProductActions.ChangeFailure(error))
      )
    );
  }

  @Action(ProductActions.Remove)
  remove(ctx: StateContext<ProductStateModel>, { id }: ProductActions.Remove) {
    return this.productsService.remove(id).pipe(
      map((product) => {
        const state = ctx.getState();

        const entities = { ...state.entities };
        delete entities[id];

        ctx.setState({
          ...state,
          ids: state.ids.filter((id) => id !== id),
          entities,
        });

        return ctx.dispatch(new ProductActions.RemoveSuccess(product));
      }),
      catchError((error: unknown) =>
        ctx.dispatch(new ProductActions.RemoveFailure(error, id))
      )
    );
  }
}
