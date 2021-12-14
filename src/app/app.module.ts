import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  GridModule,
  PDFModule,
  ExcelModule,
} from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { IconsModule } from '@progress/kendo-angular-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';



@NgModule({
  declarations: [AppComponent, CustomerListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    PDFModule,
    InputsModule,
    ExcelModule,
    BrowserAnimationsModule,
    DialogsModule,
    HttpClientModule,
    ReactiveFormsModule,
    IconsModule,
    LabelModule,
    ButtonsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
