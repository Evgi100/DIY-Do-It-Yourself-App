import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../Shared/Ingredient.model'
import { ShoppingListService } from '../shopping-list.service'
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router'


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],

})
export class ShoppingListEditComponent implements OnInit {

  subscription: Subscription
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient

  @ViewChild('form') editListForm: NgForm;


  constructor(private shoppingListService: ShoppingListService, private router:Router) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.ingredientEdit
      .subscribe((index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.editListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
      )
  }

  onSubmit() {
    const ingredientName = this.editListForm.value.name;
    const ingredientAmount = this.editListForm.value.amount
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.shoppingListService.addIngredint(newIngredient)
    }
     this.editMode=false 
    this.editListForm.reset();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onClear() {
    this.editMode=false 
    this.editListForm.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
