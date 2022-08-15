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
  selectedKey: string = 'major';
  sharps: string[] = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
  flats: string[] = ['A','B♭','B','C','D♭','D','E♭','E','F','G♭','G','A♭'];
  notes: string[] = [];
  chords: string[] = [];

  majorPattern: string[] = ['I','ii','iii','IV','V','vi','vii'];
  minorPattern: string[] = ['i','ii','III','iv','v','VI','VII'];
  selectedPattern: string[] = [];

  progression = '';
  created = ''; 
    
  ngOnInit(): void {
    this.setUseSharps();
  }

  // user uses flat / sharp toggle
  setUseSharps(): void {
    this.useSharps = !this.useSharps;
    this.notes = this.useSharps ? this.sharps : this.flats;
    this.update();
  }

  // user uses minor / major toggle
  setUseMajor(): void {
    this.useMajor = !this.useMajor;
    this.minorMajor = this.useMajor ? this.calculateMajorKey : this.calculateMinorKey;
    this.update();
  }

  // user makes choice
  setValue(value: string): void {
    this.selected = this.notes.indexOf(value);
    this.update();
  }

  // updates data on switch
  update(): void {
    this.minorMajor(this.selected);
    this.progressionOnChange();
    
    this.selectedKey = this.useMajor ? 'major' : 'natural minor';
    this.selectedPattern = this.useMajor ? this.majorPattern : this.minorPattern;
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

  // user types roman numerals 1-7 
  progressionOnChange(): void {
    this.created = '';

    let splitted = this.progression.trim().split(' ');
    splitted.forEach(c => {
      this.created += this.findChord(c) + ' ';
    });
  }

  // converts roman numeral to chord
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

  // user clicks on chords in key
  addChord(chord: string): void {
    if (chord.match("(^[a-gA-G][#♭m°]{0,2}$)")) {
      let index = this.chords.indexOf(chord);
      if (index >= 0) {
        chord = this.selectedPattern[index];
      }
    }

    this.progression += chord + ' ';
    this.progressionOnChange();
  }
}
