import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ICartItem } from '../icart.dto';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: [
  ]
})
export class CheckoutComponent implements OnInit {
  cartItems: ICartItem[] = [];

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    // throw new Error('Method not implemented.');
  }

  onAddItem(cartItem: ICartItem){
    // console.log(cartItem);
    this.cartService.addItem(cartItem);
    this.cartItems = this.cartService.getItems();
  }

  onRemoveItem(cartItem: ICartItem){
    // console.log(cartItem);
    this.cartService.removeItem(cartItem);
    this.cartItems = this.cartService.getItems();
  }

}
