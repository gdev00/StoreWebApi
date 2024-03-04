import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '../shared/components/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './customer/customer.component';
import { OrderComponent } from './order/order.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'customer',
    component: CustomerComponent,
  }
];



@NgModule({
  declarations: [DashboardComponent, ProductComponent, CustomerComponent, OrderComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PortalModule { }
