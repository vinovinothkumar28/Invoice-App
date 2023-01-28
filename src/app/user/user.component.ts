import { Component, OnInit } from '@angular/core';
import { InvoiceServicesService } from '../services/invoice-services.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public companyTitle = "MyCompany";

  constructor( private _invoiceService:InvoiceServicesService ) { }

  ngOnInit(): void {

    this._invoiceService.viewMyCompanyDetails().subscribe((data: any )=>  {
      //console.log(data);
      if(data.status == "true")
      {
        this.companyTitle= data.companyDetails.companyName;
      }
      else
      {
        alert("Still Doesn't Create Company Details..!");
      }
      
    });


  }

}
