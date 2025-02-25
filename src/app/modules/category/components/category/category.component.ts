import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit{
  readonly dialog:MatDialog = inject(MatDialog);
  private snackBar:MatSnackBar = inject(MatSnackBar);
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

  edit(item:any){
    const dialogRef = this.dialog.open( AddCategoryComponent, {
      width: "450px",
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {      
      if (result === 0) {
        this.openSnackBar("Categoría actualizada", "Success");
        this.getCategories();
      }else if(result===1){
        this.openSnackBar("Error al actualziar la categoría", "Error");
      }
    });
  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open( AddCategoryComponent, {
      width: "450px",
      //data: {name: this.name(), animal: this.animal()},
    });

    dialogRef.afterClosed().subscribe(result => {      
      if (result === 0) {
        this.openSnackBar("Categoría agregada", "Success");
        this.getCategories();
      }else if(result===1){
        this.openSnackBar("Error al guardar la categoría", "Error");
      }
    });
  }  

  openSnackBar(message:string, action:string):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}

export interface Category{
  id: number;
  name:string;
  description:string;  
}
