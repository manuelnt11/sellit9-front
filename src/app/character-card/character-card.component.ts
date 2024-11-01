import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Character } from '../services/character.interface';
import { CharactersStateService } from '../services/characters-state.service';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  @Input({ required: true }) character!: Character;
  public charactersState = inject(CharactersStateService);
  private charactersService = inject(CharactersService);

  onDelete(id: number) {
    this.charactersService.deleteCharacter(id).subscribe(() => {
      this.charactersState.changePage$.next(1);
    });
  }
}
