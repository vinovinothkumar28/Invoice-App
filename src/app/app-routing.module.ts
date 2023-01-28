import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { NewSaleComponent } from './sales/new-sale/new-sale.component';
import { SalesDashboardComponent } from './sales/sales-dashboard/sales-dashboard.component';
import { ViewSalesComponent } from './sales/view-sales/view-sales.component';
import { EditSalesComponent } from './sales/edit-sales/edit-sales.component';
import { UserComponent } from './user/user.component';
import { SalesComponent } from './sales/sales/sales.component';
import { EditCompanyDetailsComponent } from './manage/mycompany/edit-company-details/edit-company-details.component';
import { ViewCompanyDetailsComponent } from './manage/mycompany/view-company-details/view-company-details.component';
import { EditPasswordComponent } from './manage/password/edit-password/edit-password.component';




const routes: Routes = [
  {
    path: '', redirectTo: 'login',pathMatch: 'full'
  },
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'user', component: UserComponent,
    children: [
      {
        path: 'home', component:HomeComponent
      },
      {
        path: 'sales', component:SalesComponent,
        children: [
          {
            path: '', redirectTo: 'dashboard', pathMatch: 'full'
          },
          {
            path: 'dashboard', component:SalesDashboardComponent
          },
          {
            path: 'edit', component:EditSalesComponent
          },
          {
            path: 'newsale/:id', component:NewSaleComponent
          },
          {
            path: 'viewsales', component:ViewSalesComponent
          }
        ]
      },
      {
        path: 'viewcompany', component: ViewCompanyDetailsComponent
      },
      {
        path: 'editcompany', component: EditCompanyDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent,HomeComponent,NewSaleComponent,SalesDashboardComponent,ViewSalesComponent,EditSalesComponent,UserComponent,SalesComponent,EditCompanyDetailsComponent,ViewCompanyDetailsComponent,EditPasswordComponent];
