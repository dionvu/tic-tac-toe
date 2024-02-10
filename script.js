const Board = (function() {

  let board = [
    ['T', 'I', 'C'],
    ['T', 'A', 'C'],
    ['T', 'O', 'E'],
  ];

  const clear = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        board[row][col] = ' ';
      }
    }
  };

  const display = () => {
    for (let row = 0; row < 3; row++) {
      let curRow = '';
      for (let col = 0; col < 3; col++) {
        curRow += board[row][col] + ' ';
      }
      console.log(curRow);
    }
  };

  const checkTie = () => {
    return board.every(row => row.every(cell => cell !== ' '));
  };

  const checkWin = () => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== "" && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
    }
    for (let j = 0; j < 3; j++) {
      if (board[0][j] !== "" && board[0][j] === board[1][j] && board[1][j] === board[2][j]) return board[0][j];
    }
    if (board[0][0] !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
    if (board[0][2] !== "" && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];

    return false;
  };

  const add = (x, y, value) => { board[x][y] = value; };

  return { display, clear, add, checkWin, checkTie };
})();

function createPlayer(icon) {
  const getIcon = () => icon;

  return { getIcon };
}

const Game = (function() {
  const X = 'X';
  const O = 'O';

  let player1;
  let player2;

  const start = () => {
    Board.clear();

    if (Math.floor(Math.random() * 2) == 0) {
      player1 = createPlayer(O);
      player2 = createPlayer(X);
    }
    else {
      player1 = createPlayer(X);
      player2 = createPlayer(O);
    }

    do {
      if (player1.getIcon() === X) {
        Board.add(prompt("Player 1 enter x coord"), prompt("Player 1 enter y coord"), player1.getIcon());

        if (Board.checkWin() === player1.getIcon()) break;

        Board.display();
        Board.add(prompt("Player 2 enter x coord"), prompt("Player 2 enter y coord"), player2.getIcon());

        if (Board.checkTie()) break;
      }

      else {
        Board.add(prompt("Player 2 enter x coord"), prompt("Player 2 enter y coord"), player2.getIcon());

        if (Board.checkWin() === player2.getIcon()) break;

        Board.display();
        Board.add(prompt("Player 1 enter x coord"), prompt("Player 1 enter y coord"), player1.getIcon());

        if (Board.checkTie()) break;
      }

      Board.display();
    } while (Board.checkWin() != O && Board.checkWin() != X);

    Board.display();

    if (player1.getIcon() === Board.checkWin()) console.log("Player 1 wins!");
    else if (player2.getIcon() === Board.checkWin()) console.log("Player 2 wins!");
    else console.log("Tie!");

  }

  return { start };

})();

Board.display();

Game.start();
