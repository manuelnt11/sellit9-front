import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NewCharacterFormComponent } from '../new-character-form/new-character-form.component';
import { Character } from '../services/character.interface';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-edit-character-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './edit-character-form.component.html',
  styleUrl: './edit-character-form.component.scss',
})
export class EditCharacterFormComponent {
  readonly dialogRef = inject(MatDialogRef<NewCharacterFormComponent>);
  private charactersService = inject(CharactersService);
  readonly character = inject<Character>(MAT_DIALOG_DATA);
  editCharacterForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    console.log('Character:', this.character);
    this.editCharacterForm = this.formBuilder.group({
      name: [this.character.name],
      status: [this.character.status],
      origin: [this.character.origin.name],
      species: [this.character.species],
      image: [this.character.image],
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSubmit() {
    console.log('Your form data:', this.editCharacterForm.value);
    this.charactersService
      .updateCharacter({
        id: this.character.id,
        name: this.editCharacterForm.value.name,
        status: this.editCharacterForm.value.status,
        origin: { name: this.editCharacterForm.value.origin, url: '' },
        species: this.editCharacterForm.value.species,
        image: this.editCharacterForm.value.image,
      })
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
}
