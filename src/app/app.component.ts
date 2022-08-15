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
  useMajor: boolean = true;
  minorMajor = this.calculateMajorKey;
  sharps: string[] = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
  flats: string[] = ['A','B♭','B','C','D♭','D','E♭','E','F','G♭','G','A♭'];
  notes: string[] = [];
  chords: string[] = [];

  progression = '';
  created = ''; 
    
  ngOnInit(): void {
    this.setUseSharps();
  }

  setUseSharps(): void {
    this.useSharps = !this.useSharps;
    this.notes = this.useSharps ? this.sharps : this.flats;
    this.update(this.selected);
  }

  setUseMajor(): void {
    this.useMajor = !this.useMajor;
    this.minorMajor = this.useMajor ? this.calculateMajorKey : this.calculateMinorKey;
    this.update(this.selected);
  }

  setValue(value: string): void {
    this.selected = this.notes.indexOf(value);
    this.update(this.selected);
  }

  update(value: number): void {
    this.minorMajor(this.selected);
    this.progressionOnChange();
  }
  
  calculateMajorKey(selected: number): void {
    this.chords = [];
    this.chords[0] = this.notes[selected];
    this.chords[1] = this.notes[(selected + 2) % 12] + 'm';
    this.chords[2] = this.notes[(selected + 4) % 12]  + 'm';
    this.chords[3] = this.notes[(selected + 5) % 12];
    this.chords[4] = this.notes[(selected + 7) % 12];
    this.chords[5] = this.notes[(selected + 9) % 12] + 'm';
    this.chords[6] = this.notes[(selected + 11) % 12] + '°';
  }

  calculateMinorKey(selected: number): void {
    this.chords = [];
    this.chords[0] = this.notes[selected] + 'm';
    this.chords[1] = this.notes[(selected + 2) % 12] + '°';
    this.chords[2] = this.notes[(selected + 3) % 12];
    this.chords[3] = this.notes[(selected + 5) % 12]  + 'm';
    this.chords[4] = this.notes[(selected + 7) % 12]  + 'm';
    this.chords[5] = this.notes[(selected + 8) % 12];
    this.chords[6] = this.notes[(selected + 10) % 12];
  }

  progressionOnChange(): void {
    this.created = '';

    let splitted = this.progression.split(' ');
    splitted.forEach(c => {
      if (c !== '') {
        this.created += this.findChord(c) + ' ';
      }
    });
  }

  findChord(chord: string): string {
    switch(chord.toLowerCase()) {
      case 'i': return this.chords[0];
      case 'ii': return this.chords[1];
      case 'iii': return this.chords[2];
      case 'iv': return this.chords[3];
      case 'v': return this.chords[4];
      case 'vi': return this.chords[5];
      case 'vii': return this.chords[6];
      case '/': return '<br>';
      case '//': return '<br><br>';
    }

    return '';
  }

  addChord(chord: string) {
    this.progression += chord + ' ';
    this.progressionOnChange();
  }
}
