import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuppliersListComponent } from './suppliers/suppliers-list/suppliers-list.component';
import { SuppliersShowComponent } from './suppliers/suppliers-show/suppliers-show.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

/**
 * Represents a route configuration for the Router service.
 * An array of `Route` objects, used in `Router.config` and for nested route configurations
 * in `Route.children`.
 */
const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  /**
  * The path to match against. Cannot be used together with a custom `matcher` function.
  * A URL string that uses router matching notation.
  * Can be a wild card (`**`) that matches any URL (see Usage Notes below).
  * Default is "/" (the root path).
  */
  {
    path: 'suppliers',
    component: SuppliersComponent,
    children: [
      /*
      The `suppliers` path will load the SuppliersComponent component, and that
      the children property has an element whose path is '', and the component to load
      is the SuppliersListComponent component. This means that when you access the
      http://localhost:4200/suppliers address, the SuppliersComponent component will be
      loaded, and the router-outlet of this component will load the SuppliersListComponent component.
      */
      { path: '', component: SuppliersListComponent },
      { path: 'show/:id', component: SuppliersShowComponent },
    ]
  },
  { path: '', component: DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
