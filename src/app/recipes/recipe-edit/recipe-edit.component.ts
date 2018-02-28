import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms'
import { FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Validators } from '@angular/forms';
import { Recipe } from '../recipe.model'
import{Router} from '@angular/router'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private router: ActivatedRoute,
    private recipeService: RecipeService,
  private route:Router) { }

  ngOnInit() {
    const id = this.router.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm() {
    let recipeName = '';
    let recipeImgUrl = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name;
      recipeImgUrl = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, Validators.required)
          })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImgUrl, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      // Notice that the recipeIngredients is an FromArray alredy 
      'ingredients': recipeIngredients
    });
}
onSubmit() {
  // const name = this.recipeForm.value.name;
  // const description = this.recipeForm.value.description;
  // const imagePath = this.recipeForm.value.imagePath;
  // const ingredients = this.recipeForm.value.ingredients
  // const newRecipe = new Recipe(name, description, imagePath, ingredients)

  if (this.editMode) {
    this.recipeService.updateRecipe(this.id, this.recipeForm.value)
  } else {
    this.recipeService.addRecipe(this.recipeForm.value)
  }
  this.route.navigate(['recipes'])
}

onCancel(){
  this.recipeForm.reset();
  this.route.navigate(['../'],{relativeTo:this.router})
}

onIngreedientDelete(index:number){
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
}

onAddIngredient() {
  // Enclosing the statement is telling angular/typescript that this is an FormArray
  (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'name': new FormControl,
      'amount': new FormControl
    })
  )
}

}
