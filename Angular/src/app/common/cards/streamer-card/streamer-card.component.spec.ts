import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamerCardComponent } from './streamer-card.component';

describe('StreamerCardComponent', () => {
  let component: StreamerCardComponent;
  let fixture: ComponentFixture<StreamerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamerCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
