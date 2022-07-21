import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-add-receipt',
  templateUrl: './add-receipt.component.html',
  styleUrls: ['./add-receipt.component.css']
})
export class AddReceiptComponent implements OnInit, OnDestroy {
  @ViewChild('receiptForm')
  receiptForm!: NgForm;
  defaultAmount: number = 100;
  message: string = '';
  isError: boolean = false;
  loading: boolean = false;
  receiptSubscription!: Subscription;
  @Output('newReceipt') newReceipt = new EventEmitter();

  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }

  onSave() {
    this.loading = true;
    this.receiptForm.value.amount = +this.receiptForm.value.amount;
    this.receiptSubscription = this.http.post('receipts', this.receiptForm.value, {})
      .subscribe({
        next: (result) => {
          this.isError = false;
          this.message = result.body.message;
          this.newReceipt.emit(true);
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
        complete: () => {
          this.loading = false;
          this.receiptForm.resetForm();
        }
      })
  }

  ngOnDestroy() {
    this.receiptSubscription.unsubscribe();
  }
}
