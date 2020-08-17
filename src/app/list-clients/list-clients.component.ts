import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: "app-list-clients",
  templateUrl: "./list-clients.component.html",
  styleUrls: ["./list-clients.component.css"],
})
export class ListClientsComponent implements OnInit {
  public documents = [];
  public searchKey = "";
  public pageLength: number;
  public pageSize = 10;
  public splicedData: any;
  public pageSizeOptions = [5, 10, 25, 100];
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('userId') === null || undefined && localStorage.getItem('username') === null || undefined) {
         this.router.navigate(["/login"]);
    }
    this.http.get("http://localhost:8000/api/document").subscribe((res) => {
      this.documents = Object.values(res);
      this.pageLength = Object.values(res).length;
      this.splicedData = Object.values(res).slice(((0 + 1) - 1) * this.pageSize).slice(0, this.pageSize);
    });
  }
  pageChangeEvent(event) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.splicedData = this.documents.slice(offset).slice(0, event.pageSize);
  }
  search(event) {
    console.log(event.target.value);
    this.searchKey = event.target.value;
  }
  view(email: any) {
    for (const doc of this.documents) {
      if (doc.clientEmail === email) {
        localStorage.setItem("clientName", doc.clientName);
        localStorage.setItem("clientMobile", doc.clientMobile);
        this.router.navigate(["/views", email]);
      }
    }
  }
}
