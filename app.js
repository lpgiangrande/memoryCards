// Jeu du Memory
// Si 2 cartes sont identiques, elles se figent.
// Sinon, ellse se retournent, le jeu continue jusqu'à ce que toutes les paires soient trouvées.


const cards = document.querySelectorAll('.carte');

let hasFlippedCard = false;
let firstCard, secondCard; // Undefined
let lock = false; // Verouiller les cartes quand 2 sonts déjà cliquées

cards.forEach(card => {
    card.addEventListener('click', flipCard);
})

// FONCTIONS

// Retourner une carte 
function flipCard(){

    if(lock) return;

    this.childNodes[1].classList.toggle('flip');
    // this = div carte = carte cliquée qui déclenche la fonction
    // childNodes = noeud enfant, ici [1] = arrière et [0] = face
    // class active = transform: rotateY(180deg);


    // LES LIGNES SUIVANTES PERMETTENT DE FAIRE RETOURNER 2 CARTES

    /* Quand on clic sur la 1ere, elle doit attendre qu'une 2e soit retournée.
    La variable hasFlippedCard va permettre de gérer cet état.
    - s'il n'y a pas de carte retournée, hasFlippedCard = true
    - si l'utilisateur clic une seconde carte, on passe dans le bloc 'else'  */

    // POUR LA 1ERE CARTE CLIQUEE
    // 1ere execution de la fonction : Si la carte est bien retournée  : condition exécutée 1x / 2
    if(!hasFlippedCard){

        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    // POUR LA 2e CARTE CLIQUEE
    // 2e execution de la fonction : au 2e clic, on ignore la 1ere condition et on passe à celle-ci
    secondCard = this;
    hasFlippedCard = false;
    

    checkMatching();
}

// Vérifier que 2 cartes sont identiques grâce à getAttribute() + freezer l'event
// Si pas identiques, laisser les cartes se retourner après 1200 ms
function checkMatching(){

    if(firstCard.getAttribute('data-attr') === secondCard.getAttribute('data-attr')) {

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

    } else {
        lock = true;
        setTimeout(() => {

            firstCard.childNodes[1].classList.remove('flip');
            secondCard.childNodes[1].classList.remove('flip');

            lock = false;
        }, 1200)
    }

}

function randomOrder(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
}
randomOrder();






// other solution (similar) with comments https://marina-ferreira.github.io/tutorials/js/memory-game/