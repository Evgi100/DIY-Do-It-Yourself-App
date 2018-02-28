
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model'
import { Response } from '@angular/http'
import { AuthService } from '../auth/auth.service';

@Component({

    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

    // The @Output enables to listen to the event from other components
    recipes: Recipe[] = []
    constructor(private recipeService: RecipeService, public authService: AuthService) {
    }
    ngOnInit() {

    }

    onSave() {
        this.recipeService.storeRecipes(this.recipeService.getRecipes())
            .subscribe(
                (response: Response) => console.log(response),
                (error) => console.log(error)
            )
    }

    onFetch() {
        this.recipeService.fetchRecipes()
    }

    onLogout() {
        this.authService.logout();
    }

}

