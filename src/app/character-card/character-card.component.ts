import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Character } from '../services/character.interface';
import { CharactersStateService } from '../services/characters-state.service';
import { CharactersService } from '../services/characters.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCharacterFormComponent } from '../edit-character-form/edit-character-form.component';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  readonly dialog = inject(MatDialog);
  @Input({ required: true }) character!: Character;
  public charactersState = inject(CharactersStateService);
  private charactersService = inject(CharactersService);

  openNewCharacterForm(): void {
    const dialogRef = this.dialog.open(EditCharacterFormComponent, {
      data: this.character,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.charactersState.changePage$.next(1);
      }
    });
  }

  onDelete() {
    this.charactersService.deleteCharacter(this.character.id).subscribe(() => {
      this.charactersState.changePage$.next(1);
    });
  }
}
