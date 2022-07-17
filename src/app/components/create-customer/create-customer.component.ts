import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimaryAddress } from 'src/app/models/address/primary-address.model';
import { Customer } from 'src/app/models/customer/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  emailPattern = '^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
  isSubmitted = false;
  customer?: Customer;

  customerForm = new FormGroup({
    firstName: new FormControl('', {validators: Validators.required}),
    lastName: new FormControl('', {validators: Validators.required}),
    dob: new FormControl('', {validators: Validators.required}),
    ssn: new FormControl(''),
    email: new FormControl('', {validators: [Validators.required, Validators.pattern(this.emailPattern)], updateOn: 'change'}),
    phone: new FormControl('', {validators: [Validators.required, Validators.minLength(10)], updateOn: 'change'}),
    streetAddres: new FormControl('', {validators: Validators.required}),
    city: new FormControl('', {validators: Validators.required}),
    state: new FormControl('', {validators: Validators.required}),
    zipCode: new FormControl('', {validators: Validators.required}),
    joinDate: new FormControl('')
  });

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {

  }

  get form() { return this.customerForm.controls; }


  isValidField(field: string) {
    return !this.customerForm.get(field)?.valid && this.customerForm.get(field)?.touched;
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.customerForm.valid){
      this.populateCustomer();
      if(this.customer){
        this.customerService.createCustomer(this.customer).subscribe(data => {
          if(data){
            alert('Customer has been created successfully!');
            this.router.navigate(['/customers']);
          }
        })
      }
    }
    return;
  }

  public populateCustomer(): void {
    this.customer = new Customer();
    this.customer.date_birth = this.form.dob.value ?? '';
    this.customer.email = this.form.email.value ?? '';
    this.customer.first_name = this.form.firstName.value ?? '';
    this.customer.last_name = this.form.lastName.value ?? '';
    this.customer.mobile_phone_number = this.form.phone.value ?? '';
    this.customer.join_date = this.form.joinDate.value ?? ''
    const address = new PrimaryAddress();
    address.address_line_1 = this.form.streetAddres.value ?? '';
    address.city = this.form.city.value ?? '';
    address.state = this.form.state.value ?? '';
    address.zip_code = this.form.zipCode.value ?? '';
    this.customer.primary_address = new PrimaryAddress();
    Object.assign<PrimaryAddress, PrimaryAddress>((this.customer.primary_address), address);
  }
}

