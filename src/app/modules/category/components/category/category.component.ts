import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit{
  private service: CategoryService = inject(CategoryService);
  displayColumns:string[]=['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Category>();

  ngOnInit(): void {
    this.getCategories();
  }  

  getCategories(): void {
    this.service.getCategories().subscribe({
      next: (response : any) =>{
        this.processResponseCategories(response);
      },
      error: (error: any)=>{
        console.log('Error',error);
      }
    });
  }

  processResponseCategories(response:any){
    const dataCategory: Category[]=[];

    if(response.metadata[0].code==="0"){
      let listCategory = response.categoryResponse.category;

      listCategory.forEach((element:Category) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<Category>(dataCategory);
    }
  }  
}

export interface Category{
  id: number;
  name:string;
  description:string;  
}
