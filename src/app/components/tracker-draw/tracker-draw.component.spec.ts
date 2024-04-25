import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerDrawComponent } from './tracker-draw.component';

describe('TrackerDrawComponent', () => {
  let component: TrackerDrawComponent;
  let fixture: ComponentFixture<TrackerDrawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackerDrawComponent]
    });
    fixture = TestBed.createComponent(TrackerDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
