import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCharacterFormComponent } from './edit-character-form.component';

describe('EditCharacterFormComponent', () => {
  let component: EditCharacterFormComponent;
  let fixture: ComponentFixture<EditCharacterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCharacterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCharacterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
