import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-updatecart',
  templateUrl: './updatecart.component.html',
  styleUrls: ['./updatecart.component.css']
})
export class UpdatecartComponent implements OnInit {
  selectedId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
  }

}
