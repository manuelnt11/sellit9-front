import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CharactersService } from '../services/characters.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-new-character-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './new-character-form.component.html',
  styleUrl: './new-character-form.component.scss',
})
export class NewCharacterFormComponent {
  readonly dialogRef = inject(MatDialogRef<NewCharacterFormComponent>);
  private charactersService = inject(CharactersService);

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    console.log('Your form data:', form.value);
    this.charactersService.addCharacter({
      name: form.value.name,
      status: form.value.status,
      origin: {name: form.value.origin, url: ''},
      species: form.value.species,
      image: form.value.image,
    }).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
