import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { find } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { ArticleVente } from 'src/app/interfaces/article-vente';
import { Categorie } from 'src/app/interfaces/categorie';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-formvente',
  templateUrl: './formvente.component.html',
  styleUrls: ['./formvente.component.css']
})

export class FormventeComponent {
  @Input() allCategories: Categorie[] = [];


  validationMarge(c: AbstractControl): { [key: string]: boolean } | null {
    if (!!c.value && c.value < 5000) {
      return { 'valmin': true };
    }
    return null;
  }

  validationPromo(c: AbstractControl): { [key: string]: boolean } | null {
    if (c.value && (c.value > 100 || c.value < 0)) {
      return { 'valmin': true };
    }
    return null;
  }




  ValidationConfectionByVente(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value || !Array.isArray(value)) {
        return null;
      }
      let categoriesMin = this.allCategories.filter((element: Categorie) => environment.minConfection.includes(element.libelle)).map((element: Categorie) => element.id);

      // Check if all categoriesMin IDs are present in selectedCategoryIds
      const allCategoriesMinIncluded = categoriesMin.every(id =>
        value.some((element: any) => element.categorie && element.categorie.id === id)
      );

      if (!allCategoriesMinIncluded) {
        return { 'minCategorieConfectionRequired': true };
      }

      return null;
    };
  }




  //  ValidationConfectionByVente(c: AbstractControl): { [key: string]: boolean } | null {
  //   let categoriesMin = this.allCategories.filter((element: Categorie) => environment.minConfection.includes(element.libelle)).map((element: Categorie) => element.id);
  //   if (categoriesMin.length < 3) {
  //     return { 'lengthCategorie': true };
  //   }
  //   if (!!c.value && c.value.length < 3) {
  //     return { 'lengthConfection': true };
  //   }
  //   let confections = c.value as any[];
  //   let confectionsIds: number[] = confections.map((element: any) => element.categorie.id);
  //   let confectionsCategories = this.removeDuplicate<number>(confectionsIds);
  //   if (confectionsCategories.length < 3) {
  //     return { 'minimumConfection': true };
  //   }
  //   let intersections = categoriesMin.filter(x => confectionsCategories.indexOf(x!) !== -1);
  //   if (intersections.length < 3) {
  //     return { 'minCategorieConfectionchoose': true };
  //   }
  //   return null;
  // }


  @Input() articlesConfections: Article[] = [];
  @Input() categories: Categorie[] = [];
  // categories : Categorie[] = this.allCategories.filter((element : Categorie) => element.type_categorie === 'AV');
  @Output() newArticle = new EventEmitter<FormGroup>();
  image: string = environment.logo;
  fileToSend?: File;
  newPatch: number = -1;

  // articleSearched : Article[] = [];
  referenceAttribut: string = '';
  promo: boolean = false;
  @ViewChild('promoInput') promoInput!: ElementRef;
  articleSearched: Article[] = [];

  // ------------------------------------------------------------------------------------



  // emailValidator(): ValidatorFn {
  //   return (control: AbstractControl): {[key: string]: any} | null => {
  //     // const forbidden = !control.value.endsWith('gmail.com');
  //     const forbidden = !control.value ;
  //     return forbidden ? {'forbidden': {value: control.value}} : null;
  //   };
  // }









  // -----------------------------------------------------------------


  constructor(private fb: FormBuilder) { }

  registerFormForSell = this.fb.group({
    id: ['', []],
    libelle: ['', [Validators.required, Validators.minLength(3)]]!,
    promo: [0, [Validators.required, Validators.min(0), this.validationPromo]],
    reference: ['', []],
    prix_vente: [5000, []],
    prix_confection: [0, [Validators.min(1)]],
    photo: ['', []],
    categorie: ['', [Validators.required]],
    confection_by_vente: this.fb.array([], [this.ValidationConfectionByVente()]

    ),
    marge: [5000, [Validators.required, this.validationMarge]]
  })



  onSubmitForm() {
    // let formData = new FormData();
    // formData.append("libelle", this.libelle?.value!)
    // formData.append("prix_vente", this.registerFormForSell.get("prix_vente")!.value!.toString())
    // formData.append("promo",this.registerFormForSell.get('reference')!.value!.toString() )
    // formData.append("categorie", this.categorieSelect.nativeElement.value.split('_')[0])
    // formData.append("fournisseurs_ids", JSON.stringify(this.fournisseursSelected.map((element: Fournisseur) => { return element.id })));
    // formData.append("photo", this.fileToSend);
    // formData.append("reference", this.reference);

    console.log(this.registerFormForSell.value);
    this.newArticle.emit(this.registerFormForSell)
  }

  get confection_by_vente(): FormArray {
    return this.registerFormForSell.controls['confection_by_vente'] as FormArray;
  }

  get libelle() {
    return this.registerFormForSell.get("libelle");
  }
  get categorie() {
    return this.registerFormForSell.get("categorie");
  }
  get reference() {
    return this.registerFormForSell.get('reference');
  }
  get marge() {
    return this.registerFormForSell.get('marge');
  }

  searchArticleConfection(event: Event, i: number) {
    let searched = event.target as HTMLInputElement;
    this.articleSearched = [];
    if (searched.value !== '') {
      this.newPatch = i;
      console.log(this.newPatch);

      this.articleSearched = this.articlesConfections.filter((element: Article) => element.libelle.toLowerCase().startsWith(searched.value.toLowerCase()));
      this.articleSearched = this.articleSearched.filter((element: Article) => this.confection_by_vente.value.map((ele: any) => ele.article_id).indexOf(element.id) === -1);
    }
    console.log(this.articlesConfections);

    // console.log(searched.value);

  }

  // ArticleForm = this.fb.group({

  // });







  promoOrNone(event: Event) {

    let checkBox = event.target as HTMLInputElement;
    console.log(checkBox.checked);

    this.promo = checkBox.checked;
    if (!this.promo) {
      this.promoInput.nativeElement.value = "0";
    }

  }




  calculPrixConfection(i: number, event : Event) {
    // console.log();
    let input = this.superieurZero(event);
    let arti: Article | undefined = this.articlesConfections.find((element: Article) => element.id === this.confection_by_vente.controls[i].value.article_id);
    if (arti !== undefined) {
      let i = 0;
      let somme = 0;
      for (const iterator of this.confection_by_vente.value) {
        if (iterator.quantite_necessaire != "") {
          console.log(this.confection_by_vente.controls[i].value);
          somme = somme + this.articlesConfections.find((element: Article) => element.id === this.confection_by_vente.controls[i].value.article_id)!.prix * iterator.quantite_necessaire
        }
        i++;
      }
      this.registerFormForSell.controls['prix_confection'].setValue(somme);
      this.registerFormForSell.controls.prix_vente.setValue(somme + this.marge!.value!)
      console.log(this.marge?.value);
    }
  }

  changeMarge() {
    this.registerFormForSell.controls.prix_vente.setValue(this.registerFormForSell.controls.prix_confection!.value! + this.marge!.value!);
  }

  addConfection() {
    const articleForm = this.fb.group({
      libelle_article: ["", [Validators.required]],
      article_id: [],
      quantite_necessaire: [0, [Validators.required, Validators.min(1)]],
      categorie: [null]
    });

    this.confection_by_vente.push(articleForm);
    // console.log(this.confection_by_vente.value);
  }

  removeSkill(i: number) {
    this.confection_by_vente.removeAt(i);
  }
  generateReference(libelleValue: string, categoirie: Categorie) {
    let nombre = categoirie.enregistrement_categorie! + 1;
    this.referenceAttribut = "REF-" + libelleValue.substring(0, 3).toUpperCase() + '-' + categoirie.libelle.toUpperCase() + '-' + nombre;
    this.reference?.setValue(this.referenceAttribut);
  }

  getReference(event: Event) {
    console.log(this.libelle?.value);
    if (this.categorie?.value === '') {
      let categoirie: Categorie = {
        libelle: '',
        type_categorie: '',
        id: 0,
        enregistrement_categorie: 0
      }
      this.generateReference(this.libelle!.value!, categoirie)
    }

    else {
      let ref: any = this.categorie?.value
      this.generateReference(this.libelle!.value!, ref)
    }
    // console.o(this.categorie?.value);


  }
  selectArticleConfection(event: Event) {

    let article = event.target as HTMLInputElement;
    console.log(article.value);
    console.log(this.articlesConfections);

  }

  chargeImage(event: Event) {
    // let img = event.target as HTMLInputElement;
    // console.log(img.value);
    // let image = img?.files!['0'];
    // this.fileToSend = image;
    // this.image = URL.createObjectURL(image);





    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image = e.target.result;
        console.log(this.image);
        this.registerFormForSell.get("photo")?.setValue(e.target.result)

      };
      reader.readAsDataURL(file);
    }
  }

  selectedArticleConfectionLi(event: Event) {
    let li = event.target as HTMLLIElement;
    console.log(li.textContent);
    console.log(this.articlesConfections.find((element: Article) => element.id === +li.id));
    const dian = this.confection_by_vente.controls[this.newPatch] as FormGroup;
    let sugg = this.articlesConfections.find((element: Article) => element.id === +li.id);
    dian.controls['libelle_article'].setValue(sugg?.libelle);
    dian.controls['article_id'].setValue(sugg?.id);
    dian.controls['categorie'].setValue(sugg?.categorie);
    this.articleSearched = [];
  }

  removeDuplicate<T>(tab: T[]) {
    let newTab = new Set<T>();
    tab.forEach((element: T) => {
      newTab.add(element);
    });
    return [...newTab];
  }

  compareWith = (cat1: Categorie, cat2: Categorie): boolean => {
    return cat1 && cat2 ? cat1.id == cat2.id : cat1 == cat2;

  }


  superieurZero(event: Event) {
    let input = event.target as HTMLInputElement;
    if (input.value.startsWith('-') || input.value === '') {
      input.value = "1";
      return "1";
    }
    return input.value;
  }
}
