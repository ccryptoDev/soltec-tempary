import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsdrawComponent } from './pointsdraw.component';

describe('PointsdrawComponent', () => {
  let component: PointsdrawComponent;
  let fixture: ComponentFixture<PointsdrawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointsdrawComponent]
    });
    fixture = TestBed.createComponent(PointsdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
