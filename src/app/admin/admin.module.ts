import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatIconModule } from '@angular/material/icon'; 
import { DatabaseService } from '../services/database.service';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    AdminRoutingModule
  ],
  providers:[
    DatabaseService,
  ]
})
export class AdminModule { }
