import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css'
})
export class TicTacToeComponent {
  currentPlayer = "X";
  boardState = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  message: string = "Player X's turn";
  winningCell: any;
  isTie = false;
  toSelect: boolean = true;
  isComputer: boolean = false;
  previousBoardState: any[] = [];
  isDisabled = false
  finalwinningCell: any;
  numberOfXWins : number = 0
  numberOfOWins : number = 0
  numberOfTies : number = 0
  numberOfRounds : number = 0
  makeMove(index: number) {
    if(this.isDisabled){
      return;
    }

    if (!this.gameOver && this.boardState[index] === "") {
      this.boardState[index] = this.currentPlayer;
      if(this.isComputer){
        this.isDisabled = true;
      }
      this.previousBoardState = this.boardState
      if (this.checkWinner()) {
        this.message = `Player ${this.currentPlayer} wins!`;
        
        this.winningCell = this.finalwinningCell
        this.gameOver = true;
        this.numberOfRounds += 1;
        this.currentPlayer=="X"?this.numberOfXWins++:this.numberOfOWins++;
        return;
      }
      if (!this.boardState.includes("")) {
        this.message = "It's a tie!";
        this.gameOver = true;
        this.isTie = true;
        this.numberOfRounds += 1;
        this.numberOfTies++;
        return;
      }
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      this.message = `Player ${this.currentPlayer} Turn!`;
      if (this.currentPlayer == "O" && this.isComputer) {

        // logic for computer move to win
        for (let index = 0; index < this.boardState.length; index++) {
          if (this.boardState[index] == "") {
            this.boardState[index] = "O";
            if (this.checkWinner()) {
              this.boardState[index] = "";
              this.makeMoveComputer(index);
              this.boardState = this.previousBoardState
              return;
            } else {
              this.boardState[index] = "";
            }
          }
        }

        //logic for computer move to prevent x to win
        for (let index = 0; index < this.boardState.length; index++) {
          if (this.boardState[index] == "") {
            this.boardState[index] = "X";
            if (this.checkWinner()) {
              this.boardState[index] = "";
              this.makeMoveComputer(index);
              this.boardState = this.previousBoardState
              return;
            } else {
              this.boardState[index] = "";
            }
          }
        }

        // logic for computer move without any win condition 
        while(true){
          let randomIndex = Math.floor(Math.random() * this.boardState.length);
          console.log(randomIndex);          
          if (this.boardState[randomIndex] == "") {
            this.makeMoveComputer(randomIndex);
            return; 
          }
        } 
 



      }
    }
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async makeMoveComputer(index: number) {
    await this.delay(500); 
    if (this.boardState[index] === "") { 
      this.boardState[index] = this.currentPlayer;

      if (this.checkWinner()) {
        this.message = `Computer wins!`;
        this.winningCell = this.finalwinningCell
        this.gameOver = true;
        this.numberOfRounds += 1;
           this.currentPlayer=="X"?this.numberOfXWins++:this.numberOfOWins++;
        return;
      }
      if (!this.boardState.includes("")) {
        this.message = "It's a tie!";
        this.gameOver = true;
        this.isTie = true;
        this.numberOfTies++
        this.numberOfRounds += 1;
        return;
      }
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      this.message = `Player ${this.currentPlayer} Turn!`;
    }
    this.isDisabled = false
  }

  checkWinner() {
    const winningCombinations = [
      [0, 1, 2],  // top row
      [3, 4, 5],  // middle row
      [6, 7, 8],  // bottom row
      [0, 3, 6],  // left column
      [1, 4, 7],  // middle column
      [2, 5, 8],  // right column
      [0, 4, 8],  // diagonal TL to BR
      [2, 4, 6],  // diagonal TR to BL
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];

      if (
        this.boardState[a] === this.boardState[b] &&
        this.boardState[b] === this.boardState[c] &&
        this.boardState[a] !== ""
      ) {
        
        if(!this.isComputer){
          this.gameOver = true;
          this.winningCell = [a, b, c];
        }
        this.finalwinningCell = [a,b,c]
        return true; // early exit on win
      }
    }

    return false; // no winner found
  }
  
 



  PlayAgain() {
    this.currentPlayer = "X";
    this.boardState = ["", "", "", "", "", "", "", "", ""];
    this.gameOver = false;
    this.winningCell = [];
    this.isTie = false;
    this.isDisabled  = false
    this.message = "Player X's turn";
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.textContent = "";
    });
  }
  resetGame(){
    this.PlayAgain();
    this.toSelect = true;
    this.numberOfOWins = 0;
    this.numberOfXWins = 0;
    this.numberOfTies =0 ;
    this.numberOfRounds = 0;
  }
  computer() {
    this.toSelect = false
    this.isComputer = true
  }
  twoPlayer() {
    this.toSelect = false
  }

}
