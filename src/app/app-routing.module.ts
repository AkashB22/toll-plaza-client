import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiptsComponent } from './receipts/receipts.component';

const routes: Routes = [
  {
    path: 'receipts', component: ReceiptsComponent
  },
  {
    path: '**', redirectTo: '/receipts'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
