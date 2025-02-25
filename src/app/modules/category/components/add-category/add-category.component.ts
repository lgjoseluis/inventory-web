import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../shared/services/category.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  standalone: false,
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{    
  readonly dialogRef = inject(MatDialogRef<AddCategoryComponent>);
  private fb = inject(FormBuilder);
  private service = inject(CategoryService);
  

  public categoryForm!: FormGroup;

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name:['', Validators.required],
      description:['', Validators.required]
    });
  }

  onSave(){
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    };

    this.service.saveCategory(data).subscribe({
      next: (response : any) =>{
        this.dialogRef.close(0);
      },
      error: (error: any)=>{
        console.log('Error',error);
        this.dialogRef.close(1);
      }
    });


  }

  onCancel(){
    this.dialogRef.close(2);
  }
}
