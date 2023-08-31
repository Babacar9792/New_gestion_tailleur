import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { Links } from 'src/app/interfaces/links';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() articles : Article[] = [];
  @Input() links : Links[] = [];
  @Output() otherPage = new EventEmitter<number>();

  changePage(event: number) {
    // let liClicked = event.target as HTMLLIElement;
    // console.log(liClicked.id);
    // console.log(liClicked.id[liClicked.id.length - 1]);
    this.otherPage.emit(event);
    // this.deleteOrOk = true;
  }

}
