import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { AddReceiptComponent } from './receipts/add-receipt/add-receipt.component';
import { ValidateReceiptComponent } from './receipts/validate-receipt/validate-receipt.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ListReceiptComponent } from './receipts/list-receipt/list-receipt.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ReceiptsComponent,
    AddReceiptComponent,
    ValidateReceiptComponent,
    ListReceiptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
