import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import{AppRoutingModule} from './app-routing.module'

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { HeaderComponent } from './header/header.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { DropdownDirective } from './Shared/dropdown.directive';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {RecipeService} from './recipes/recipe.service'
import { RecipeHeaderComponent } from './recipes/recipe-header/recipe-header.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component'
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    HeaderComponent,
    RecipeDetailComponent,
    DropdownDirective,
    RecipeHeaderComponent,
    RecipeEditComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ShoppingListService,RecipeService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
