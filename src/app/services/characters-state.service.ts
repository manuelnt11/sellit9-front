import { inject, Injectable } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import { Character } from './character.interface';
import { CharactersService } from './characters.service';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';

interface State {
  characters: Character[];
  status: 'idle' | 'loading' | 'error';
  page: number;
  maxPage: number;
}

@Injectable()
export class CharactersStateService {
  private charactersService = inject(CharactersService);

  private initialState: State = {
    characters: [],
    status: 'loading',
    page: 1,
    maxPage: 1,
  };

  changePage$ = new Subject<number>();

  loadProducts$ = this.changePage$.pipe(
    startWith(1),
    switchMap((page) => this.charactersService.getCharacters({ page })),
    map((page) => ({ characters: page.results, status: 'idle' as const, maxPage: page.info.pages })),
    catchError(() => {
      return of({
        products: [],
        status: 'error' as const,
      });
    }),
  );

  public state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.changePage$.pipe(
        map((page) => ({ page, status: 'loading' as const })),
      ),
      this.loadProducts$,
    ],
  });
}
