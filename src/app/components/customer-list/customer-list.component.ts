import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList?: Customer[];
  customerDetails?: Customer;

  constructor(private customerService: CustomerService, private router: Router) { }
  displayStyle = "none";
  
  ngOnInit(): void {
    this.customerService.getCustomersBySize(5).subscribe(data => {
      if(data){
        this.customerList = data;
      }
    });
  }

  onSizeSelect(size: any){
    let sizeNumber = Number(size.value);
    if(sizeNumber > 0){
      this.customerService.getCustomersBySize(sizeNumber).subscribe(data => {
        if(data){
          this.customerList = data;
        }
      });
    } else{
      this.customerService.getAllCustomers().subscribe(data => {
        if(data){
          this.customerList = data;
        }
      });
    }    
  }

  calculateAge(dob:any): number {
    if(dob){
      let timeDiff = Math.abs(Date.now() - new Date(dob).getTime());
      let age = Math.floor((timeDiff/(1000*3600*24))/365.25);
      return age;
    }
    return 0;
  } 

  showLast4SSN(ssn:any): string {
    if(ssn){
      let ssnStr = ssn.toString();
      return ("XXX-XX-" + ssnStr.substr(ssnStr.length - 4));
    }
    return '';
  }

  viewDetail(customer: Customer): void{
    if(customer){
      
    }
  }

  openPopup(customer: Customer) {
    if(customer){
      this.displayStyle = "block";
      this.customerDetails = customer;
    }
  }
  closePopup() {
    this.displayStyle = "none";
  }


  createNewCustomer(){
    this.router.navigate(['/create']);
  }
}
