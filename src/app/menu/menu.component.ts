import { Component } from '@angular/core';
import { IMenuItem } from './IMenuItem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  menuItems: Array<IMenuItem> = [
    {
      path: '/',
      label: 'Home'
    },
    {
      path: '/categories',
      label: 'Categories'
    },
    {
      path: '/suppliers',
      label: 'Suppliers'
    },
  ];
}
