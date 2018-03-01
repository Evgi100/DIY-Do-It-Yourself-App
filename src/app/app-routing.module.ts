import { NgModule } from "@angular/core";
import {Routes, RouterModule}from '@angular/router'

import{AppComponent} from './app.component'
import{ShoppingListComponent} from './shopping-list/shopping-list.component'
import{ShoppingListEditComponent} from './shopping-list/shopping-list-edit/shopping-list-edit.component'
import { RecipesComponent } from "./recipes/recipes.component";
import{HeaderComponent} from './header/header.component';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component'
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeHeaderComponent } from './recipes/recipe-header/recipe-header.component';
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import {AuthGuard} from './auth/auth-guard.service'


const appRoutes:Routes=[
    {path:'' ,redirectTo:'/recipes',pathMatch:'full'} ,
    {path:'shopping-list',component: ShoppingListComponent}, 
    {path:'signup',component:SignupComponent},
    {path:'signin',component:SigninComponent},
    {path:'recipes',component:RecipesComponent,children:[{path:'',component:RecipeHeaderComponent},
    // ** Important notice that the new route comes before the dynamic paramater otherwise angular 
    {path:'new',component:RecipeEditComponent},
    {path:':id',component:RecipeDetailComponent},
    {path:':id/edit',component:RecipeEditComponent} ]}, 
  ];

//   The NgModule makes the component modulare
@NgModule({
    imports:[
        // adding the routes to the angular router
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})

export class AppRoutingModule {

}
