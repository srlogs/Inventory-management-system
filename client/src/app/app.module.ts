import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/admin/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavBarComponent } from './components/admin/side-nav-bar/side-nav-bar.component';
import { IconsModule } from './components/admin/icons/icons.module';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { DeliveryPartnerComponent } from './components/admin/delivery-partner/delivery-partner.component';
import { CustomersComponent } from './components/admin/customers/customers.component';
import { AddCustomerComponent } from './components/admin/add-customer/add-customer.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { NewProductComponent } from './components/admin/new-product/new-product.component';
import { UpdateProductComponent } from './components/admin/update-product/update-product.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    SideNavBarComponent,
    DashboardComponent,
    DeliveryPartnerComponent,
    CustomersComponent,
    AddCustomerComponent,
    ProductListComponent,
    NewProductComponent,
    UpdateProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    IconsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
