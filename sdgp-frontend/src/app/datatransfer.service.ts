import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CSVRecord } from './component-one/component-one.component';

@Injectable({
  providedIn: 'root'
})
export class DatatransferService {

  constructor(private http: HttpClient) { }

  baseLocalhost: String = "http://127.0.0.1:5000/";

  sendCSVData(csvData: CSVRecord[]) {
    return this.http.post<CSVRecord[]>(this.baseLocalhost + "sendCsvData", csvData);
  }

  getPredData() {
    return this.http.get<any[]>(this.baseLocalhost + "getPredData");
  }





}
