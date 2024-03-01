
// TODO Task 2

import { Injectable } from "@angular/core";
import { ComponentStore, OnStoreInit } from "@ngrx/component-store";
import { Cart, LineItem, Product } from "./models";
import Dexie from "dexie";
import { Subject } from "rxjs";


const INIT_STATE: Cart = {
    lineItems: []
}
// Use the following class to implement your store
@Injectable()
export class CartStore extends Dexie {

    private cart!: Dexie.Table<LineItem, string>;

    onNewProduct$ = new Subject<LineItem>();
    
    constructor() {
        super('ecommerce')
        this.version(2).stores({
            cart: '++id'
        });
        this.cart = this.table('cart');
    }

    async addItem(item: LineItem): Promise<any> {
        console.log("CartStore, addItem")
        return this.cart.add(item).then(
            () => this.onNewProduct$.next(item)
        )
    }

}
