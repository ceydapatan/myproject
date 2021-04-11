import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../shared/backend.service';
import {Data} from '../../shared/data';
import {ActivatedRoute, Router} from '@angular/router';
import {Datacart} from '../../shared/datacart';
import {HttpErrorResponse} from '@angular/common/http';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import {DarkModeService} from 'angular-dark-mode';
import {Observable} from 'rxjs';




@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;


  constructor(private cs: BackendService,   private router: Router, private route: ActivatedRoute,
              private darkModeService: DarkModeService,
              ) { }


  items: Data[];

  item: Data;
  cart: Datacart;
  selectedId: number;
  selectedIdCart: number;
  error: HttpErrorResponse;
  jewelryName: string;
  i = 0;
  searchNotActivated = true;

  c: Data[];
  dataName: Data;

  length: number;

  options: AnimationOptions = {
    path: '/assets/sadsearch.json',
  };

  ngOnInit(): void {
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.selectedId === 0) {
      this.readAll();
    }
    else {
      console.log('id = ' + this.selectedId);   // nur fuer debug
      this.readOne(this.selectedId);
      this.readOneCart(this.selectedIdCart);

    }

    this.selectedIdCart = Number(this.route.snapshot.paramMap.get('id'));
    if (this.selectedIdCart === 0) {
      this.readAll();
    }
    else {
      console.log('id = ' + this.selectedIdCart);   // nur fuer debug
      this.readOneCart(this.selectedIdCart);
    }

  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  trackByData(index: number, data: Data): number { return data.id; }
  trackByDatacart(index: number, data: Datacart): number { return data.id; }


  readAll(): void {
    this.cs.getAll().subscribe(
      (response: Data[]) => {this.items = response;
                             console.log('Das ist das items Array' + this.items);
                             this.length = this.items.length;
                             this.c = response;
                             this.dataName = this.items[this.i]; },
      error => console.log(error)
    );
  }

  readOne(id: number): void {
    this.cs.getDataById(id).subscribe(
      (response: Data) => {this.item = response;
                           console.log('Das ist der imagePath' + this.item.imagePath); },
      error => console.log(error)
    );
  }

  readOneCart(id: number): void {
    this.cs.getDatacartById(id).subscribe(
      (response: Datacart) => this.cart = response,
      error => this.error = error,

    );
  }

  update(data: Data): void {
    this.item = data;
    console.log(this.item.stock);
    this.cs.updated(this.item.id, this.item);
    this.router.navigateByUrl('/read');
  }


  updatecart(datacart: Datacart): void {
    this.cart = datacart;
    console.log('cart id in readcart ist' + this.cart.id);
    this.cs.updatecart(this.cart.id, this.cart);
    this.router.navigateByUrl('/readcart');
  }



search(): void {
    this.searchNotActivated = false;
    this.cs.getAll().subscribe(
    (response: Data[]) => {this.items = response;
                           this.c = this.items;
                           this.c = [];
                           let index;
                           for (index = 0; index < this.items.length; index++)

    {
                          if (this.items[index].name.toLowerCase().includes(this.jewelryName.toLowerCase()))
                          {
                            this.c.push(this.items[index]);
                          }
    }

                       },
    error => console.log(error)
  );





  }



}
