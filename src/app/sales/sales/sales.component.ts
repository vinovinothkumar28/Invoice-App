import { Component, OnInit } from '@angular/core';
import { InvoiceServicesService } from 'src/app/services/invoice-services.service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  opened = true;
  public id=0;
  public title = "MyCompany"
  constructor( private _invoiceService: InvoiceServicesService ) { }

  ngOnInit(): void {

    




  }

  onViewSalesClick()
  {
    window.localStorage.setItem("customerGstNo","allCustomers");
  }

}
