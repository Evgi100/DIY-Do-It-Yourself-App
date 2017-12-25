import { Component,OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  view = 'recipe';

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyDmm4sy3k4k9YoMjhwgETyp_pZV3I9-ofY",
      authDomain: "ng-recipe-book-58a5b.firebaseapp.com"
    });
  }
  onNavigateRecipes(feature: string) {
    this.view = feature;
  }

  onNavigateList(feature: string) {
    this.view = feature;
  }
}
