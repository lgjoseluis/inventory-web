import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../product/product.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-save-product',
  standalone: false,
  templateUrl: './save-product.component.html',
  styleUrl: './save-product.component.css'
})
export class SaveProductComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<SaveProductComponent>);
  private data = inject<Product>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private selectedFile:any;
  private service = inject(ProductService);
  private cateService = inject(CategoryService)

  public statusForm = "Crear"
  public productForm!: FormGroup;
  public categories:Category[] = [];
  public fileName:string="";

  ngOnInit(): void { 
    this.getCategories();

    this.productForm = this.fb.group({
          name:[this.data.name, Validators.required],
          price:[this.data.price, Validators.required],
          account:[this.data.account, Validators.required],
          category:[this.data.category, Validators.required],
          picture:[this.data.picture, Validators.required]
        });

    if(this.data.id===0){
      this.statusForm = 'Actualizar'
    }    
  }

  onSave(){
    const formData = new FormData();

    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('account', this.productForm.get('account')?.value);
    formData.append('categoryId', this.productForm.get('category')?.value);
    formData.append('picture', this.selectedFile, this.selectedFile.name);

    this.service.saveProduct(formData).subscribe({
      next: (response : any) =>{
        this.dialogRef.close(0);
      },
      error: (error: any)=>{
        console.log('Error', "Error al guardar el producto");
        this.dialogRef.close(1);
      }
    });
  }

  onCancel(){
    this.dialogRef.close(2);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.selectedFile = file;
    }
  }

  getCategories(){
    this.cateService.getCategories().subscribe({
      next: (response : any) =>{
        this.categories = response.categoryResponse.category;
      },
      error: (error: any)=>{
        console.log('Error', "Error al recuperar las categorías");
        this.categories = [];
      }
    });
  }
}


export interface Category{
  id: number;
  name:string;
  description:string;  
}