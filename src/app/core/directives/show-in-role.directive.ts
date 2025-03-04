import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UtilService } from '../../modules/shared/services/util.service';

@Directive({
  selector: '[appShowInRole]',
  standalone: false
})
export class ShowInRoleDirective {
  private authService:UtilService = inject(UtilService);
  private viewContainer:ViewContainerRef = inject(ViewContainerRef);
  private templateRef:TemplateRef<any> = inject(TemplateRef<any>); 

  constructor() { }

  @Input() 
  set appShowInRole(requiredRoles: string[]) {    
    if (this.authService.hasRole(requiredRoles)) {
      this.viewContainer.createEmbeddedView(this.templateRef); // Muestra el elemento
    } else {
      this.viewContainer.clear(); // Oculta el elemento si no tiene permisos
    }
  }
}
