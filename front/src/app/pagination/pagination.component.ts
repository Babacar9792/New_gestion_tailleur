import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Links } from '../interfaces/links';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() links : Links[] = []
  @Output() otherPage = new EventEmitter<number>();

  changePage(event: Event) {
    let liClicked = event.target as HTMLLIElement;
    this.otherPage.emit(+liClicked.id[liClicked.id.length - 1]);
  }

}
