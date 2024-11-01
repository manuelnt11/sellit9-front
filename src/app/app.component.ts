import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharactersTableComponent } from "./characters-table/characters-table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CharactersTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sellit9-front';
}
