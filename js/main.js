// Esercizio di oggi: Campo Minato
// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio 
// ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, 
// per evitare problemi con l’inizializzazione di git).
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. 
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati
// - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. 
// Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti 
// (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

const playBtn = document.getElementById('btn');

playBtn.addEventListener('click', startGame);

function startGame() {

    let difficulty = document.getElementById('difficulty').value;

    let maxCell;

    let cellRow;

    if (difficulty == 1) {
        maxCell = 100;
    } else if (difficulty == 2) {
        maxCell = 81;
    } else if (difficulty == 3) {
        maxCell = 49;
    }

    cellRow = Math.sqrt(maxCell);

    playground();

    function playground() {

        const gridDom = document.getElementById('containerGrid');

        gridDom.innerHTML = '';

        for (let i = 1; i <= maxCell; i++) {

            let currentElement = getSquare(i, cellRow);
    
            currentElement.addEventListener('click',
                function () {
                    this.classList.toggle('clicked');
                    console.log(i);
                }
            )
    
            gridDom.append(currentElement);
    
        }
    }

    function getSquare(number, cellRow) {

        const currentElement = document.createElement('div');
        currentElement.style.height = `calc(100% / ${cellRow})`;
        currentElement.style.width = `calc(100% / ${cellRow})`;
        currentElement.append(number);
        currentElement.classList.add('square');

        return currentElement;

    }

}