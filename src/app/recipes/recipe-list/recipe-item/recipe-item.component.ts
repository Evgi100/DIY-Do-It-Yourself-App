import { Component,OnInit,Input,Output,EventEmitter } from '@angular/core';

import{Recipe} from '../../recipe.model'
import{Router,ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // @Input() Recipes:{name:string, desc:string,imagePath:string}

 @Input() recipe:Recipe;
  @Input() index:number

// @Output() linkClicked= new EventEmitter<void>();

  constructor( private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  }

// onLinkPressed(){
//   this.linkClicked.emit();
// }



onReload(){
  this.router.navigate(['recipes'],{relativeTo:this.route})

}

}
