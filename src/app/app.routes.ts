import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./products/page/page.route').then((c) => c.pageRoutes),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
