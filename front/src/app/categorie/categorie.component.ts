import { Component, OnInit, isDevMode } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from '../services/categorie.service';
import { DataResponse } from '../interfaces/data-response';
import { Categorie } from '../interfaces/categorie';
import { Links } from '../interfaces/links';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {




  addOrEdit: string = "Ajout";
  valueBooleanToggle: Boolean = false;
  categories: Categorie[] = [];
  links: Links[] = []
  idTodeletes : number[] = [];
  allCheckedOrNo : boolean = false;
  typeCategorie = environment.typeCategorie;  



  constructor(private categorieService: CategorieService, private fb : FormBuilder) { }

 
  registerCategorie = new FormGroup({
    libelle: new FormControl('', [Validators.required, Validators.minLength(3)]),
    type_categorie : new FormControl('', [Validators.required])
  })


  changeMode() {
    let check = document.querySelectorAll('input');
    check.forEach(element => {
      element.checked = false
      
    });
    this.addOrEdit = this.addOrEdit == "Ajout" ? "Edite" : "Ajout";
    this.valueBooleanToggle = !this.valueBooleanToggle;
    this.idTodeletes = [];
    this.allCheckedOrNo = false;
  }

  onSubmit() {
    this.categorieService.addElement<Categorie>(this.registerCategorie.value, "categorie").subscribe({
      next : (value : DataResponse<Categorie>) => { console.log(value);
        console.log(value.message);
        if (value.status) {
          this.registerCategorie.reset();
          this.categories.pop();
          this.categories.unshift(value.data);
        }

      },
      error : (error) => {
        console.log(...error.error.message.libelle);
        
      }
    })

    // console.log(this.registerCategorie.value);
    
    
  }
  deleteCategories()
  {
    this.categorieService.delete("categorie/0", {ids : this.idTodeletes}).subscribe({
      // next : (value : DataResponse<Categorie>) => { console.log(value);
      // },
      // error : (error) => {
      //   console.log(...error.error.message);
        
      // }
    })

    console.log(this.idTodeletes);
    
  }

  ngOnInit(): void {
    this.chargeData();

  }
  chargeData(page: number = 1) {
   const value =  this.categorieService.getAll("categorie?page="+page).subscribe({
      next: (value: DataResponse<Categorie[]>) => {
        console.log(value.data);
        this.categories = value.data;
        this.links = value.links!;
      },
      error: (error) => {
        console.log(error);
      }
    })

    setTimeout(() => {
      value.unsubscribe();
      
    }, 10000);

  }

  changePage(event: Event) {
    let aClicked = event.target as HTMLLinkElement;
    this.chargeData(+aClicked.id[aClicked.id.length - 1]);
  }

  checkedAll(event : Event)
  {
    let inpuChecboxAll = event.target as HTMLInputElement;
    this.idTodeletes = [];
    this.allCheckedOrNo = inpuChecboxAll.checked;
    if(inpuChecboxAll.checked)
    {
      this.idTodeletes = this.categories.map((element : Categorie) => { return element.id!})
    }
    console.log(this.idTodeletes);
  }

  checkCategorie(event : Event)
  {
    let liChecked = event.target as HTMLInputElement;
    this.idTodeletes = this.idTodeletes.filter((element : number) => element !== +liChecked.id);
    if(liChecked.checked)
    {
      this.idTodeletes.push(+liChecked.id)
    }
  }



}
