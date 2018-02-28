import{Ingredient} from './../Shared/ingredient.model'

import { EventEmitter } from '@angular/core';
import{Subject} from 'rxjs/Subject'


export class ShoppingListService {
//    Using Subkect as an Observer that can listen to Observables , The Subject is waiting for any chage in the Observable
// The Subject is also an Observable so we can subscribe to it
ingrredintsChange= new Subject<Ingredient[]>()
ingredientEdit= new Subject<number>()

   private ingredients:Ingredient[]=[
        new Ingredient('Coffe mugs',2),
        new Ingredient('Pebbles',7)
        
      ];

      getIngredients(){
          return this.ingredients.slice()
      }

      addIngredint (ingredient:Ingredient) {
          this.ingredients.push(ingredient)
        //   Using subject here to call the Event 
          this.ingrredintsChange.next(this.ingredients.slice())
        
      }

      addIngredients (ingredients:Ingredient[]){
          for(let ingredient of ingredients){
              this.addIngredint(ingredient);
          }
          this.ingrredintsChange.next(this.ingredients.slice())
      }

      getIngredient(index:number){
          return this.ingredients[index]
      }

      updateIngredient(index:number,newIngredient:Ingredient){
          this.ingredients[index]= newIngredient
          this.ingrredintsChange.next(this.ingredients.slice())

      }

      deleteIngredient(index:number){
          this.ingredients.splice(index)
          this.ingrredintsChange.next(this.ingredients.slice());
      }
}