
import { Component} from "@angular/core";
import {RecipeService} from '../recipe.service'

import {Recipe} from '../recipe.model'
import { ActivatedRoute,Params,Router } from "@angular/router";

@Component({
selector:'app-recipe-detail',
templateUrl:'./recipe-detail.component.html'
})

export class RecipeDetailComponent {
  recipe:Recipe;
  id:number


  constructor(private recipeService:RecipeService,
              private route:ActivatedRoute,private router:Router  ){}

  ngOnInit(){
    const Id=this.route.params.subscribe(
(params:Params) => {
  this.id=+params['id'];
  this.recipe=this.recipeService.getRecipe(this.id)

}
    )

  }

  onAddShoppingList(){
    this.recipeService.addIngredients(this.recipe.ingredients)
}

onEditClick(){
  // We adding the 'edit to the current route'
  this.router.navigate(['edit'],{relativeTo:this.route})

}

onRecipeDelete(){
  this.recipeService.deleteRecipe(this.id)
  this.router.navigate(['recipes'])

}




}