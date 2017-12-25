import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  // @Output() selectedRecipe= new EventEmitter<Recipe>();

  recipes: Recipe[] = []


  constructor(private recipeService: RecipeService, private router: Router,
    private route: ActivatedRoute, private authservice:AuthService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChange.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }


}
