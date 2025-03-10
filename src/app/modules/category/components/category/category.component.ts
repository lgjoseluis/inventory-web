import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';

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
  
  @ViewChild(MatPaginator)
  paginator!:MatPaginator

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
    }

    this.dataSource = new MatTableDataSource<Category>(dataCategory);
    this.dataSource.paginator = this.paginator;
  }  

  processDeleteCategory(item: Category){
    this.service.deleteCategory(item.id).subscribe({
      next: (response : any) =>{
        this.openSnackBar(`Categoría <<${item.name}>> eliminada`, "Success");
        this.getCategories();        
      },
      error: (error: any)=>{
        console.log('Error',error);
        this.openSnackBar("Error al eliminar la categoría", "Error");
      }
    });    
  }

  edit(item:any){
    const dialogRef = this.dialog.open( AddCategoryComponent, {
      //width: "450px",
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

  delete(item:Category){
    const dialogRef = this.dialog.open( ConfirmComponent, {      
      data: `¿Eliminar la categoría <<${item.name}>>?`
    });

    dialogRef.afterClosed().subscribe(result => {      
      if (result === "S") {
        this.processDeleteCategory(item);
      }
    });
  }

  search(term:string){
    if(term.length == 0){
      this.getCategories();
    }else{
      this.service.findCategoryById(Number(term)).subscribe({
        next: (response : any) =>{
          this.processResponseCategories(response);
        },
        error: (error: any)=>{
          console.log('Error', "Error al recuperar la categoría");
          this.processResponseCategories(error.error);
        }
      });
    }
  }

  exportExcel(){
    this.service.exportExcel().subscribe({
      next: (data : any) =>{
        let file = new Blob([data], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        let fileUrl = URL.createObjectURL(file);
        var anchor = document.createElement("a");

        anchor.download = "categories.xlsx";
        anchor.href = fileUrl;

        anchor.click();
      },
      error: (error: any)=>{
        console.log('Error', "Error al recuperar la categoría");
      }
    });
  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open( AddCategoryComponent, {
      //width: "450px"
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
