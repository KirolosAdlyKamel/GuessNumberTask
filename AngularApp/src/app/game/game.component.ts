import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../services/game';

@Component({
  selector: 'app-game',
  imports: [FormsModule],
  templateUrl: './game.component.html',
  // styleUrl: './game.scss',
})
export class GameComponent implements OnInit {
  target = 0;
  userGuess: number | null = null;
  attempts = 0;
  bestScore: number | null = null;
  message = '';

  constructor(private game: GameService) {}

  reset() {
    this.target = Math.floor(Math.random() * 43) + 1;
    this.userGuess = null;
    this.attempts = 0;
    this.message = '';
  }

  ngOnInit() {
    this.target = Math.floor(Math.random() * 43) + 1;
    this.game.getBestScore().subscribe({
      next: score => this.bestScore = score,
      error: () => this.bestScore = null
    });
  }

   makeGuess() {
    if (!this.userGuess) return;
    this.attempts++;
    if (this.userGuess > this.target) this.message = 'Guess Lower!';
    else if (this.userGuess < this.target) this.message = 'Guess Higher!';
    else {
      this.message = `Correct! You guessed in ${this.attempts} attempts.`;
      if (this.bestScore === null || this.attempts < this.bestScore) {
        this.game.saveBestScore(this.attempts).subscribe({
          next: score => this.bestScore = this.attempts
        });
      }
    }
  }
}
