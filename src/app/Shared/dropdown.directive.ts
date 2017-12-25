import {Directive,Renderer,ElementRef,HostListener} from '@angular/core'
import { HostBinding } from '@angular/core';
@Directive ({
    selector:'[appDropdown]'
})


export class DropdownDirective{
    constructor(private elRef: ElementRef, private renderer: Renderer) { }
    
   @HostBinding('class.open') isOpen=false;

    @HostListener ('click') toogleOpen(eventData:Event){
        this.isOpen=!this.isOpen
      }
    
}

