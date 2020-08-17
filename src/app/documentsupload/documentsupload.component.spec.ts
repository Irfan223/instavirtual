import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsuploadComponent } from './documentsupload.component';

describe('DocumentsuploadComponent', () => {
  let component: DocumentsuploadComponent;
  let fixture: ComponentFixture<DocumentsuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
