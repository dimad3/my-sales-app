import { Injectable } from '@angular/core';
import { ICartItem } from './icart.dto'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // The basic idea of CartService is to store the shopping cart items in the browser’s localStorage.
  // We create two constants called CART and CART_ITEMS_CUNT that will be the keys of localstorage
  readonly CART: string = 'cart';
  readonly CART_ITEMS_CUNT: string = 'cart_items_count';

  constructor() { }

  /**
   * Gets the text saved in the localstorage that represents the items in the cart.
   *
   * @returns Array<ICartItem> - an array of CartItem
   */
  private getItems(): Array<ICartItem> {
    /* localStorage - This Web Storage API interface provides access to a particular domain's session or local storage.
    It allows, for example, the addition, modification, or deletion of stored data items. */

    // getItem() - returns the current value associated with the given key, or null if the given key does not exist.
    const cartItems = localStorage.getItem(this.CART);

    if (cartItems) {
      // Since the localstorage stores only text, it is necessary to convert the array of cart items into JSON.
      // The JSON string is converted to an array using the JSON.parse method.
      return JSON.parse(cartItems);
    }
    // If there is no JSON in localstorage whose key is CART, the getItems method will return an empty array.
    return [];
  }


  /**
   * Method, responsible for adding an item of type CartItem to the cart.
   *
   * @param item - type of ICartItem
   * @returns void
   */
  public addItem(item: ICartItem): void {
    let found = false;
    const items: ICartItem[] = this.getItems();

    // It should be noted that adding an item to the cart is not just adding the item to the
    // array. If the product is already in the cart, what you should do is increase its quantity
    items.forEach(element => {
      if (element.idProduct === item.idProduct) {
        element.quantity++;
        found = true;
      }
    });

    // If the product is not found, then we add it to the array with the push method
    if (!found) {
      items.push(item);
    }
    /**
     * setItem() - sets the value of the pair identified by key to value,
     * creating a new key/value pair if none existed for key previously.
     *
     * We use the JSON.stringify method to transform the array into a JSON,so it can be stored as text in localstorage.
     */
    localStorage.setItem(this.CART, JSON.stringify(items));
    // The quantity of products in the cart is also stored
    localStorage.setItem(this.CART_ITEMS_CUNT, items.length.toString());
  }


  /**
   * Removes a item from the cart.
   *
   * @param item
   * @returns void
   */
  public removeItem(item: ICartItem): void {
    // let found = false;
    const items = this.getItems();

    items.forEach(element => {
      if (element.idProduct === item.idProduct) {
        element.quantity--;
        // found = true;
      }
    });

    // Removes the item from the array if the quantity is 1
    // If the quantity is larger, removes one unit from the quantity property
    const newItems = items.filter(element => element.quantity > 0);
    /**
     * setItem() - sets the value of the pair identified by key to value,
     * creating a new key/value pair if none existed for key previously.
     *
     * We use the JSON.stringify method to transform the array into a JSON,so it can be stored as text in localstorage.
     */
    localStorage.setItem(this.CART, JSON.stringify(newItems));
    // The quantity of products in the cart is also stored
    localStorage.setItem(this.CART_ITEMS_CUNT, newItems.length.toString());
  }


  /**
   * get itemsInCart property - returns the quantity of items in the cart
   *
   * @returns number
   */
  get itemsInCart(): number {
    return this.getItems().length;
  }


  /**
   * The total property - returns the total of the cart, summing the value of all the products
   *
   * @returns number
   */
  get total(): number {
    let total = 0;
    const items = this.getItems();

    items.forEach(element => {
      total += (element.unitPrice * element.quantity);
    });
    return total;
  }

}
