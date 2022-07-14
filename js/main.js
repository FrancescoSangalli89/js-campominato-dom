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

let usedNumber = [];

let randomBomb;

function startGame() {

    let lost = false;

    let score = document.getElementById('score');

    score.innerHTML = '';

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

    if (usedNumber < 16) {

        for (let bomb = 0; bomb < 16; bomb++) {
            randomBomb = getUniqueBombCell(usedNumber, 1, maxCell);
        
            usedNumber.push(randomBomb);

        }

    } else {

        usedNumber = [];
        for (let bomb = 0; bomb < 16; bomb++) {
            randomBomb = getUniqueBombCell(usedNumber, 1, maxCell);
        
            usedNumber.push(randomBomb);
        }

    }

    cellRow = Math.sqrt(maxCell);

    playground();

    function playground() {

        const gridDom = document.getElementById('containerGrid');

        gridDom.innerHTML = '';

        let selected = 0;

        for (let i = 1; i <= maxCell; i++) {

            let currentElement = getSquare(i, cellRow, usedNumber);
    
            currentElement.addEventListener('click',
                function () {

                    if (lost == false) {

                        if (!this.classList.contains('clicked') && !this.classList.contains('bomb')) {
                            selected ++;
                        }
    
                        this.classList.add('clicked');

                        if (this.classList.contains('bomb')) {
                            lost = true;
                            score.innerHTML = `Hai perso! Il tuo punteggio è: ${selected}`;
                        } else {
                            score.innerHTML = `Il tuo punteggio è: ${selected}`;
                        }

                        if (selected == (maxCell - 16)) {
                            console.log(selected);
                            console.log(maxCell);
                            score.innerHTML = `YOU WIN!!!`;
                            lost = true;
                        }

                        
                    } 
                    
                }
            )
    
            gridDom.append(currentElement);
    
        }
    }

    function getRandomBomb(min, max) {
        return Math.floor(Math.random() * ( max - min + 1)) + min;
    }
    
    function getUniqueBombCell(usedNumber, min, max) {
    
        let validNumber = false;
    
        let createdRandomNumber;
    
        while( validNumber == false ) {
            createdRandomNumber = getRandomBomb( min, max);
    
            if (usedNumber.includes(createdRandomNumber) == false) {
                validNumber = true;
            }
        }

        return createdRandomNumber;
    
    }

    function getSquare(number, cellRow, array) {
        
        const currentElement = document.createElement('div');
        currentElement.style.height = `calc(100% / ${cellRow})`;
        currentElement.style.width = `calc(100% / ${cellRow})`;
        currentElement.append(number);
        currentElement.classList.add('square');
        currentElement.classList.add('ok');

        for (let x = 0; x < array.length; x++) {

            if (number == array[x]) {
                currentElement.classList.add('bomb');
                currentElement.classList.remove('ok');

            }
            
        }
        

        return currentElement;

    }

}