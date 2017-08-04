import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdustDescComponent } from './produst-desc.component';

describe('ProdustDescComponent', () => {
  let component: ProdustDescComponent;
  let fixture: ComponentFixture<ProdustDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdustDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdustDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
