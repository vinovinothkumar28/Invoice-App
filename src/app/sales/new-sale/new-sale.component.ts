import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { InvoiceServicesService } from 'src/app/services/invoice-services.service';


@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.css']
})
export class NewSaleComponent implements OnInit {
  public inId = 0;
  public inNo:any;
  public invoiceId = 0;
  step = 0;
  addressEntred = false;
  public quotationCount = 0;
  public quotations:any;
  public sgstCgst:any;
  public fullTotal: any;
  public subTotal: any;


  constructor( private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private _invoiceService: InvoiceServicesService) { }

  addressForm = this.fb.group({
    invoiceType: ['original'],
    inNo: [''],
    inDate: [''],
    vehNo: [''],
    placeOfSupply: [''],
    name:[''],
    phoneNo: [''],
    gstNo: [''],
    addressLine1: [''],
    addressLine2: [''],
    addressLine3: [''],
    addressLine4: ['']


  });


  //quotationForm: any;
  quotationForm = this.fb.group({
    inid: [this.inId],
    description: [''],
    hsnAsc: [''],
    quantity: [''],
    ratePerUnit: [''],
    gstType:['GST'],
    gst: ['']
  });


  gstTypes = ['0','0.25','3','5','18'];

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.inId = id;
    this.invoiceId = id;

    this.quotationForm = this.fb.group({
      inid: [this.inId],
      description: [''],
      hsnAsc: [''],
      quantity: [''],
      ratePerUnit: [''],
      gstType: ['GST'],
      gst: ['']
    });


    if(this.invoiceId > 0)
    {
      this._invoiceService.getCustomerDetailsForNewSale(this.invoiceId).subscribe((data: any )=>  {
        console.log(data);
        this.addressForm.patchValue(data);
        
      });
    }


    // generate the invoice number
    this._invoiceService.generateInvoiceNumber().subscribe((data: any )=>  {
      console.log(data);
      this.addressForm.patchValue({
        inNo: data.inNo
      });
      
      
    });

    

    


    
    

  }

  onSubmitAddress()
  {
    // console.log(this.addressForm.value);

    this._invoiceService.insertAddress(this.addressForm.value).subscribe((data: any )=>  {
      this.addressEntred = true;
      console.log(data);
      this.invoiceId = data.id;
      this.router.navigate(['user/sales/newsale',data.id]);
      this.quotationFormGroupCreation();
      this.step++;
    });

  }

  addNewQuotation()
  {
    let customerGstNo = this.addressForm.get('gstNo').value;
    this._invoiceService.insertQuotation(this.quotationForm.value,customerGstNo).subscribe((data: any )=>  {
      this.quotationCount++;
      this.quotationFormGroupCreation();
      this.viewQuotationDetails();
    });
    
   // this.router.navigate(['address',this.quotationCount]);
    
  }


  viewQuotationDetails()
  {
    this._invoiceService.viewQuotationDetail(this.invoiceId).subscribe((data: any )=>  {
      //console.log(data.quotations);
      this.quotations = data.quotations;
      this.sgstCgst = data.cgstSgst;
      this.fullTotal = data.fullTotal;
      this.subTotal = data.subTotal;
      console.log(this.sgstCgst);
    });
  }

  

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  quotationFormGroupCreation()
  {
    // let id = parseInt(this.route.snapshot.paramMap.get('id'));
    // this.inId = id;
    this.quotationForm.patchValue({
      inid: this.invoiceId,
      description: '',
      hsnAsc: '',
      quantity: '',
      ratePerUnit: '',
      gstType: 'GST',
      gst: ''
    });
  }

  print()
  {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.inId = id;
    window.open('http://localhost/rjr-invoice-app-api/printInvoice.php?id='+this.inId, '_blank');
  }

  sampleClick1()
  {
    console.log(this.addressForm.get('gstNo').value);
  }

}
