import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-snake-ladder',
  imports: [CommonModule],
  templateUrl: './snake-ladder.component.html',
  styleUrl: './snake-ladder.component.css'
})
export class SnakeLadderComponent {
  
  count: number = 1;
  board: number[][] = [];
  arr: number[] = [];
  player1 = 0
  player2 = 0;
  randomNumber1: number = 0;
  randomNumber2: number = 0;
  turn: string = "1"
  winnerModalVisible: boolean = false
  rollMessage: string = '';
  isPlayer1Disable = false
  isPlayer2Disable = false
  audio: any = new Audio("../../assets/wind-swoosh-short-289744.mp3");
  ladder: any = new Audio("../../assets/ladder.mp3");
  snake: any = new Audio("../../assets/wrong-47985.mp3");
  toSelect: boolean = true;
  isComputer: boolean = false;

  // to repeat the same sound when sound is running
  playSound = (audio: any) => {
    const clone = audio.cloneNode();
    clone.play();
  };
  playSoundladder = (ladder: any) => {
    const clone = ladder.cloneNode();
    clone.play();
  };
  playSoundsnake = (snake: any) => {
    const clone = snake.cloneNode();
    clone.play();
  };
  constructor() {
    console.log(this.arr);
    for (let i = 0; i < 10; i++) {
      this.arr = [];
      if (i % 2 === 0) {
        // Left to right
        for (let j = 0; j < 10; j++) {
          this.arr.push(this.count++);
        }
      } else {
        // Right to left
        for (let j = 0; j < 10; j++) {
          this.arr.unshift(this.count++);
        }
      }
      this.board.unshift(this.arr);
    }
    console.log(this.board);
    for (let index = 0; index < this.board.length; index++) {
     console.log(this.board[index]);
     
      
    }
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async roll1() {
    this.isPlayer2Disable = true;
    const rolled = Math.floor(Math.random() * 6) + 1;
    this.randomNumber1 = rolled;
    this.rollMessage = `🎲 Player 1 rolled a ${rolled}`;
    if (rolled === 6) {
      this.rollMessage = "🎉 Player 1 rolled a 6! Roll again...";
    } else {
      this.turn = '2';
    }

    for (let i = 0; i < rolled; i++) {
      this.player1 += 1;
      this.playSound(this.audio);
      await this.delay(200)
    }
    if (this.player1 > 100) {
      this.player1 -= rolled;
    }

    // Check for win and snakes/ladders
    if (this.player1 === 100) {
      this.winnerModalVisible = true;
      this.rollMessage = "🏆 Player 1 wins!";
      return;
    }
    this.player1 = this.switch(this.player1);
    this.isPlayer2Disable = false;
     if (rolled === 6) {
      return;
    }
    if (this.isComputer) {

      this.rollComputer();
    }
  }


  async roll2() {
    this.isPlayer1Disable = true;
    const rolled = Math.floor(Math.random() * 6) + 1;
    this.randomNumber2 = rolled;
    this.rollMessage = `🎲 Player 2 rolled a ${rolled}`;
    if (rolled === 6) {
      this.rollMessage = "🎉 Player 2 rolled a 6! Roll again...";
    } else {
      this.turn = '1';
    }
    for (let i = 0; i < rolled; i++) {
      this.player2 += 1;
      this.playSound(this.audio);
      await this.delay(200)
    }
    if (this.player2 > 100) {
      this.player2 -= rolled;
    }
    // Check for win and snakes/ladders
    if (this.player2 === 100) {
      this.winnerModalVisible = true;
      this.rollMessage = "🏆 Player 1 wins!";
      return;
    }

    this.player2 = this.switch(this.player2);
    this.isPlayer1Disable = false;
  }
  async rollComputer() {
   await this.delay(895)
   this.isPlayer1Disable = true;
   const rolled = Math.floor(Math.random() * 6) + 1;
   this.randomNumber2 = rolled;
   this.rollMessage = `🎲 Computer rolled a ${rolled}`;
   if (rolled === 6) {
     this.rollMessage = "🎉 Computer rolled a 6! Roll again...";
     await this.delay(895)
      this.rollComputer();
    } else {
      this.turn = '1';
    }
    for (let i = 0; i < rolled; i++) {
      this.player2 += 1;
      this.playSound(this.audio);
      await this.delay(200)
    }
    if (this.player2 > 100) {
      this.player2 -= rolled;
    }
    // Check for win and snakes/ladders
    if (this.player2 === 100) {
      this.winnerModalVisible = true;
      this.rollMessage = "🏆 Computer 1 wins!";
      return;
    }
    this.player2 = this.switch(this.player2);
    this.isPlayer1Disable = false;
  }
  close() {
    this.winnerModalVisible = false
    this.player1 = 0
    this.player2 = 0
    this.randomNumber1 = 0;
    this.randomNumber2 = 0;
    this.rollMessage = ""
  }

  computer() {
    this.toSelect = false
    this.isComputer = true
  }
  twoPlayer() {
    this.toSelect = false
  }

  switch(player: number): number {
  switch (player) {
    // ladders
    case 1: this.playSoundladder(this.ladder); return 38;
    case 4: this.playSoundladder(this.ladder); return 14;
    case 9: this.playSoundladder(this.ladder); return 31;
    case 21: this.playSoundladder(this.ladder); return 42;
    case 28: this.playSoundladder(this.ladder); return 84;
    case 36: this.playSoundladder(this.ladder); return 44;
    case 51: this.playSoundladder(this.ladder); return 67;
    case 71: this.playSoundladder(this.ladder); return 91;
    // snakes
    case 16: this.playSoundsnake(this.snake); return 6;
    case 47: this.playSoundsnake(this.snake); return 26;
    case 49: this.playSoundsnake(this.snake); return 11;
    case 56: this.playSoundsnake(this.snake); return 53;
    case 62: this.playSoundsnake(this.snake); return 19;
    case 64: this.playSoundsnake(this.snake); return 60;
    case 87: this.playSoundsnake(this.snake); return 24;
    case 93: this.playSoundsnake(this.snake); return 73;
    case 95: this.playSoundsnake(this.snake); return 75;
    case 98: this.playSoundsnake(this.snake); return 78;
    default: return player;
  }
}


}
