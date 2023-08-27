import { Component, OnInit } from '@angular/core';
import { ArticleventeService } from '../services/articlevente.service';
import { ParentService } from '../services/parent.service';
import { Link } from '../interfaces/link';

@Component({
  selector: 'app-articlevente',
  templateUrl: './articlevente.component.html',
  styleUrls: ['./articlevente.component.css']
})
export class ArticleventeComponent implements OnInit {

  links: Link[] = [];
  articles : any[] = [];

  constructor(private articleVenteService: ArticleventeService) { }
  // constructor(private articleVenteService : ParentService) {}

  ngOnInit(): void {

    this.chargeData();
  }

  chargeData(page: number = 1) {

    const vente = this.articleVenteService.getAll("articleVente?page="+page).subscribe({
      next: (value) => {
        this.links = value.links
        // console.log(value);
        
        this.articles = value.data;
        console.log(this.links);

      },
      error: (error) => { console.log(error.message) },
      // complete : (response) => {
      //   console.log(response)
      // }


    }
    );
    setTimeout(() => {
      vente.unsubscribe();
      
    }, 5000);
  }
  changePage(event: String) {
    console.log(event);
    this.chargeData(+event);
    

  }

}
