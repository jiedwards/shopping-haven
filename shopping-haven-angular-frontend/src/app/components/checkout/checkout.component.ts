import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    //Defines the individual groups of input to accept
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        addressLineOne: [''],
        addressLineTwo: [''],
        city: [''],
        region: [''],
        postCode: [''],
        country: ['']
      }),
      billingAddress: this.formBuilder.group({
        addressLineOne: [''],
        addressLineTwo: [''],
        city: [''],
        region: [''],
        postCode: [''],
        country: ['']
      }),
      paymentInformation: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });
  }

  copyShippingAddressToBillingAddress(event) {
      if (event.target.checked) {
        this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      }
      else {
        this.checkoutFormGroup.controls.billingAddress.reset();
      }
  }

  onSubmit() {
    console.log("Handling form submission");
    console.log(this.checkoutFormGroup.get('customer').value);

  }

}
