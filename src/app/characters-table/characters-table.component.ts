import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { NewCharacterFormComponent } from '../new-character-form/new-character-form.component';
import { CharactersStateService } from '../services/characters-state.service';

@Component({
  selector: 'app-characters-table',
  standalone: true,
  imports: [
    CharacterCardComponent,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './characters-table.component.html',
  styleUrl: './characters-table.component.scss',
  providers: [CharactersStateService],
})
export class CharactersTableComponent {
  readonly dialog = inject(MatDialog);
  public charactersState = inject(CharactersStateService);

  public setPage(number: number) {
    this.charactersState.changePage$.next(number);
  }

  openNewCharacterForm(): void {
    const dialogRef = this.dialog.open(NewCharacterFormComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.charactersState.changePage$.next(1);
      }
    });
  }
}
