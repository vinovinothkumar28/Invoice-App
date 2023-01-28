import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InvoiceServicesService {
  public _baseUrl = "http://localhost/rjrinfrastructures/";

  constructor( private http: HttpClient ) { }

  
  insertAddress(addressData): Observable<any>
  {
    return this.http.post<any>(this._baseUrl+"insertAddress.php",addressData);
  }

  insertQuotation(quotationData: any,customerGstNo: any): Observable<any>
  {
    return this.http.post<any>(this._baseUrl+"insertQuotations.php?customerGstNo="+customerGstNo,quotationData);
  }

  viewQuotationDetail(invoiceId): Observable<any>
  {
    return this.http.get<any>(this._baseUrl+"viewQuotations.php?id="+invoiceId);
  }

  viewInvoiceDetail(formData): Observable<any>
  {
    return this.http.post<any>(this._baseUrl+"list.php",formData);
  }

  viewCustomerDetails(): Observable<any>
  {
    return this.http.get<any>(this._baseUrl+"selectCustomerNames.php");
  }

  getCustomerDetailsForNewSale(invoiceId): Observable<any>
  {
    return this.http.get<any>(this._baseUrl+"selectCustomerDetailsForNewSale.php?id="+invoiceId);
  }

  viewMyCompanyDetails(): Observable<any>
  {
    return this.http.get<any>(this._baseUrl+"viewCompanyDetails.php");
  }

  updateMyCompanyDetails(companyDetails): Observable<any>
  {
    return this.http.post<any>(this._baseUrl+"updateCompanyDetails.php",companyDetails);
  }

  generateInvoiceNumber(): Observable<any>
  {
    return this.http.get<any>(this._baseUrl+"generateInvoiceId.php");
  }



}
