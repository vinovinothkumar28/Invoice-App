import { Component, OnInit } from '@angular/core';
import { InvoiceServicesService } from 'src/app/services/invoice-services.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-sales-dashboard',
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.css']
})
export class SalesDashboardComponent implements OnInit {

  ELEMENT_DATA;
  displayedColumns: string[] = ['sNo','name','gstNo','totalInvoiceCount', 'action'];
  dataSource;
  tableDatas:any;


  customerDetails: any;

  constructor( private _invoiceService: InvoiceServicesService, private router: Router ) { }

  ngOnInit(): void {

    this._invoiceService.viewCustomerDetails().subscribe((data: any )=>  {
      //console.log(data);
      this.customerDetails = data;
      const ELEMENT_DATA = this.customerDetails;
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    });

    


  }


  makeNewSale(customerId)
  {
    this.router.navigate(['user/sales/newsale',customerId.id]);
  }

  viewSalesByGstNo(customerGstNumber)
  {
    window.localStorage.setItem("customerGstNo",customerGstNumber.gstNo);
    this.router.navigate(['user/sales/viewsales']);
  }

  applyFilter(filterValue)
  {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sampleClick()
  {
    console.log(this.dataSource.data);
  }

}
