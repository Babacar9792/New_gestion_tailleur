import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Categorie } from 'src/app/interfaces/categorie';
import { Fournisseur } from 'src/app/interfaces/fournisseur';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {



  constructor(private fb: FormBuilder) { }

  @Input() categories: Categorie[] = [];
  @Input() fournisseurs: Fournisseur[] = [];



  fournisseurSelect: Fournisseur[] = [];
  fournisseurSearched: Fournisseur[] = [];
  // @Output() fournisseurSearch = new EventEmitter<string>();

  registerArticle = this.fb.group({
    libelle: ['', [Validators.required, Validators.minLength(3)]],
    prix: [1, [Validators.required, Validators.min(1)]],
    stock: [1, [Validators.required, Validators.min(1)]],
    categorie: ['', Validators.required],
    photo: ['', Validators.required],
    fournisseur : [[], [Validators.minLength(1)]]
  })



  get fournisseur() 
  {
    return this.registerArticle.get('fournisseur');
  }




  onSubmitForm() {
    console.log(this.registerArticle.value);

  }

  searchFournisseur(event: Event) {
    let inputFournisseur = event.target as HTMLInputElement;
    this.fournisseurSearched = [];
    if (inputFournisseur.value !== "") {
      let idsFourniSelected: number[] = this.fournisseurSelect.map((element: Fournisseur) => +element.id);
      this.fournisseurSearched = this.fournisseurs.filter((element: Fournisseur) =>
        element.nom_fournisseur.toLowerCase().startsWith(inputFournisseur.value.toLowerCase())
      ).filter((element: Fournisseur) =>
        !idsFourniSelected.includes(+element.id)
      );

    }
  }

  chooseFournisseur(event: Event) {
    let fournisseurChecked = event.target as HTMLInputElement;
    console.log(fournisseurChecked.value);
    this.fournisseurSelect = this.fournisseurSelect.filter((element: Fournisseur) => element.id !== +fournisseurChecked.value.split('_')[0])
    if (fournisseurChecked.checked) {
      let objet: Fournisseur = {
        id: +fournisseurChecked.value.split('_')[0],
        nom_fournisseur: fournisseurChecked.value.split('_')[1]
      }
      this.fournisseurSelect.push(objet)
      // this.fournisseur.patchValue([]);
      // this.fournisseur.push(this.fb.control(this.fournisseurSelect));
      // this.fournisseur.patchValue(this.fournisseurSelect)
      // this.registerArticle.get("fournisseur")?.value = this.fournisseurSelect;
    }
  }

  deSelectedFournisseur(event: Event) {
    let fournisseurDeselected = event.target as HTMLSpanElement;
    this.fournisseurSelect = this.fournisseurSelect.filter((element: Fournisseur) => element.id !== +fournisseurDeselected.id.split('_')[0])

    let objet: Fournisseur = {
      id: +fournisseurDeselected.id.split('_')[0],
      nom_fournisseur: fournisseurDeselected.id.split('_')[1]
    }
    // this.fournisseurSearched.push(objet)
    this.fournisseurSearched = [];

    // for (const item  of this.fournisseurSearched) {
    //   if (!(item in this.fournisseurSearched)) {
    //     this.fournisseurSearched.push(item);
    //   }
    // }
    // this.fournisseurSearched = [...new Set(this.fournisseurSearched)]

  }

}
