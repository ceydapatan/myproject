import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Datacart} from '../shared/datacart';
import {BackendService} from '../shared/backend.service';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  form: FormGroup;
  datacart: Datacart;


  options: AnimationOptions = {
    path: '/assets/necklace.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  constructor(
    private cs: BackendService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        idControl: ['', Validators.required],
        anzahlControl: ['', Validators.required],
      }
    );
    this.datacart = { id: 0, anzahl: 0, userid: ''};
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.warn(this.form.value);
    const values = this.form.value;
    this.datacart.id = values.idControl;
    this.datacart.anzahl = values.anzahlControl;
    this.cs.createcart(this.datacart);
    this.router.navigate(['/read']);
  }

  cancel(): void {
    this.router.navigate(['/read']);
  }

}
