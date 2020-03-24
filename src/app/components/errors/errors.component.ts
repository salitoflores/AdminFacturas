import { Component, OnInit } from '@angular/core';
import { AbstractControlDirective } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'bi-errors',
  templateUrl: './errors.component.html'
})
export class ErrorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private static readonly errorMessages = {
      'required': () => 'Campo requerido',
      'minlength': (params) => 'El minimo de caracteres es ' + params.requiredLength,
      'maxlength': (params) => 'Los caracteres permitidos son hasta ' + params.requiredLength,
      'pattern': (params) => 'No cumple el patron especificado: ' + params.requiredPattern,
      'years': (params) => params.message,
      'countryCity': (params) => params.message,
      'uniqueName': (params) => params.message,
      'telephoneNumbers': (params) => params.message,
      'telephoneNumber': (params) => params.message
    };

    @Input()
    private control: AbstractControlDirective | AbstractControl;

    shouldShowErrors(): boolean {
      return this.control &&
        this.control.errors &&
        (this.control.dirty || this.control.touched);
    }

    listOfErrors(): string[] {
      return Object.keys(this.control.errors)
        .map(field => this.getMessage(field, this.control.errors[field]));
    }

    private getMessage(type: string, params: any) {
      return ErrorsComponent.errorMessages[type](params);
    }

}
