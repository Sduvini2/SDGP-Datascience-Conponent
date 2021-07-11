import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatransferService } from '../datatransfer.service';

@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.css']
})
export class ComponentOneComponent implements OnInit {


  public csvRecords: any[] = [];
  @ViewChild('fileImportInput') fileImportInput: any;
  csvAdded : boolean = false;

  constructor(private datatransfer : DatatransferService) { }
  
  ngOnInit(): void {
  }

  submit(){
    this.datatransfer.sendCSVData(this.csvRecords).subscribe((data)=>{
    })
  }

  fileChangeListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;
    
    if (this.isCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

     reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        // this.datatransfer.sendCSVData(this.csvRecords).subscribe();
        this.csvAdded = true;
      };

      reader.onerror = function () {
        alert('Unable to read ' + input.files[0]);
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let dataArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let data = (<string>csvRecordsArray[i]).split(',');

      // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
      // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA
      if (data.length == headerLength) {

        let csvRecord: CSVRecord = new CSVRecord();

        csvRecord.date = data[0].trim();
        csvRecord.store = data[1].trim();
        csvRecord.item = data[2].trim();
        csvRecord.sales = data[3].trim();

        dataArr.push(csvRecord);
      }
    }
    return dataArr;
  }

  // CHECK IF FILE IS A VALID CSV FILE
  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  // GET CSV FILE HEADER COLUMNS
  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
    this.csvAdded=false;
  }


}

export class CSVRecord {
  public date: any;
  public store: any;
  public item: any;
  public sales: any;
}
