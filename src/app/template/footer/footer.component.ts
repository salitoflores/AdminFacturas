import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bi-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

    fecha: any;
  constructor() {
      this.fecha = new Date();
  }

  ngOnInit() {
  }

}
