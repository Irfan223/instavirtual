import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-documentsupload',
  templateUrl: './documentsupload.component.html',
  styleUrls: ['./documentsupload.component.css']
})
export class DocumentsuploadComponent implements OnInit {

  // public uploader:FileUploader = new FileUploader({url: URI});
  // public fileToUpload = null;
  // public fileArray: any = [];
  // constructor() {
  //   this.uploader.onAfterAddingFile = (file) => {
  //     file.withCredentials = false;
  //   };
  //   this.uploader.onCompleteItem = (item: any, response: any, status: any, header: any) => {
  //       this.fileArray.push(JSON.parse(response));
  //       console.log(item)
  //   }
  //  }
public URI = 'http://localhost:8000/api/document';
public selectedFile: File = null;
public selectedFiles = null;
public user: any = {};
public uploadImage = [];
public imgURL = [];
constructor(private http: HttpClient) {

}
  ngOnInit() {
   
  }
  fileUpload(event) {
    this.imgURL = []
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      for (let file of this.selectedFiles) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          var dotIndex = file.name.lastIndexOf('.');
          var ext = file.name.substring(dotIndex);
          this.imgURL.push({name: file.name, ext: ext, url: e.target.result});
          console.log(this.imgURL)
        }
        reader.readAsDataURL(file);
      }
    }
    console.log(this.imgURL)
  }
  fileUploadHandler() {
    const data: FormData = new FormData();
    // If file selected
        if ( this.selectedFiles ) {
          for ( let i = 0; i < this.selectedFiles.length; i++ ) {
            data.append( 'files', this.selectedFiles[ i ], this.selectedFiles[ i ].name );
           }
           data.append('userData', JSON.stringify(this.user))
          this.http.post( this.URI, data)
            .subscribe( ( response ) => {
              if ( 200 === response['status'] ) {
                alert('uploaded successfully');
                this.uploadImage = response['locationArray'];
              } else {
                alert(response);
              }
            })
        } else {
          // if file not selected throw error
          alert( 'Please upload file' );
        }
  }
}
