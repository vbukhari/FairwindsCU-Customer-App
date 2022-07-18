import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer/customer.model';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = environment.api_url;
  
  constructor(private http: HttpClient) { }

  createCustomer(customer:any): Observable<any>{
    return this.http.post(this.url, customer);
  }

  getCustomersBySize(size:number): Observable<Customer[]> {
      return this.http.get<Customer[]>(`${this.url}&size=${size}`);
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url);
  }

}
