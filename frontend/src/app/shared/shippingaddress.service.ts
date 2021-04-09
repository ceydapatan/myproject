import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ShippingaddressService {

  customerAddress: String[] = [];



  constructor() { }

  addcustomerAddress(customerAddress: String)
  {
    if (this.customerAddress.length === 3)
    {
      this.customerAddress = [];
    }
    this.customerAddress.push(customerAddress);
  }

  getCustomerAddress()
  {
    return this.customerAddress;
  }
}
