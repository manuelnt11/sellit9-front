export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: Date;
  owner: string;
}

export interface CharacterLocation {
  name: string;
  url: string;
}

export type CharacterStatus = 'alive' | 'dead' | 'unknown';
export const CharacterStatusValues: CharacterStatus[] = [
  'alive',
  'dead',
  'unknown',
];

export type CharacterGender = 'female' | 'male' | 'genderless' | 'unknown';
export const CharacterGenderValues: CharacterGender[] = [
  'female',
  'male',
  'genderless',
  'unknown',
];

export interface Page {
  info: PageInfo;
  results: Character[];
}

export interface PageInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface PageFilter {
  page?: number;
  name?: string;
  status?: CharacterStatus;
  species?: string;
  type?: string;
  gender?: CharacterGender;
}
