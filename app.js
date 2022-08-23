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

    return {
        startBtn,
        cells
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

    let hideOptions = () => {
        let container = document.querySelector('.options-container');
        container.classList.add('hide');
    }

    let markBoard = (what, where) => {
        board[where] = what;

        render();

        GameFlow.player1.changeTurn();
        GameFlow.player2.changeTurn();
    }
    


    return {
        render,
        hideOptions,
        board,
        markBoard,
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
                    DomStuff.cells[i].addEventListener('click', () => {GameFlow.playerMarkBoard(i)},{once: true});
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

    return {
        start,
        playerMarkBoard,
        player1,
        player2
        }
})();

DomStuff.startBtn.addEventListener('click', GameFlow.start);

/**now I have to make a function that checks for winner patterns after the third move
 * and I will make an if statement in the game board which will call the end function
 * if the array contains the winner array
 */