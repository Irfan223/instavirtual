import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsuploadComponent } from './documentsupload/documentsupload.component';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'upload', component: DocumentsuploadComponent},
  {path: 'clients', component: ListClientsComponent},
  {path: 'views/:email', component: ViewDocumentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
