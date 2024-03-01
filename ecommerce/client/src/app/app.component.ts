import { Component, OnInit, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { CartStore } from './cart.store';
import { LineItem } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private cartStore = inject(CartStore);

  itemCount!: number

  distinctProdId!: string[]
  items!: LineItem[];
  
  constructor() {
    console.log("Constructor")
    this.itemCount = 0;
    this.distinctProdId = [];
  }
  
  ngOnInit(): void {
    // Get initial cart from Store
    this.cartStore.getItems().then((items) => {
      this.items = items;
      this.items.forEach(
        (v) => {
          if (this.distinctProdId.indexOf(v.prodId) === -1) {
            this.distinctProdId.push(v.prodId);
            this.itemCount++;
          }
        }
      )
    });
    // Update on new product added to Store
    this.cartStore.onNewProduct$.subscribe(
      (v) => {
        // Task 2.3
        // increment itemCount if distinct
        if (this.distinctProdId.indexOf(v.prodId) === -1) {
          this.distinctProdId.push(v.prodId);
          this.itemCount++;
        }
      }
    );
    // Reset item count on clear
    this.cartStore.onClearItems$.subscribe(
      () => {this.itemCount = 0}
    )
  }

  checkout(): void {
    
    this.router.navigate([ '/checkout' ])
  }
}