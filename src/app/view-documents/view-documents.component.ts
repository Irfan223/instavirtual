import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import * as FileSaver from 'file-saver';
@Component({
  selector: "app-view-documents",
  templateUrl: "./view-documents.component.html",
  styleUrls: ["./view-documents.component.css"],
})
export class ViewDocumentsComponent implements OnInit {
  public documentsURL = [];
  public days = [];
  public email: any;
  public clientName: any;
  public clientMobile: any;
  public searchKey: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (
      localStorage.getItem("userId") === null ||
      (undefined && localStorage.getItem("username") === null) ||
      undefined
    ) {
      this.router.navigate(["/login"]);
    }
    this.clientName = localStorage.getItem("clientName");
    this.clientMobile = localStorage.getItem("clientMobile");
    this.route.params.subscribe((params) => {
      this.email = params["email"];
    });
    this.http
      .get("http://localhost:8000/api/document/" + this.email)
      .subscribe((res) => {
        this.documentsURL = Object.values(res);
        for (const doc of this.documentsURL) {
          if (this.days.indexOf(doc.created_on) === -1) {
            this.days.push({created_on: doc.created_on});
          }
        }
        this.days = this.days.filter((v,i,a)=>a.findIndex(t=>(t.created_on === v.created_on))===i);
      });
  }
  delete(key) {
    this.http
      .delete("http://localhost:8000/api/document/" + key)
      .subscribe((res) => {
        console.log(res);
        if (res["status"] === 200) {
          alert(res["message"]);
          this.documentsURL = this.documentsURL.filter(
            (item) => item.documentKey !== key
          );
          this.days = [];
          for (const doc of this.documentsURL) {
            if (this.days.indexOf(doc.created_on) === -1) {
              this.days.push({created_on: doc.created_on});
            }
          }
          this.days = this.days.filter((v,i,a)=>a.findIndex(t=>(t.created_on === v.created_on))===i);
        }
      });
  }
  search(event) {
    console.log(event.target.value);
    this.searchKey = event.target.value;
  }
  download(url, title) {
    FileSaver.saveAs(url, title);
  }
}
