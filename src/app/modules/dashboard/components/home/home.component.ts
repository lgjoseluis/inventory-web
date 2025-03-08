import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Chart } from 'Chart.js/auto';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  private service:ProductService = inject(ProductService);

  chartBar: any;
  chartDoughnut:any;
  chartLine:any;

  ngOnInit(): void {
    this.showProducts();
  }

  showProducts(): void {
    this.service.getProducts().subscribe({
      next: (response : any) =>{
        this.processResponseProducts(response);
      },
      error: (error: any)=>{
        console.log('Error',error);
      }
    });
  }

  processResponseProducts(response:any){
    const nameProduct: String[]=[];
    const account:number[] = [];

    if(response.metadata[0].code==="0"){
      let listProduct = response.productResponse.products;

      listProduct.forEach((element:Product) => {
        nameProduct.push(element.name);
        account.push(element.account);
      });      

      //Bar
      this.chartBar = new Chart(
        'canvas-bar', 
        {
          type: 'bar',
          data : 
          {
            labels : nameProduct,
            datasets : [
              {
                label:'Productos', 
                data:account,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)'
                ],
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)'
                ],
                borderWidth: 1
              }
            ]
          }
        }
      );

      //Doughnut
      this.chartDoughnut = new Chart(
        'canvas-doughnut', 
        {
          type: 'doughnut',
          data : 
          {
            labels : nameProduct,
            datasets : [
              {
                data:account,
                backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)'
                ],
                hoverOffset: 4
              }
            ]
          }
        }
      );

      //Line
      this.chartLine = new Chart(
        'canvas-line', 
        {
          type: 'line',
          data : 
          {
            labels : nameProduct,
            datasets : [
              {
                label:'Productos', 
                data:account,
                fill: false,
                borderColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.1
              }
            ]
          }
        }
      );
    }
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