import { Component, OnInit } from '@angular/core';
import {Datacart} from '../../shared/datacart';
import {BackendService} from '../../shared/backend.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Data} from '../../shared/data';
import {ShippingaddressService} from '../../shared/shippingaddress.service';






@Component({
  selector: 'app-readcart',
  templateUrl: './readcart.component.html',
  styleUrls: ['./readcart.component.css']
})
export class ReadcartComponent implements OnInit {
  carts: Datacart[];
  cart: Datacart;
  items: Data[];
  a: Datacart;
  b: Datacart
  totalPrice = 0;
  shippingCosts = 0;
 address: String;
 country: String;
 postalCode : String;

 addressArray: String[];
  closeResult = '';

  checkedOut: boolean;



  selectedId: number;
  selectedIdItem: number;



  error: HttpErrorResponse;
  form: FormGroup;

  itemname: string;





  constructor(private cs: BackendService, private route: ActivatedRoute, private router: Router, config: NgbModalConfig,
              private modalService: NgbModal, private fb: FormBuilder,
              private sas: ShippingaddressService ) {
    config.backdrop = 'static';   // schliesst nicht, wenn man in das Fenster dahinter klickt
    config.keyboard = false;      // Modaler Dialog kann nicht durch ESC beendet werden
    // Formular fuer delete
    this.form = this.fb.group(
      {
        idControl: ['', Validators.required],

        anzahlControl: ['', Validators.required],

      }
    );

  }

  ngOnInit(): void {
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.selectedId === 0) {
      this.readAll();
      this.readAllItems();
    }
    else {
      console.log('id = ' + this.selectedId);
      this.readOne(this.selectedId);

    }

    this.selectedIdItem = Number(this.route.snapshot.paramMap.get('id'));
    if (this.selectedIdItem === 0) {
      this.readAll();
      this.readAllItems();
    }
    else {
      console.log('id = ' + this.selectedIdItem);   // nur fuer debug
      this.readOne(this.selectedIdItem);
    }





  }
  trackByData(index: number, data: Datacart): number { return data.id; }

  readAll(): void {
    this.cs.getAllCarts().subscribe(
      (response: Datacart[]) => {
        console.log(response);
        this.carts = response;
        this.carts.forEach(element => this.totalPrice = this.totalPrice + (element.anzahl * (this.items[element.id - 1].price)));


        if ( this.carts.length > 0 && this.totalPrice < 50)
        {
          this.shippingCosts = 5;
        }

        console.log(this.carts.length);
        return this.carts = response;  },
      error => console.log(error)
    );
  }

  readAllItems(): void {
    this.cs.getAll().subscribe(
      (response: Data[]) => {this.items = response;
        console.log('Das ist das items Array' + this.items); },
      error => console.log(error)
    );
  }

  readOne(id: number): void {
    this.cs.getDatacartById(id).subscribe(
      (response: Datacart) => this.cart = response,
    error => this.error = error,

  );
  }

  /*/readOneItem(id: number): void {
    this.cs.getDatacartById(id).subscribe(
      (response: Datacart) => this.cart = response,
      error => this.error = error,

    );
  }
  /*/



  update(datacart: Datacart): void {
    this.cart = datacart;
    console.log('cart id in readcart ist' + this.cart.id);
    this.cs.updatecart(this.cart.id, this.cart);
    this.router.navigateByUrl('/readcart');
  }

  deleteOne(id: number): void {
    this.cs.deleteOne(id);
    window.location.reload();
  }

  open(content, id: number): void {
    this.readOne(id);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      if (result === 'delete')
      {
        this.deleteOne(this.cart?.id);
      }
    });
  }

  openCheckOut(content, id: number): void {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);

    });
  }

  sort(): void{
    this.cs.getAllCarts().subscribe(
      (response: Datacart[]) => {
        console.log(response);
        this.carts = response;
        for (let i = 0 ; i < this.carts.length ; i ++)
        {
          for (let j = 0; j < this.carts.length - 1 ; j++)
          {
            const k = j + 1;

            this.a = this.carts[j];
            this.b = this.carts[k];

            if ( this.items[this.b.id - 1].price < this.items[this.a.id - 1].price)
            {

              this.carts[j] = this.b;
              this.carts[k] = this.a;
            }
          }
        }
       },
      error => console.log(error)
    );


   /* this.cs.getAllCarts().subscribe(
      (response: Datacart[]) => {
        console.log(response);
        this.carts = response;
        const sortedCarts: { price: number; }[] = this.carts.sort((n1,n2) => {
          if (n1.price > n2.age) {
            return 1;
          }

          if (n1.age < n2.age) {
            return -1;
          }

          return 0;
        });},
      error => console.log(error)
    );
*/
  }



  checkOut(): void{
    // alle Items im Warenkorb löschen und den Stock verringern

    this.cs.deleteAll();
    // das Items-Array wird angepasst
    this.carts.forEach(lol => this.items[lol.id - 1].stock = this.items[lol.id - 1].stock - lol.anzahl);

    // Stock der Items wird upgedated
    this.items.forEach(element => this.cs.updated(element.id, element));

    // alle Items im Warenkorb werden gelöscht

    this.cs.deleteAll();

    //window.location.reload();







    this.sas.addcustomerAddress(this.country);
    this.sas.addcustomerAddress(this.address);
    this.sas.addcustomerAddress(this.postalCode);

    this.router.navigateByUrl('/readcart/checkout');









  }

}
