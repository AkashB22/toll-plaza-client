import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-validate-receipt',
  templateUrl: './validate-receipt.component.html',
  styleUrls: ['./validate-receipt.component.css']
})
export class ValidateReceiptComponent implements OnInit, OnDestroy {
  @ViewChild('validateForm') validateForm !: NgForm;
  message: string = '';
  isError: boolean = false;
  loading: boolean = false;
  validateSubscription!: Subscription;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }

  onValidate(){
    this.loading = true;
    this.validateSubscription = this.http.get(`receipts/${this.validateForm.value.receiptId}/validate`, {})
      .subscribe({
        next: (result) => {
          this.isError = false;
          this.message = result.body.message;
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
          this.validateForm.resetForm();
        }
      })
  }

  ngOnDestroy(): void {
    this.validateSubscription.unsubscribe();
  }

}
