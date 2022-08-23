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
    let winMsg = document.querySelector('.win-msg');
    let retry = document.querySelector('.retry');

    return {
        startBtn,
        cells,
        winScreen,
        winMsg,
        retry,
    }
})();

const GameBoard = (() => {
    /**parts of the board and the player's markings will be 
     * saved here and some oder functions that modify the 
     * table
     */

    let board = ['', '', '', '', '', '', '', '', '',]

    let render = () => {
        for (let i = 0; i < board.length; i++) {
            if (board[i] !== '') {
                DomStuff.cells[i].textContent = board[i];
            }
        }
    };

    let clearBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
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

        render();

        if (GameFlow.player1.mark === mark) {
            GameFlow.checkWin(GameFlow.player1);
        } else {
            GameFlow.checkWin(GameFlow.player1);
        }

        GameFlow.player1.changeTurn();
        GameFlow.player2.changeTurn();
    }


    return {
        render,
        hideOptions,
        board,
        markBoard,
        hideWin,
        showWin,
        clearBoard,
        }
})();

const GameFlow = (() => {

    /**this is where the logic and the flow of the game
     * will be built
     */

    const player1 = Player('', undefined);
    const player2 = Player('', undefined);

    let eventFuncContainer = () => {playerMarkBoard(i)};

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
                    DomStuff.cells[i].addEventListener('click', () => {playerMarkBoard(i)}, {once: true});
                }
            }
        })
    };

    let playerMarkBoard = (i) => {
        if (player1.getTurn() === true) {
            GameBoard.markBoard(player1.mark, i);
        } else {
            GameBoard.markBoard(player2.mark, i);
        }
    }

    let checkWin = (n) => {

        console.log('Hi, this is a test');

        /**checking rows and columns */
        for (let i = 0; i < 3; i++) {
            console.log(GameBoard.board[i], GameBoard.board[i + 3], GameBoard.board[i + 6] === n.mark);
            if (GameBoard.board[i] === n.mark && GameBoard.board[i + 3] === n.mark && GameBoard.board[i + 6] === n.mark) {
                Win(n)
            } else if (GameBoard.board[i * 3] === n.mark && GameBoard.board[(i * 3) + 1] === n.mark && GameBoard.board[(i * 3) + 2] === n.mark) {
                Win(n)
            }
        };

        /**checking cross */
        if (GameBoard.board[0] === n.mark && GameBoard.board[4] === n.mark && GameBoard.board[8] === n.mark) {
            Win(n);
        } else if (GameBoard.board[6] === n.mark && GameBoard.board[4] === n.mark && GameBoard.board[2] === n.mark) {
            Win(n);
        }
    }

    let Win = (player) => {
        DomStuff.cells.forEach(e => {
            e.textContent = '';
        });

        GameBoard.showWin();

        if (player === player1) {
            player1.addWin();
            DomStuff.winMsg.textContent = `${player1.mark} Won! wins: ${player1.getWins()}`;
        } else {
            player1.addWin();
            DomStuff.winMsg.textContent = `${player2.mark} Won! wins: ${player2.getWins()}`;
        }

        GameBoard.clearBoard();
        DomStuff.retry.addEventListener('click', GameBoard.hideWin);
    }

    return {
        start,
        playerMarkBoard,
        player1,
        player2,
        checkWin,
        }
})();

DomStuff.startBtn.addEventListener('click', GameFlow.start);

/**now I have to make a function that checks for winner patterns after the third move
 * and I will make an if statement in the game board which will call the end function
 * if the array contains the winner array
 */