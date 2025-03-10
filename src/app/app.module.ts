import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appConfig } from './app.config';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule
  ],
  providers: [
    ...appConfig.providers, // TODO: Lectura del archivo json - config
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables())    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
