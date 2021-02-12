import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
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
import { StocksComponent } from './components/admin/stocks/stocks.component';
import { ProductDisplayComponent } from './components/admin/product-display/product-display.component';
import { AddStockComponent } from './components/admin/add-stock/add-stock.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './components/customer/home/home.component';
import { NavbarComponent } from './components/customer/navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    SideNavBarComponent,
    DashboardComponent,
    DeliveryPartnerComponent,
    CustomersComponent,
    AddCustomerComponent,
    ProductListComponent,
    NewProductComponent,
    UpdateProductComponent,
    StocksComponent,
    ProductDisplayComponent,
    AddStockComponent,
    HomeComponent,
    NavbarComponent,
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
    MatDatepickerModule,
    MatSliderModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
