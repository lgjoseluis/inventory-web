import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from '../category/components/category/category.component';
import { ProductComponent } from '../product/components/product/product.component';

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
    },
    {
        path:'product',
        component: ProductComponent
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
