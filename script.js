const Board = (function() {

  let board = [
    ['T', 'I', 'C'],
    ['T', 'A', 'C'],
    ['T', 'O', 'E'],
  ];

  const create = () => {
    const container = document.getElementById('container');

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let square = document.createElement('div');
        square.classList.add('square');

        container.appendChild(square);

        square.addEventListener('click', () => {
          square.textContent = Game.getCurrentIcon();

          Board.add(i, j, Game.getCurrentIcon());
          Board.display;

          Game.swapCurrentIcon();

          checkTie();

          if (checkWin() === 'X') console.log("WIN X");
          if (checkWin() === 'Y') console.log("WIN Y");
        });
      }
    }
  }

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

  return { display, clear, add, checkWin, checkTie, create, };
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

  let currentIcon;

  const start = () => {
    Board.clear();

    Board.create();

    if (Math.floor(Math.random() * 2) == 0) {
      player1 = createPlayer(O);
      player2 = createPlayer(X);
      currentIcon = O;
    }
    else {
      player1 = createPlayer(X);
      player2 = createPlayer(O);
      currentIcon = X;
    }

    Board.display();

    if (player1.getIcon() === Board.checkWin()) console.log("Player 1 wins!");
    else if (player2.getIcon() === Board.checkWin()) console.log("Player 2 wins!");
    else console.log("Tie!");
  }

  const getCurrentIcon = () => {
    return currentIcon;
  }

  const swapCurrentIcon = () => {
    if (currentIcon === X) currentIcon = O;
    else currentIcon = X;
  }

  return { start, getCurrentIcon, swapCurrentIcon };

})();

Board.display();

Game.start();
