import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowInRoleDirective } from './show-in-role.directive';


@NgModule({
  declarations: [
    ShowInRoleDirective // Declara la directiva
  ],
  exports:[
    ShowInRoleDirective // La exporta para poder usarla en otros módulos
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
