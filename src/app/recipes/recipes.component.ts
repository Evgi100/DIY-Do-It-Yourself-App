import { Component, OnInit } from '@angular/core';
import{Router,ActivatedRoute} from '@angular/router'
import {RecipeService} from './recipe.service'


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {

  

  constructor(private recipeService:RecipeService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    // We use the subsribe method to listen to the service and every change  update the SelectedRecipe to the chosen recipe
  }

  onReload(){
    this.router.navigate(['recipes'],{relativeTo:this.route})
  
  }
}
