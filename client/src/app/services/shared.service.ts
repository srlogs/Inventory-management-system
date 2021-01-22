import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private productData = new BehaviorSubject<any>([]);
  getProductData = this.productData.asObservable();
  constructor() {}
  setProductData(data: any) {
    this.productData.next(data);
  }
}
