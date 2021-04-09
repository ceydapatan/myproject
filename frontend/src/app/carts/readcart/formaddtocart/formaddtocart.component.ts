import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Datacart } from '../../../shared/datacart';
import { Location } from '@angular/common';





@Component({
  selector: 'app-formaddtocart',
  templateUrl: './formaddtocart.component.html',
  styleUrls: ['./formaddtocart.component.css']
})
export class FormaddtocartComponent implements OnInit {
  @Input() datacart: Datacart;
  @Output() updateEvent = new EventEmitter<Datacart>();
  form: FormGroup;


  constructor(private fb: FormBuilder, private location: Location) {
    this.form = this.fb.group(
      {
        anzahlControl: ['', Validators.required],
      }
    );
  }

  ngOnInit(): void {
    this.form.patchValue({
      anzahlControl: this.datacart?.anzahl,

    });
  }

  onSubmit(): void {
    const values = this.form.value;
    this.datacart.anzahl = values.anzahlControl;
    this.updateEvent.emit(this.datacart);

  }

  cancel(): void {
    this.location.back();
  }

}
