import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../../shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { SaveProductComponent } from '../save-product/save-product.component';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  private service = inject(ProductService);
  readonly dialog:MatDialog = inject(MatDialog);
  private snackBar:MatSnackBar = inject(MatSnackBar);
  displayColumns:string[]=['id', 'name', 'price', 'account', 'category', 'picture' ,'actions'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator)
  paginator!:MatPaginator

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.service.getProducts().subscribe({
      next: (response : any) =>{
        this.processResponseProducts(response);
      },
      error: (error: any)=>{
        console.log('Error',error);
      }
    });
  }

  edit(item:Product){
    const dialogRef = this.dialog.open( SaveProductComponent, {
          data: item
        });
    
        dialogRef.afterClosed().subscribe(result => {      
          if (result === 0) {
            this.openSnackBar("Producto actualizado", "Success");
            this.getProducts();
          }else if(result===1){
            this.openSnackBar("Error al actualizar el producto", "Error");
          }
        });
  }

  delete(item:Product){}

  openProductDialog(){
    const dialogRef = this.dialog.open( SaveProductComponent, {
      data: {id: 0, name:'', price:'', account:'', category:'', picture:''}
    });
    
        dialogRef.afterClosed().subscribe(result => {      
          if (result === 0) {
            this.openSnackBar("Producto guardado", "Success");
            this.getProducts();
          }else if(result===1){
            this.openSnackBar("Error al guardar producto", "Error");
          }
        });
  }

  search(name:string){
    if(name.length == 0){
      this.getProducts();
    }else{
      this.service.getProductByName(name).subscribe({
        next: (response : any) =>{
          this.processResponseProducts(response);
        },
        error: (error: any)=>{
          console.log('Error', "Error al recuperar la categoría");
          this.processResponseProducts(error.error);
        }
      });
    }
  }

  processResponseProducts(response:any){
      const dataProduct: Product[]=[];
  
      if(response.metadata[0].code==="0"){
        let listProduct = response.productResponse.products;
  
        listProduct.forEach((element:Product) => {
          element.picture = 'data:image/jpeg;base64,' + element.picture;
          dataProduct.push(element);
        });      
      }
  
      this.dataSource = new MatTableDataSource<Product>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }

    openSnackBar(message:string, action:string):MatSnackBarRef<SimpleSnackBar>{
        return this.snackBar.open(message, action, {
          duration: 2000
        });
      }
}


export interface Product{
  id:number;
  name: string;
  price: number;
  account: number;
  category:any;
  picture:any;
}