import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from '../category/components/category/category.component';

const dashboardRoutes: Routes = [
    { 
        path: '',
        component: HomeComponent
    },
    { 
        path: 'home',
        component: HomeComponent
    },
    { 
        path: 'category',
        component: CategoryComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RouterDashboardModule { }
