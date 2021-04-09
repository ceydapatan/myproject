import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './data';
import {Datacart} from './datacart';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl = 'http://localhost:3000/items';
  cartUrl = 'http://localhost:3000/carts';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Data[]>{
    return this.http.get<Data[]>(this.baseUrl);
  }

  getAllCarts(): Observable<Datacart[]>{
    return this.http.get<Datacart[]>(this.cartUrl);
  }

  getDataById(dataId: number): Observable<Data> {
    return this.http
      .get<Data>(this.baseUrl + '/' + dataId);
  }

  getDatacartById(datacartId: number): Observable<Datacart> {
    return this.http.get<Datacart>(this.cartUrl + '/' + datacartId);
  }


  updated(dataId: number, data: Data): void {
    this.http.put<Data>(this.baseUrl + '/' + dataId, data)
      .subscribe(
        response => {
          console.log(response);
          console.log(response.id);
        },
        error => {
          console.log(error);
        }
      );
  }

  updatecart(datacartId: number, datacart: Datacart): void {
    console.log('backend datacart id ist ' + datacartId );
    this.http.put<Datacart>(this.cartUrl + '/' + datacartId, datacart)
      .subscribe(
        response => {
          console.log(response);
          console.log(response.id);
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteOne(dataIdcart: number): void {
    this.http.delete<Data>(this.cartUrl + '/' + dataIdcart)
      .subscribe(
        response => {
          console.log(response);
          console.log(response.id);
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteAll(): void {
    this.http.delete<Datacart[]>(this.cartUrl)
      .subscribe(
        response => {
          console.log(response);

        },
        error => {
          console.log(error);
        }
      );
  }

  createcart(datacart: Datacart): void {
    this.http.post<Datacart>(this.cartUrl, datacart)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }
}
