import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[bi-menu-item]',
  templateUrl: './menu-item.component.html',
  styleUrls: []
})
export class MenuItemComponent implements OnInit {

  open: boolean;
  // tslint:disable-next-line: no-input-rename
  @Input('bi-menu-item')
  menu: any;

  constructor(private router: Router, private renderer: Renderer2) { }

  ngOnInit() {
  }

  openMenu(e: { preventDefault: () => void; }){
    e.preventDefault();
    this.open = !this.open;
  }

}
