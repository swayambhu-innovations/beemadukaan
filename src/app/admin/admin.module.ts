import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CustomerRequestsComponent } from './customer-requests/customer-requests.component';
import { UsersListComponent } from './users-list/users-list.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { UploadDataComponent } from './upload-data/upload-data.component';
import { DownloadsComponent } from './downloads/downloads.component';
import {MatIconModule} from '@angular/material/icon'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PoliciesComponent } from './policies/policies.component';
import { AdminAuthGuard } from '../guards/admin-auth.guard';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    CustomerRequestsComponent,
    UsersListComponent,
    PaymentDetailsComponent,
    UploadDataComponent,
    DownloadsComponent,
    PoliciesComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      { path: 'admin/dashboard', component : DashboardComponent,canActivate:[AdminAuthGuard]},
      { path: 'admin/customer-requests', component : CustomerRequestsComponent,canActivate:[AdminAuthGuard]},
      { path: 'admin/users', component : UsersListComponent,canActivate:[AdminAuthGuard]},
      { path: 'admin/payment-details', component : PaymentDetailsComponent,canActivate:[AdminAuthGuard]},
      { path: 'admin/upload-data', component : UploadDataComponent,canActivate:[AdminAuthGuard]},
      { path: 'admin/downloads', component : DownloadsComponent,canActivate:[AdminAuthGuard]},
      { path: 'admin/policies', component : PoliciesComponent,canActivate:[AdminAuthGuard]},
    ])
  ]
})
export class AdminModule { }
