import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../product.model';

declare var M: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm){
    if(form)
    form.reset();
    this.productService.selectedProduct={
      _id : "",
      prodName: "",
      quantity: null,
      price: "",
       
    }
  
  }

  onSubmit(form: NgForm){
    if(form.value._id==""){
  this.productService.postProduct(form.value).subscribe((res)=>{
    this.resetForm(form);
    this.refreshEmployeeList();
    M.toast({html: 'saved successfully', classes:'rounded'}); 
  });
  }
  else{
    this.productService.putProduct(form.value).subscribe((res)=>{
      this.resetForm(form);
      this.refreshEmployeeList();
      M.toast({html: 'updated successfully', classes:'rounded'}); 
    });
  }
  }
  
  refreshEmployeeList(){
    this.productService.getProductList().subscribe((res) =>{
      this.productService.products =res as Product[];
    });
  }

  onEdit(prod: Product){
    this.productService.selectedProduct= prod;
    }


    onDelete(_id: string, form:NgForm) {
      if(confirm('Are you sure to delete this record ?')==true){
        this.productService.DeleteProduct(_id).subscribe((res)=>{
          this.refreshEmployeeList();
          this.resetForm(form);
          M.toast({html: 'deleted successfully', classes:'rounded'}); 
        });
      }
       }
}
