
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Data } from '../../../shared/data';
import { Datacart } from '../../../shared/datacart';

import { Location } from '@angular/common';
import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {BackendService} from '../../../shared/backend.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';






@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() data: Data;
  // @Output() updateEvent = new EventEmitter<Data>();
  @Input() datacart: Datacart;
  @Output() updateEventcart = new EventEmitter<Datacart>();
  carts: Datacart[];
  cart: Datacart;
  lengthOfCarts: number;
  anzahlCart = 9000909;
  idArray = [1,2,3];

  @Input() stock = 0 ;








  form: FormGroup;
  valuesl: any;
  outofstock: boolean;

  patternNotValid: boolean;
  formError: boolean;
  errM: string;
  error: HttpErrorResponse;
  isAlreadyIncluded = false;



  constructor(private fb: FormBuilder, private location: Location,   private cs: BackendService,
              private router: Router

  ) {
    this.formError = false;

    this.form = this.fb.group(
      {
        quantityControl: ['', Validators.required,  Validators.pattern('^[0-9]*$'),
        ],
      }
    );


  }

  ngOnInit(): void {
    this.form.patchValue({
      quantityControl: this.datacart?.anzahl,

    });
    const fullUrl = document.URL;
    const stuff = fullUrl.split('/');
    const currentId = stuff[stuff.length - 1];

    if (Number(currentId) === 0) {
      this.readAllCarts();
    }
    else {

      this.readOneCart(Number(currentId));
      this.readAllCarts();
    }


    this.readAllCarts();


    this.readOneCart(Number(currentId));
    this.readOne(Number(currentId));


  }

  cancel(): void {
    this.location.back();
  }

  onSubmit(): void {

    const values = this.form.value;
    this.datacart.anzahl = this.datacart.anzahl + values.quantityControl;
    this.updateEventcart.emit(this.datacart);

  }

  readAllCarts(): void {
    this.cs.getAllCarts().subscribe(
      (response: Datacart[]) => {
        console.log(response);
        this.carts = response;
        this.idArray = [];

        this.carts.forEach(element => this.idArray.push(element.id));
        const fullUrl = document.URL;
        const stuff = fullUrl.split('/');
        const currentId = stuff[stuff.length - 1];
        if (this.idArray.includes(Number(currentId)))
        {
          this.isAlreadyIncluded = true;
        }

        console.log('this is the idArray' + this.idArray);
        this.lengthOfCarts = this.carts.length;
        return this.carts = response;  },
      error => console.log(error)
    );
  }

  readOneCart(id: number): void {
    this.cs.getDatacartById(id).subscribe(
      (response: Datacart) => {this.cart = response;
                               this.anzahlCart = this.cart.anzahl; } ,
      error => this.error = error,
    );
  }

  onSubmitc(): void {
    this.datacart = { id: 0, anzahl: 0, userid: ''};
    const values = this.form.value;
    const fullUrl = document.URL;
    const stuff = fullUrl.split('/');
    const currentId = stuff[stuff.length - 1];

    if (values.quantityControl / values.quantityControl !== 1 || values.quantityControl< 0 )
    {
      this.formError = true;
      this.errM = 'Bitte geben Sie eine Zahl ein';
    }



    else if (values.quantityControl > this.data.stock - this.datacart.anzahl)
    {
      this.formError = true;
      this.errM = 'Nicht mehr genügend Artikel erhältlich';

    }




    else {

      if (!this.idArray.includes(Number(currentId))) {
        this.datacart.id = Number(currentId);
        this.datacart.anzahl = values.quantityControl;
        this.cs.createcart(this.datacart);
        this.router.navigate(['/readcart']);
      }
      else {

        this.cs.getDatacartById(Number(currentId)).subscribe(
          (response: Datacart) => {this.cart = response;
            this.anzahlCart = this.cart.anzahl;
            console.log('Ich bin in reaoneCart und das ist' + this.anzahlCart); } ,
          error => this.error = error,
        );

        if ((values.quantityControl > this.data.stock - this.cart.anzahl ))
        {
          this.formError = true;
          this.errM = 'Nicht mehr genügend Artikel erhältlich';
        }

        else {
          console.log('Das ist das id-Array ' + this.idArray);
          const lol = this.form.value;

          this.datacart.id = Number(currentId);
          console.log('ich bin hier' + this.anzahlCart);
          this.datacart.anzahl = this.anzahlCart + values.quantityControl;
          this.updateEventcart.emit(this.datacart);
        }
      }
    }
  }

  readOne(id: number): void {
    this.cs.getDataById(id).subscribe(
      (response: Data) => {this.data = response;
      },
      error => console.log(error)
    );

  }





}
