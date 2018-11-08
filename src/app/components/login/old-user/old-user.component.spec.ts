import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldUserComponent } from './old-user.component';

describe('OldUserComponent', () => {
  let component: OldUserComponent;
  let fixture: ComponentFixture<OldUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
