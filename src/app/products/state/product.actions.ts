import { Product, ProductChange, ProductCreate } from '@app/products/common';

export class Load {
  static readonly type = '[Product] Load';
}

export class LoadSuccess {
  static readonly type = '[Product] Load Success';

  constructor(public readonly products: Product[]) {}
}

export class LoadFailure {
  static readonly type = '[Product] Load Failure';

  constructor(public readonly error: unknown) {}
}

export class LoadOne {
  static readonly type = '[Product] Load one';

  constructor(public readonly id: string) {}
}

export class LoadOneSuccess {
  static readonly type = '[Product] Load one Success';

  constructor(public readonly product: Product) {}
}

export class LoadOneFailure {
  static readonly type = '[Product] Load one Failure';

  constructor(public readonly error: unknown, public readonly id: string) {}
}

export class Create {
  static readonly type = '[Product] Create';

  constructor(public readonly productCreate: ProductCreate) {}
}

export class CreateSuccess {
  static readonly type = '[Product] Create Success';

  constructor(public readonly product: Product) {}
}

export class CreateFailure {
  static readonly type = '[Product] Create Failure';

  constructor(public readonly error: unknown) {}
}

export class Change {
  static readonly type = '[Product] Change';

  constructor(public readonly productChange: ProductChange) {}
}

export class ChangeSuccess {
  static readonly type = '[Product] Change Success';

  constructor(public readonly product: Product) {}
}

export class ChangeFailure {
  static readonly type = '[Product] Change Failure';

  constructor(public readonly error: unknown) {}
}

export class Remove {
  static readonly type = '[Product] Remove';

  constructor(public readonly id: string) {}
}

export class RemoveSuccess {
  static readonly type = '[Product] Remove Success';

  constructor(public readonly product: Product) {}
}

export class RemoveFailure {
  static readonly type = '[Product] Remove Failure';

  constructor(public readonly error: unknown, public readonly id: string) {}
}
