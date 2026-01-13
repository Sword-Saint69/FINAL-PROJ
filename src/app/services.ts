import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Apiservice {
  constructor(private http:HttpClient){}
  // taking data through api
  getProduct(){
    return this.http.get("https://api.escuelajs.co/api/v1/products");
  }
  
  getUsers() {
    return this.http.get("https://api.escuelajs.co/api/v1/products");
  }
  
  // taking single product through product id
  getsingleProducts(id:string){
    return this.http.get(`https://api.escuelajs.co/api/v1/products/${id}`);
  }
}
