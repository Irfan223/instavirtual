import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentsuploadComponent } from './documentsupload/documentsupload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import { FileUploadModule } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { SearchPipe } from './search.pipe';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout/logout.component'; // <- import PdfViewerModule
@NgModule({
  declarations: [
    AppComponent,
    DocumentsuploadComponent,
    ViewDocumentsComponent,
    ListClientsComponent,
    SearchPipe,
    LoginComponent,
    HeaderComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FileUploadModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
