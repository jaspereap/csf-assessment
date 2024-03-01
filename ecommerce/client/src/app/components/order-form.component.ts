import { Component, Input, OnInit, Output, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LineItem} from '../models';
import { CartStore } from '../cart.store';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {

  // NOTE: you are free to modify this component

  private fb = inject(FormBuilder)

  // Inject Store
  private cartStore = inject(CartStore);

  @Input({ required: true })
  productId!: string
  @Input()
  productName!: string
  @Input()
  productPrice!: number

  form!: FormGroup

  ngOnInit(): void {
    this.form = this.createForm()
  }

  // Task 2.2
  addToCart() {
    const lineItem: LineItem = {
      prodId: this.productId,
      quantity: this.form.value['quantity'],
      // name: '',
      name: this.productName,
      // price: 0
      price: this.productPrice
    }
    this.cartStore.addItem(lineItem);
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      quantity: this.fb.control<number>(1, [ Validators.required, Validators.min(1) ])
    })
  }

}
