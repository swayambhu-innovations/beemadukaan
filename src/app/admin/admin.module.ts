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



@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    CustomerRequestsComponent,
    UsersListComponent,
    PaymentDetailsComponent,
    UploadDataComponent,
    DownloadsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'admin/dashboard', component : DashboardComponent},
      { path: 'admin/customer-requests', component : CustomerRequestsComponent},
      { path: 'admin/users', component : UsersListComponent},
      { path: 'admin/payment-details', component : PaymentDetailsComponent},
      { path: 'admin/upload-data', component : UploadDataComponent},
      { path: 'admin/downloads', component : DownloadsComponent}
    ])
  ]
})
export class AdminModule { }
