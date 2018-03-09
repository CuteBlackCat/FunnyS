import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackcanvasComponent } from './backcanvas.component';

describe('BackcanvasComponent', () => {
  let component: BackcanvasComponent;
  let fixture: ComponentFixture<BackcanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackcanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
