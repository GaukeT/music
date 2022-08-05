import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Music';
  selected: string = 'C';

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
    this.setValue(this.selected);
  }

  setValue(value: string): void {
    this.selected = value;
    this.calculateKey(value);
  }
  
  calculateKey(value: string): void {
    this.chords = [];
    let index = this.notes.indexOf(value);
    this.chords[0] = this.notes[index];
    this.chords[1] = this.notes[(index + 2) % 12] + 'm';
    this.chords[2] = this.notes[(index + 4) % 12]  + 'm';
    this.chords[3] = this.notes[(index + 5) % 12];
    this.chords[4] = this.notes[(index + 7) % 12];
    this.chords[5] = this.notes[(index + 9) % 12] + 'm';
    this.chords[6] = this.notes[(index + 11) % 12] + '°';
  }
}

