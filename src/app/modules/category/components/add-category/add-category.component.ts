import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../shared/services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../category/category.component';

@Component({
  selector: 'app-add-category',
  standalone: false,
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{    
  readonly dialogRef = inject(MatDialogRef<AddCategoryComponent>);
  private data = inject<Category>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private service = inject(CategoryService);
  
  public statusForm = "Actualizar"
  public categoryForm!: FormGroup;

  ngOnInit(): void {  
    if(this.data===null){
      this.data = {id:0, name:"", description:""};
      this.statusForm ="Agregar";
    }

    this.categoryForm = this.fb.group({
      name:[this.data.name, Validators.required],
      description:[this.data.description, Validators.required]
    });
  }

  onSave(){
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    };

    if(this.data.id ===0){
      this.service.saveCategory(data).subscribe({
        next: (response : any) =>{
          this.dialogRef.close(0);
        },
        error: (error: any)=>{
          console.log('Error',error);
          this.dialogRef.close(1);
        }
      });
    }else{
      this.service.updateCategory(data, this.data.id).subscribe({
        next: (response : any) =>{
          this.dialogRef.close(0);
        },
        error: (error: any)=>{
          console.log('Error',error);
          this.dialogRef.close(1);
        }
      });
    }    
  }

  onCancel(){
    this.dialogRef.close(2);
  }
}
