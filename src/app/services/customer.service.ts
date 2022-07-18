import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer/customer.model';

const apiKey = 'e95894a0';
const url = `https:/my.api.mockaroo.com/customers.json?key=${apiKey}`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  createCustomer(customer:any): Observable<any>{
    return this.http.post(url, customer);
  }

  getCustomersBySize(size:number): Observable<Customer[]> {
      return this.http.get<Customer[]>(`${url}&size=${size}`);
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(url);
  }

}
