import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InvoiceServicesService } from 'src/app/services/invoice-services.service';



@Component({
  selector: 'app-edit-company-details',
  templateUrl: './edit-company-details.component.html',
  styleUrls: ['./edit-company-details.component.css']
})
export class EditCompanyDetailsComponent implements OnInit {

  public isDisabled: boolean = true;

  public acadamicYears =['20-21','21-22','22-23','23-24']

  constructor( private fb: FormBuilder, private _invoiceService: InvoiceServicesService ) { }

  myCompanyForm = this.fb.group({
    companyName: [''],
    companyContactNumber: [''],
    companyMailId: [''],
    companyGstNumber: [''],
    companyAddressLine1: [''],
    companyAddressLine2: [''],
    companyDistric: [''],
    companyPinCode: [''],
    companyState: [''],
    companyAcadamicYear: ['']
    
  });

  ngOnInit(): void {

    this._invoiceService.viewMyCompanyDetails().subscribe((data: any )=>  {
      //console.log(data);
      if(data.status == "true")
      {
        console.log(data);
        this.myCompanyForm.patchValue(data.companyDetails);

      }
      else
      {
        alert("Still Doesn't Create Company Details..!");
      }
      
    });


  }

  onSubmit()
  {

   
    // alert(this.myCompanyForm.value.companyState);
     console.log(this.myCompanyForm.value);
    this._invoiceService.updateMyCompanyDetails(this.myCompanyForm.value).subscribe((data: any )=>  {
     alert("The Company Details were Updated..!");
      
    });
  }
 

}
