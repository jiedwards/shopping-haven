import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number>  = new Subject<number>();
  totalQuantity: Subject<number>  = new Subject<number>();


  constructor() { }

  addToCart(theCartItem: CartItem) {

    //Verify whether item exists in cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {

      //locate item based on id
      existingCartItem = this.cartItems.find( cartItem => (cartItem.id === theCartItem.id));

      // check if it's found 
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      existingCartItem.quantity += 1;
    } 
    else {
      this.cartItems.push(theCartItem);
    }

    this.computerCartTotals();

  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity -= 1;

    if (theCartItem.quantity === 0) {
      this.removeItem(theCartItem);
    }
    else {
      this.computerCartTotals();
    }
  }

  removeItem(theCartItem: CartItem) {
    // find index of item in array, remove if found
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id == theCartItem.id);

    if (itemIndex > -1) {
      // splice removes at the index in place
      this.cartItems.splice(itemIndex, 1);
      
      this.computerCartTotals();
    }

  }

  computerCartTotals() {
    let totalCartPrice: number = 0;
    let totalCartQuantity: number = 0;

    this.cartItems.forEach(cartItem => {
      totalCartPrice += Number((cartItem.quantity * cartItem.unitPrice).toFixed(2));
      totalCartQuantity += cartItem.quantity;
    });

    // publish updated values to all subscribers
    this.totalPrice.next(totalCartPrice);
    this.totalQuantity.next(totalCartQuantity);

    this.logCartData(totalCartPrice, totalCartQuantity);
  }

  logCartData(totalCartPrice: number, totalCartQuantity: number) {
    console.log('Cart contents');

    this.cartItems.forEach(tempCartItem => {
      const subtotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`product name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, unitPrice: ${tempCartItem.unitPrice}, subtotalPrice: ${subtotalPrice}`)
      
    });

    console.log(`totalPrice: ${totalCartPrice.toFixed(2)}, totalQuantity: ${totalCartQuantity}`);
    console.log('-------')
  }
}
