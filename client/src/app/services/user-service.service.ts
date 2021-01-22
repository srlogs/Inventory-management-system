import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient, private router: Router) {}

  getHeaders(): any {
    var auth_token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });
    return headers;
  }

  /**
   * Register new User
   * @param data holds the user data
   */
  registerUser(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/newUser', data);
  }

  /**
   * Authenticate user
   * @param data holds the user credentials
   */
  authenticateUser(data: any): Observable<any> {
    console.log(data);
    return this.http.post('http://localhost:3000/api/authenticate', data);
  }

  /**
   * Get delivery partners from the database
   */
  getDeliveryPartners(): Observable<any> {
    return this.http.get('http://localhost:3000/api/getUsers', {
      headers: this.getHeaders(),
    });
  }

  /**
   * Get Customers from the database
   */
  getCustomers(): Observable<any> {
    return this.http.get('http://localhost:3000/api/getCustomers', {
      headers: this.getHeaders(),
    });
  }

  /**
   * Remove delivery partner
   */
  removeDeliveryPartner(data: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/user/${data}`, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Remove customer
   */
  removeCustomers(data: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/customer/${data}`, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Adding customer
   */
  addCustomers(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/addCustomer', data, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Get Products
   */
  getProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/api/getProducts', {
      headers: this.getHeaders(),
    });
  }

  /**
   * Get Units
   */
  getUnits(): Observable<any> {
    return this.http.get('http://localhost:3000/api/getUnits', {
      headers: this.getHeaders(),
    });
  }

  /**
   * Add product
   */
  addProduct(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/addProduct', data, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Remove the product
   */
  removeProduct(data: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/product/${data}`, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Update product
   */
  updateProduct(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/updateProduct', data, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Ending the session by removing the accessToken
   */
  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/']);
  }
}
