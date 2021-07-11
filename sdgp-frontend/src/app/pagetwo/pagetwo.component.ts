import { Component, OnInit } from '@angular/core';
import { DatatransferService } from '../datatransfer.service';

@Component({
  selector: 'app-pagetwo',
  templateUrl: './pagetwo.component.html',
  styleUrls: ['./pagetwo.component.css']

})



export class PagetwoComponent implements OnInit {
  constructor(private datatransfer: DatatransferService) { }

  ngOnInit(): void {
    this.loadTableData();
  }

  public tabledata : any[] = [];
  loadTableData() {
    this.datatransfer.getPredData().subscribe((data) => this.tabledata = data);
  }

}
