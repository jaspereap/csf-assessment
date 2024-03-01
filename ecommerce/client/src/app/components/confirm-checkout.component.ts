import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartStore } from '../cart.store';
import { LineItem } from '../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit {

  // TODO Task 3
  form!: FormGroup
  items!: LineItem[]
  totalPrice!: number;
  constructor(private fb: FormBuilder, private cartStore:CartStore) {
  }

  
  ngOnInit() {
    this.totalPrice = 0;
    this.form = this.initialiseForm()
    this.cartStore.getItems().then(
      (val) => {
        console.log("getItems then start")
        this.items = val;
        console.log("items: >>> ", this.items)
        this.items.forEach((i) => {this.totalPrice += i.price; console.log("total price: ", this.totalPrice)})
      }
    );

  }
  initialiseForm() : FormGroup{
    return this.fb.group({
      name: this.fb.control<string>('', Validators.required),
      address: this.fb.control<string>('', [Validators.required, Validators.min(3)]),
      priority: this.fb.control<boolean>(false, Validators.required),
      comments: this.fb.control<string>('')
    })
  }


}
