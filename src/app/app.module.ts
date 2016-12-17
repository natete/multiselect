import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {MultiselectModule} from './multiselect/multiselect.module';
import {MultiselectComponent} from './multiselect/multiselect.component';

@NgModule({
  declarations: [
    AppComponent,
    MultiselectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MultiselectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
