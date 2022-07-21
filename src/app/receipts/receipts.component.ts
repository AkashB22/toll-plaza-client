import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {
  reload: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  triggerReload(){
    this.reload = true;
  }

}
