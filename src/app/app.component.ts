import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Music';
  selected: number = 3;

  useSharps: boolean = false;
  sharps: string[] = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
  flats: string[] = ['A','B♭','B','C','D♭','D','E♭','E','F','G♭','G','A♭'];
  notes: string[] = [];
  chords: string[] = [];
  
  ngOnInit(): void {
    this.setUseSharps();
    this.calculateKey(this.selected);
  }

  setUseSharps(): void {
    this.useSharps = !this.useSharps;
    this.notes = this.useSharps ? this.sharps : this.flats;
    this.calculateKey(this.selected);
  }

  setValue(value: string): void {
    this.selected = this.notes.indexOf(value);
    this.calculateKey(this.selected);
  }
  
  calculateKey(selected: number): void {
    this.chords = [];
    this.chords[0] = this.notes[selected];
    this.chords[1] = this.notes[(selected + 2) % 12] + 'm';
    this.chords[2] = this.notes[(selected + 4) % 12]  + 'm';
    this.chords[3] = this.notes[(selected + 5) % 12];
    this.chords[4] = this.notes[(selected + 7) % 12];
    this.chords[5] = this.notes[(selected + 9) % 12] + 'm';
    this.chords[6] = this.notes[(selected + 11) % 12] + '°';
  }
}

