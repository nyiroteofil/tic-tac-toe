const Player = (mark, playerTurn) => {
    let turn = playerTurn;

    let wins = 0;

    let addWin = (x) => {
        wins++;
    };

    let getWins = () => {return wins};

    let getTurn = () => {return turn};
    
    let changeTurn = () => {
        if (turn === true) {
            turn = false;
        } else {
            turn = true;
        };
    }

    let changeTurnTo = (x) => {
        turn = x;
    }

    return {mark, addWin, getWins, changeTurn, changeTurnTo, getTurn};
};

const DomStuff = (() => {
    let startBtn = document.querySelector('button');
    let cells = document.querySelectorAll('.cell');
    let winScreen = document.querySelector('.win-screen');
    let winMsg = document.querySelector('.win-mark');
    let retry = document.querySelector('.retry');
    let cellParent = document.querySelector('.cell-container');
    let winCounter1 = document.querySelector('.win-counter-p1');
    let winCounter2 = document.querySelector('.win-counter-p2');
    let nameExtention = document.querySelector('.name-extention');
    let score1 = document.querySelector('.score-txt-1');
    let score2 = document.querySelector('.score-txt-2');

    return {
        startBtn,
        cells,
        winScreen,
        winMsg,
        retry,
        cellParent,
        winCounter1,
        winCounter2,
        nameExtention,
        score1,
        score2,
    }
})();

const GameBoard = (() => {
    /**parts of the board and the player's markings will be 
     * saved here and some oder functions that modify the 
     * table
     */

    let board = ['', '', '', '', '', '', '', '', '',]
    let playerSteps = 0;

    let restartStepCounter = () => {playerSteps = 0};

    let getSteps = () => {return playerSteps};

    let render = () => {
        for (let i = 0; i < board.length; i++) {
            if (board[i] !== '') {
                DomStuff.cells[i].textContent = board[i];
            } else {
                DomStuff.cells[i].textContent = '';
            }
        }
    };

    let clearBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }

        render();
    }

    let hideOptions = () => {
        let container = document.querySelector('.options-container');
        container.classList.add('hide');
    }

    let showWin = () => {
        DomStuff.winScreen.classList.remove('hide');
    };

    let hideWin = () => {
        DomStuff.winScreen.classList.add('hide');
    }; 

    let markBoard = (mark, index) => {
        board[index] = mark;

        playerSteps++;

        render();

        GameFlow.checkWin(GameFlow.player2);
        GameFlow.checkWin(GameFlow.player1);
          
        GameFlow.player1.changeTurn();
        GameFlow.player2.changeTurn();
    }

    let updateScoreDisplay = () => {
        if (GameFlow.player1.mark === 'x') {
            DomStuff.score1.textContent = GameFlow.player1.getWins();
            DomStuff.score2.textContent = GameFlow.player2.getWins();
        } else {
            DomStuff.score1.textContent = GameFlow.player2.getWins();
            DomStuff.score2.textContent = GameFlow.player1.getWins();
        }
    }

    return {
        render,
        hideOptions,
        board,
        markBoard,
        hideWin,
        showWin,
        clearBoard,
        getSteps,
        restartStepCounter,
        updateScoreDisplay,
        }
})();

const GameFlow = (() => {

    /**this is where the logic and the flow of the game
     * will be built
     */

    const player1 = Player('', undefined);
    const player2 = Player('', undefined);

    let start = () => {
        let radioBtns = document.getElementsByName('mark');

        radioBtns.forEach((e) => {
            if (e.checked) {

                if (e.value === 'x') {
                    player1.mark = 'x'; player1.changeTurnTo(true);
                    player2.mark = 'o'; player2.changeTurnTo(false);
                } else if (e.value === 'o') {
                    player1.mark = 'o'; player1.changeTurnTo(false);
                    player2.mark = 'x'; player2.changeTurnTo(true);
                }

                GameBoard.hideOptions();

                for (let i = 0; i < DomStuff.cells.length; i++) {
                    DomStuff.cells[i].addEventListener('click', () => {GameFlow.playerMarkBoard(i)});
                }
            }
        })
    };

    let playerMarkBoard = (i) => {
        if (DomStuff.cells[i].textContent === '') {
            if (player1.getTurn() === true) {
                GameBoard.markBoard(player1.mark, i);
            } else {
                GameBoard.markBoard(player2.mark, i);
            }
        } else {
            console.log('This slot is not avalible!')
        }
    }

    let checkWin = (n) => {
        /**checking rows and columns */
        for (let i = 0; i < 3; i++) {
            if (GameBoard.board[i] === n.mark && GameBoard.board[i + 3] === n.mark && GameBoard.board[i + 6] === n.mark) {
                Win(n);
            } else if (GameBoard.board[i * 3] === n.mark && GameBoard.board[(i * 3) + 1] === n.mark && GameBoard.board[(i * 3) + 2] === n.mark) {
                Win(n);
            } else  if (GameBoard.board[0] === n.mark && GameBoard.board[4] === n.mark && GameBoard.board[8] === n.mark) {
                Win(n);
            } else if (GameBoard.board[6] === n.mark && GameBoard.board[4] === n.mark && GameBoard.board[2] === n.mark) {
                Win(n);
            }  else if (i === 2 && GameBoard.getSteps() === 9) {
                draw();
            }
        };
    }

    let draw = () => {
        GameBoard.restartStepCounter()

        GameBoard.showWin();

        DomStuff.winMsg.textContent = 'It\'s a draw'
        DomStuff.nameExtention.textContent = '';
        DomStuff.winCounter1.textContent = '';
        DomStuff.winCounter2.textContent = '';

        GameBoard.clearBoard();

        DomStuff.retry.addEventListener('click', GameBoard.hideWin);
    }

    let Win = (player) => {
        GameBoard.restartStepCounter();

        GameBoard.showWin();

        if (player === player1) {
            player1.addWin();
            DomStuff.winMsg.textContent = `${player1.mark.toUpperCase()}`;
            DomStuff.winCounter1.textContent = `${player1.mark.toUpperCase()}: ${player1.getWins()} wins`;
            DomStuff.winCounter2.textContent = `${player2.mark.toUpperCase()}: ${player2.getWins()} wins`;
        } else {
            player2.addWin();
            DomStuff.winMsg.textContent = `${player2.mark.toUpperCase()}`;
            DomStuff.winCounter1.textContent = `${player2.mark.toUpperCase()}: ${player2.getWins()} wins`;
            DomStuff.winCounter2.textContent = `${player1.mark.toUpperCase()}: ${player1.getWins()} wins`;
        }

        DomStuff.nameExtention.textContent = 'wins!';

        GameBoard.clearBoard();

        GameBoard.updateScoreDisplay();

        /**First I remove the last eventlistener if there was a previous then add the new elvent listener to it */
        DomStuff.retry.removeEventListener('click', GameBoard.hideWin);
        DomStuff.retry.addEventListener('click', GameBoard.hideWin);
    }

    return {
        start,
        playerMarkBoard,
        player1,
        player2,
        checkWin,
        draw,
        }
})();

DomStuff.startBtn.addEventListener('click', GameFlow.start);

/**the game is now fully functional but only as a PvP but later
 * on I plan to implement an AI enemy
 */