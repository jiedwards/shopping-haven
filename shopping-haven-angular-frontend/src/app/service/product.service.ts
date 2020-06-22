import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) { }

  retrieveProduct(productId: number): Observable<Product> {

    const productUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  retrieveProductList(categoryId: number): Observable<Product[]> {
    // build URL based on category ID
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.getProducts(searchUrl);
  }

  retrieveProductListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetProductsResponse> {
    const url = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePage}`
      + `&size=${thePageSize}`;

    return this.httpClient.get<GetProductsResponse>(url);
  }

  retrieveProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetProductCategoryResponse>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    // build URL based on keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);

  }

  //Ensures that pagination is available whilst in search mode
  searchProductsPaginate(thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<GetProductsResponse> {
    const url = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
      + `&page=${thePage}`
      + `&size=${thePageSize}`;

    return this.httpClient.get<GetProductsResponse>(url);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetProductsResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

}

//Maps the JSON response from the REST API to Angular objects 

interface GetProductsResponse {
  _embedded: {
    products: Product[];
  }
}

interface GetProductCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}