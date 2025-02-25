import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ConfirmComponent } from './components/confirm/confirm.component';



@NgModule({
  declarations: [
    SidenavComponent,
    ConfirmComponent
  ],
  exports:[
    SidenavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  providers:[
    provideHttpClient(withFetch())
    
  ]
})
export class SharedModule { }
