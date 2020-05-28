const gameStatusDisplay = document.querySelector('.currentStatus');
var currentTurnValue="X";
var isGameActive=true;
const drawMessage = () => `Game ended in a draw!`;
var isWon=false;
const currentPlayerTurn = () => `${currentTurnValue}'s turn`;
gameStatusDisplay.innerHTML = currentPlayerTurn();
var currentStatusOfGame=["","","","","","","","","",];

document.querySelectorAll('.grid-item').forEach(cell => cell.addEventListener('click', MakeaTurn));

function Choose(curretTurnSelector)
{
    currentTurnValue = curretTurnSelector.getAttribute("value");
    var el = document.getElementsByClassName("turn");
    var i;
    for (i = 0; i < el.length; i++) {
        el[i].className = "turn";
    }
    curretTurnSelector.className = "turn active";
    gameStatusDisplay.innerHTML = currentPlayerTurn();
}

function MakeaTurn(clickedCellEvent){
    RemoveClickEvent("turn");
const clickedCell = clickedCellEvent.target;
let clickedCellIndex = parseInt(
    clickedCell.getAttribute('Data-Value')
  );

  if(currentStatusOfGame =="" && !isGameActive){
      return
  }

  currentStatusOfGame[clickedCellIndex-1] = currentTurnValue;
  clickedCell.innerHTML = currentTurnValue;

  updateGameStateWithCurrentPlayerValue(clickedCellIndex);
  
}

function RemoveClickEvent(className)
{
    var el = document.getElementsByClassName(className);
    var i;
    for (i = 0; i < el.length; i++) {
        el[i].removeAttribute("onclick");
    }
}



function updateGameStateWithCurrentPlayerValue(clickedCellIndex){
    currentStatusOfGame[clickedCellIndex-1]=currentTurnValue;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i=0;i<=7;i++){
        const winCondition = winningConditions[i];
        let a = currentStatusOfGame[winCondition[0]];
        let b = currentStatusOfGame[winCondition[1]];
        let c = currentStatusOfGame[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            isWon = true;
            break
        }
    }

    if (isWon) {
        RemoveClickEvent("grid-item");
        gameStatusDisplay.innerHTML = StatusMessage();
        isGameActive = false;
        return;
    }

    let roundDraw = !currentStatusOfGame.includes("");
    if (roundDraw) {
        RemoveClickEvent("grid-item");
        gameStatusDisplay.innerHTML = drawMessage();
        isGameActive = false;
        return;
    }
    // change turn of player
    currentTurnValue = currentTurnValue=="X" ? "0":"X";
    gameStatusDisplay.innerHTML = currentPlayerTurn();
}

function StatusMessage(){
    return `${currentTurnValue} is the winner`;
}
