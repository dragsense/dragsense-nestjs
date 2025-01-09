import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  let component: CustomTextareaComponent;
  let fixture: ComponentFixture<CustomTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
