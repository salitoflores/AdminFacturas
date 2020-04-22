import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenteditableformDirective } from './contenteditableform/contenteditableform.directive';
import { CollapseDirective } from './collapse/collapse.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ContenteditableformDirective,
    CollapseDirective
  ],
  declarations: [ContenteditableformDirective, CollapseDirective]
})
export class GeneralDirectivesModule { }
