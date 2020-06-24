import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ShoppingHavenFormService } from 'src/app/service/shopping-haven-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  paymentCardMonths: number[] = [];
  paymentCardYears: number[] = [];

  constructor(private formBuilder: FormBuilder,
              private shoppingHavenFormService: ShoppingHavenFormService) { }

  ngOnInit(): void {

    const startMonth: number = new Date().getMonth() + 1;

    //Retrieves data for payment card months
    this.shoppingHavenFormService.getPaymentCardMonths(startMonth).subscribe(
      data => {
        this.paymentCardMonths = data;
      }
    );

    //Retrieves data for payment card years
    this.shoppingHavenFormService.getPaymentCardYears().subscribe(
      data => {
        this.paymentCardYears = data;
      }
    );

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

  handleMonthsAndYears() {
    
    const paymentInformationFormGroup = this.checkoutFormGroup.get('paymentInformation');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(paymentInformationFormGroup.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.shoppingHavenFormService.getPaymentCardMonths(startMonth).subscribe(
      data => {
        this.paymentCardMonths = data;
      }
    )
  }

  onSubmit() {
    console.log("Handling form submission");
    console.log(this.checkoutFormGroup.get('customer').value);

  }

}
