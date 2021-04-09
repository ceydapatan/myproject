import { Component, OnInit, Input } from '@angular/core';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import {ShippingaddressService} from '../../../shared/shippingaddress.service';




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  addressArray = this.ShippingadressService.getCustomerAddress();

  options: AnimationOptions = {
    path: '/assets/shoppingGirl.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  constructor(private ShippingadressService: ShippingaddressService ){ }

  ngOnInit(): void {
  }

}
