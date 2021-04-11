import { Component, OnInit } from '@angular/core';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import {Datacart} from '../shared/datacart';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/page-not-found.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goHome(): void{
    this.router.navigateByUrl('/read');

  }


}
