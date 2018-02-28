import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import{ShoppingListService} from './shopping-list.service'
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

  
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredient[];
  private subscription:Subscription;

  constructor(  private shoppingListService:ShoppingListService) { }

  ngOnInit() {
   this.ingredients= this.shoppingListService.getIngredients();
   this.shoppingListService.ingrredintsChange.subscribe(
    (ingredients:Ingredient[])=> {
      this.ingredients=ingredients
    }
   );
  }

  // ngOnDestroy(){
  //   // Using Subject as your own Observable its important to usubscribe to prevent any memory leaks
  //   this.subscription.unsubscribe();
  // }

onEditItem(index:number){
  this.shoppingListService.ingredientEdit.next(index);
}
}
