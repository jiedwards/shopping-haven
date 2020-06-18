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

  retrieveProductList(categoryId: number): Observable<Product[]> {
    // build URL based on category ID
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    console.log(searchUrl);

    return this.httpClient.get<GetProductsResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  retrieveProductCategories(): Observable<ProductCategory[]> {
    console.log(this.httpClient.get<GetProductCategoryResponse>(this.categoryUrl));
    console.log(this.categoryUrl);
    return this.httpClient.get<GetProductCategoryResponse>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}
  interface GetProductsResponse {
    _embedded: {
      products: Product[];
    }
  }

  interface GetProductCategoryResponse {
    _embedded: {
      productCategory: ProductCategory[];
    }
  }