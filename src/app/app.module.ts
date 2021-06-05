import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { NoteElementsComponent } from './note-elements/note-elements.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteFormComponent,
    NoteElementsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
