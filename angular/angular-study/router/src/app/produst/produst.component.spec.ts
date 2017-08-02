import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdustComponent } from './produst.component';

describe('ProdustComponent', () => {
  let component: ProdustComponent;
  let fixture: ComponentFixture<ProdustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
