import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  private service = inject(ProductService)
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

  edit(item:Product){}

  delete(item:Product){}

  processResponseProducts(response:any){
      const dataProduct: Product[]=[];
  
      if(response.metadata[0].code==="0"){
        let listProduct = response.productResponse.products;
  
        listProduct.forEach((element:Product) => {
          element.category = element.category.name;
          element.picture = 'data:image/jpeg;base64,' + element.picture;
          dataProduct.push(element);
        });      
      }
  
      this.dataSource = new MatTableDataSource<Product>(dataProduct);
      this.dataSource.paginator = this.paginator;
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