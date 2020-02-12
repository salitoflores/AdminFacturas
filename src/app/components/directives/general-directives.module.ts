import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenteditableformDirective } from './contenteditableform/contenteditableform.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ContenteditableformDirective
  ],
  declarations: [ContenteditableformDirective]
})
export class GeneralDirectivesModule { }
