import { Component } from '@angular/core';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent {

  addOrEdit : string = "Ajout";
  valueBooleanToggle : Boolean = false;


  changeMode()
  {
    this.addOrEdit = this.addOrEdit == "Ajout" ? "Edite" : "Ajout";
    this.valueBooleanToggle = !this.valueBooleanToggle;  
  }

}
