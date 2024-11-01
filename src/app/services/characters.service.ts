import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character, Page, PageFilter } from './character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private readonly baseUrl = 'https://sellit9-back-630667738639.us-east1.run.app/api';
  private http = inject(HttpClient);

  getCharacters(params?: PageFilter): Observable<Page> {
    return this.http.get<Page>(`${this.baseUrl}/characters`, { params: {...params} });
  }

  addCharacter(character: Partial<Character>): Observable<Character> {
    return this.http.post<Character>(`${this.baseUrl}/characters`, character);
  }

  deleteCharacter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/characters/${id}`);
  }

  updateCharacter(character: Partial<Character>): Observable<Character> {
    return this.http.patch<Character>(`${this.baseUrl}/characters`, character);
  }
}
