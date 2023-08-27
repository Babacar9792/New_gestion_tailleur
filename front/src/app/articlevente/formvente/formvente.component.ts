import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formvente',
  templateUrl: './formvente.component.html',
  styleUrls: ['./formvente.component.css']
})
export class FormventeComponent {


  constructor(private fb : FormBuilder) {}

  registerFormForSell = this.fb.group({
    libelle : ['',[Validators.required, Validators.minLength(3)]],
    articleConfectionsSelect : ['', []],
    promo : [0, [Validators.required, Validators.min(0)]],
    
  })





promo : boolean = false;
@ViewChild('promoInput') promoInput !: ElementRef;


  promoOrNone(event : Event){

    let checkBox = event.target as HTMLInputElement;
    console.log(checkBox.checked);
    
    this.promo = checkBox.checked;
    if(!this.promo)
    {
      this.promoInput.nativeElement.value = "0";
    }

  }


  submitForm()
  {
    console.log(this.registerFormForSell.valid);
    
  }
}
