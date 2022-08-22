const Player = (mark, turn) => {
    let turn = turn;

    let wins = 0;

    let addWin = (x) => {
        wins++;
    };

    let getWins = () => {return wins};
    
    let changeTurn = () => {
        if (turn === true) {
            turn = false;
        } else {
            turn = true;
        }
    }

    return {mark, addWin, getWins, changeTurn};
};

const DomStuff = (() => {
    let startBtn = document.querySelector('button');
    let cells = document.querySelector('.cell');

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

    let board = new Array(9)

    let render = () => {
        //rendering board
    };

    let hideOptions = () => {
        let container = document.querySelector('.options-container');
        container.classList.add('hide');
    }

    let markBoard = (what, where) => {
        board[where] = what;

        render();
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

    let player1;
    let player2;

    let start = () => {
        let radioBtns = document.getElementsByName('mark');

        radioBtns.forEach(e => {
            if (e.checked) {

                player1 = Player(e.value)

                GameBoard.hideOptions();

                if (radioBtns.value === 'x') {
                    player2 = Player('o', false);
                    player1.turn = true;
                } else {
                    player2 = Player('o', true);
                    player1.turn = false;
                }
            }
        })
    };

    let markBoard = (i) => {
        if (player1.turn === true) {
            GameBoard.markBoard(player1.mark, i)
        } else {
            GameBoard.markBoard(player2.mark, i)
        }
    }

    return {
        start,
        player1,
        player2
        }
})();

DomStuff.startBtn.addEventListener('click', GameFlow.start)

/**now for the markings and saving the marks to the array with a for loop */