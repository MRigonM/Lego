import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from './product-dashboard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ProductToCreate} from "../../shared/models/productToCreate";
import {Brands} from "../../shared/models/brands";
import {Types} from "../../shared/models/types";
import {ShopService} from "../../shop/shop.service";
import {ShopParams} from "../../shared/models/shopParams";
import {SharedModule} from "../../shared/shared.module";

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    SharedModule
  ],
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
    products : Product [] = [];
    brands : Brands [] = [];
    types : Types [] = [];

    shopParams : ShopParams;
  sortOptions = [
    {name: 'Alphabetical' ,value:'name'},
    {name: 'Price: Low to high',value:'priceAsc'},
    {name: 'Price: High to low',value:'priceDesc'},
  ];

  ngOnInit(): void {
      this.getProducts();
      this.getBrands();
      this.getTypes();
    }

  totalcount = 0;
  constructor(private shopService: ShopService) {
    this.shopParams = shopService.getShopParams();
  }

  getProducts(){
    this.shopService.getProducts().subscribe({
      next: response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalcount = response.count;
      },
      error : error => console.log(error)
    })
  }
  getTypes(){
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{id : 0,name : 'All'}, ...response],
      error : error => console.log(error)
    })
  }
  getBrands(){
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{id : 0,name : 'All'}, ...response],
      error : error => console.log(error)
    })
  }

  onSortSelected(event: any){
    const params = this.shopService.getShopParams();
    params.sort = event.target.value;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onPageChanged(event : any){
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.shopParams = params;
      this.getProducts();
    }
  }



  /*products2: ProductToCreate[] = [];
  newProduct2: ProductToCreate = {
    id: 0,       // ID will be generated by the server
    name: '',
    price: 0,
    description: '',
    productType: 1,
    productBrand:1,
    pictureUrl: ''
  };

  products: Product[] = [];
  newProduct: Product = {
    id: 0,       // ID will be generated by the server
    name: '',
    price: 0,
    description: '',
    productType: '',
    productBrand:'',
    pictureUrl: ''
  };
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  // Load products from the service
  getProducts() {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
      error: (err) => console.error('Failed to load products', err)
    });
  }

  // Create a new product using the service
  onCreateProduct() {
    console.log('New Product:', this.newProduct);  // Log the product details
    this.productService.createProduct(this.newProduct2);
  }

  // Update the existing product using the service
  onUpdateProduct(product: ProductToCreate) {
    this.productService.updateProduct(product.id, product).subscribe({
      next: () => this.getProducts(),  // Reload the products after updating
      error: (err) => console.error('Failed to update product', err)
    });
  }

  // Delete a product using the service
  onDeleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => this.getProducts(),  // Reload the products after deleting
      error: (err) => console.error('Failed to delete product', err)
    });
  }

  // Reset the new product form after submission
  resetForm() {
    this.newProduct = {
      id: 0,
      name: '',
      price: 0,
      description: '',
      productType:'',
      productBrand:'',
      pictureUrl: ''
    };
  }*/
}
