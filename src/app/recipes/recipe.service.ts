import { Recipe } from './recipe.model'
import { Injectable } from '@angular/core';
import { Ingredient } from '../Shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';




// Using the Injectable to inject the shopping-list service into the recipe service
@Injectable()
export class RecipeService {
    recipesChange = new Subject<Recipe[]>();


    private recipes: Recipe[] = [
        new Recipe('Tea or Coffee Cup with a Message', 'Grab a teacup and a Sharpie marker, write a message on the inside bottom of a cup (or on the side of it), and bake for 30 min at 350 F to make the writing permanent. Great for bridal party gifts!', 'https://cdn-media-1.lifehack.org/wp-content/files/2013/01/Sharpie-Tea-Cups.jpg', [
            new Ingredient('Sharpie marker', 1),
            new Ingredient('Mugs', 20)
        ]),

        new Recipe('Pebble Placemat', 'Use a hot glue gun to glue flat beach pebbles to circles of felt or wood. These placemats are perfect to use beneath teapots and warm serving bowls, and they look great at garden parties.', 'https://cdn-media-2.lifehack.org/wp-content/files/2013/01/Pebble-Placemat.jpg', [
            new Ingredient('Hot glue gun', 2),
            new Ingredient('Pebbles', 1)
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

