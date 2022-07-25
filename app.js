const cards = document.querySelectorAll('.carte');

let flippedCard = false;
let firstCard, secondCard; // Undefined
let lock = false; // Verouiller les cartes quand 2 sonts déjà cliquées

cards.forEach(card => {
    card.addEventListener('click', flipCard);
})

// FONCTIONS

// Retourner une carte 
function flipCard(){

    if(lock) return;

    this.childNodes[1].classList.toggle('active');
    // this = div carte = carte cliquée qui déclenche la fonction
    // childNodes = noeud enfant, ici [1] = arrière et [0] = face
    // class active = transform: rotateY(180deg);


    // LES LIGNES SUIVANTES PERMETTENT DE FAIRE RETOURNER 2 CARTES

    // POUR LA 1ERE CARTE CLIQUEE
    // 1ere execution de la fonction : Si la carte est bien retournée  : condition exécutée 1x / 2
    if(!flippedCard){

        flippedCard = true;
        firstCard = this;
        return;
    }
    // POUR LA 2e CARTE CLIQUEE
    // 2e execution de la fonction : au 2e clic, on ignore la 1ere condition et on passe à celle-ci
    flippedCard = false;
    secondCard = this;

    // console.log(premiereCarte, secondeCarte);

    matching();
}

function matching(){

    if(firstCard.getAttribute('data-attr') === secondCard.getAttribute('data-attr')) {

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

    } else {
        lock = true;
        setTimeout(() => {

            firstCard.childNodes[1].classList.remove('active');
            secondCard.childNodes[1].classList.remove('active');

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

