import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-itemvente',
  templateUrl: './itemvente.component.html',
  styleUrls: ['./itemvente.component.css']
})
export class ItemventeComponent {

  @Input() article : any;
}
