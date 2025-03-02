import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
    {
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate:[AuthGuard], 
        loadChildren: () => import('./router-dashboard.module').then(m => m.RouterDashboardModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule { }
