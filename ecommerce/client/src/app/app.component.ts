import { Component, OnInit, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { CartStore } from './cart.store';

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
  
  constructor() {
    this.itemCount = 0;
    this.distinctProdId = [];
  }

  ngOnInit(): void {
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
  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }
}
