import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleVente } from 'src/app/interfaces/article-vente';
import { Link } from 'src/app/interfaces/link';

@Component({
  selector: 'app-listevente',
  templateUrl: './listevente.component.html',
  styleUrls: ['./listevente.component.css']
})
export class ListeventeComponent {

  @Input() links: Link[] = [];
  @Input() articles: any[] = []
  @Output() otherPage = new EventEmitter<number>();
  @Output() idForDelete  = new EventEmitter<number>(); 
  @Output() articleToSend  = new EventEmitter<ArticleVente>(); 
  idTodeletes: number[] = [];
  deleteOrOk: boolean = true;

  changePage(event: number) {
    // let liClicked = event.target as HTMLLIElement;
    // console.log(liClicked.id);
    // console.log(liClicked.id[liClicked.id.length - 1]);
    this.otherPage.emit(event);
    this.deleteOrOk = true;
  }
  deleteOk(event: Event) {
    // this.deleteOrOk = !this.deleteOrOk;
    let button = event.target as HTMLDivElement;
    // button.textContent = button.textContent === 'Supp' ? 'Ok' : 'Supp';
    if (this.idTodeletes.includes(+button.id)) {
      // console.log("send to delete");
      this.idForDelete.emit(+button.id);
      this.idTodeletes = this.idTodeletes.filter((element: number) => element !== +button.id);
      console.log(this.idTodeletes);
      button.textContent = "Supp";
      button.classList.add("bg-danger");
      button.classList.remove("bg-success");

    }
    else {
      let i: number = 3;
      button.classList.remove("bg-danger");
      button.classList.add("bg-success");
      button.textContent = `Ok(${i})`;
      const count = setInterval(() => {

        i--;
        button.textContent = `Ok(${i})`;
        if (i === 0) {
          clearInterval(count);
          button.textContent = "Supp";
          this.idTodeletes = this.idTodeletes.filter((element: number) => element !== +button.id);
          button.classList.add("bg-danger");
          button.classList.remove("bg-success");
        }
      }, 1000)


      this.idTodeletes.push(+button.id);
      // console.log(this.idTodeletes);

    }
    // console.log(button.id);
    // idTodeletes

  }


  sendTooEdit(article : ArticleVente)
  {
    this.articleToSend.emit(article)
    console.log(article);
    
  }

}
