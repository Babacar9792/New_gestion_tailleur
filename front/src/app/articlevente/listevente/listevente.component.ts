import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Link } from 'src/app/interfaces/link';

@Component({
  selector: 'app-listevente',
  templateUrl: './listevente.component.html',
  styleUrls: ['./listevente.component.css']
})
export class ListeventeComponent {

  @Input() links : Link[] = [];
  @Input() articles : any[] = []
  @Output() otherPage = new EventEmitter<string>();
  deleteOrOk : boolean = true;

  changePage(event : Event)
  {
    let liClicked = event.target as HTMLLIElement;
    // console.log(liClicked.id);
    console.log(liClicked.id[liClicked.id.length -1]);
    this.otherPage.emit(liClicked.id[liClicked.id.length -1]);
    this.deleteOrOk = true;
  }
  deleteOk()
  {
    this.deleteOrOk = !this.deleteOrOk;
  }

}
