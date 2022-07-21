import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-list-receipt',
  templateUrl: './list-receipt.component.html',
  styleUrls: ['./list-receipt.component.css']
})
export class ListReceiptComponent implements OnInit, OnDestroy, OnChanges {
  @Input('reloadChanges') reload: boolean = false;
  loading: boolean = false;
  message: string = '';
  isError: boolean = false;
  receipts: any = [];
  totalRecords: number = 0;
  pages: number[] = [];
  listReceiptsSubscription!: Subscription;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.pageChange(1, null);
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['reload'].currentValue){
      this.pageChange(1, null);
    }
  }

  pageChange(pageNo: number, event: Event | null) {
    if (event) event.preventDefault();
    this.loading = true;
    this.listReceiptsSubscription = this.http.get('receipts', {
      params: {
        perPageRecords: 10,
        pageNo: pageNo
      }
    }).subscribe({
      next: (result) => {
        this.isError = false;
        this.receipts = result.body.receipts;
        this.totalRecords = result.body.totalCount;
        if (this.pages.length === 0) {
          let pages = Math.round(this.totalRecords / 10);
          for (let i = 1; i <= pages; i++) {
            this.pages.push(i)
          }
        }
      },
      error: (e) => {
        this.loading = false;
        this.isError = true;
        if (e && Array.isArray(e)) {
          if (e.length === 1) {
            this.message = e[0].message;
          } else {
            this.message = e.reduce((prevItem, currentItem) => {
              return `${prevItem.message} and ${currentItem.message}`
            });
          }
        } else {
          this.message = e.message;
        }
      },
      complete: () => this.loading = false
    })
  }

  ngOnDestroy() {
    this.listReceiptsSubscription.unsubscribe();
  }

}
