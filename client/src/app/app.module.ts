import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';
import { ProductDashboardComponent } from './dashboards/productDashboard/product-dashboard.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    CommonModule,
    FormsModule,
    ProductDashboardComponent
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS,useClass : ErrorInterceptor,multi : true},
    {provide : HTTP_INTERCEPTORS,useClass : LoadingInterceptor,multi : true},
    {provide : HTTP_INTERCEPTORS,useClass : JwtInterceptor,multi : true}
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    OrderDetailedComponent
  ]
})
export class AppModule { }
