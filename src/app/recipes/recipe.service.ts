import { Recipe } from './recipe.model'
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';




// Using the Injectable to inject the shopping-list service into the recipe service
@Injectable()
export class RecipeService {
    recipesChange = new Subject<Recipe[]>();


    private recipes: Recipe[] = [
        new Recipe('Paleo Pad-Thai', 'Pad-Thai Paleo way', 'https://d39ziaow49lrgk.cloudfront.net/wp-content/uploads/2015/08/Paleo-Sweet-Potato-Pad-Thai-Recipe.jpg?x16148', [
            new Ingredient('Paleo', 1),
            new Ingredient('Pad-thai', 20)
        ]),

        new Recipe('THE PERFECT BURGER', 'Sink your teeth into a delicious restaurant-style, hamburger recipe made from lean beef. Skip the prepackaged patties and take the extra time to craft up your own, and that little extra effort will be worth it.', 'https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fclassic-burgers-u.jpg%3Fitok%3DPEgZ0zic&w=800&q=85', [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ])
    ];

    constructor(private shoppingListService: ShoppingListService,
        private http: Http, private authService:AuthService) {

    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredients(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients)
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
        this.recipesChange.next(this.recipes.slice())
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChange.next(this.recipes.slice())

    }

    deleteRecipe(index: number) {
        this.recipes.splice(index);
        this.recipesChange.next(this.recipes.slice())
    }

    storeRecipes(recipes: any[]) {
        const token= this.authService.getToken()
        
        return this.http.put('https://ng-recipe-book-58a5b.firebaseio.com/recipes.json?auth='+token, recipes)
    }

    fetchRecipes() {
        // The get token returns a promise (async response)
       const token= this.authService.getToken()
      
         this.http.get('https://ng-recipe-book-58a5b.firebaseio.com/recipes.json?auth='+token)
            .subscribe(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                this.recipes = recipes;
                this.recipesChange.next(this.recipes.slice())
            }
            );
    }

}

