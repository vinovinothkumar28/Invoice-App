import { Component, OnInit } from '@angular/core';
import { InvoiceServicesService } from 'src/app/services/invoice-services.service';


@Component({
  selector: 'app-view-sales',
  templateUrl: './view-sales.component.html',
  styleUrls: ['./view-sales.component.css']
})
export class ViewSalesComponent implements OnInit {
  invoiceDetails:any;

  constructor( private _invoiceService: InvoiceServicesService ) { }

  ngOnInit(): void {

    const formData = new FormData();
    formData.append('customerGstNo',window.localStorage.getItem("customerGstNo"));

    this._invoiceService.viewInvoiceDetail(formData).subscribe((data: any )=>  {
      //console.log(data);
      this.invoiceDetails = data;
    });


  }

  onPrint(invoice)
  {
    window.open('http://localhost/rjr-invoice-app-api/printInvoice.php?id='+invoice.id, '_blank');
    //alert(invoice.id);
  }



}
