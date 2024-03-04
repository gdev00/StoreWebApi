import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SharedModule } from '../components/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AdminLayoutComponent],
  exports: [AdminLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ]
})
export class LayoutModule { }
