import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamEditorComponent } from './stream-editor.component';

describe('StreamEditorComponent', () => {
  let component: StreamEditorComponent;
  let fixture: ComponentFixture<StreamEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
