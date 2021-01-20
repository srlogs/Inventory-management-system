import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCustomerComponent } from './components/admin/add-customer/add-customer.component';
import { CustomersComponent } from './components/admin/customers/customers.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { DeliveryPartnerComponent } from './components/admin/delivery-partner/delivery-partner.component';
import { HomeComponent } from './components/admin/home/home.component';
import { NewProductComponent } from './components/admin/new-product/new-product.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { SideNavBarComponent } from './components/admin/side-nav-bar/side-nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'admin/home',
    component: HomeComponent,
  },
  {
    path: 'admin/sidenav',
    component: SideNavBarComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'deliveryPartners',
        component: DeliveryPartnerComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'addCustomer',
        component: AddCustomerComponent,
      },
      {
        path: 'products',
        component: ProductListComponent,
      },
      {
        path: 'newProduct',
        component: NewProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
