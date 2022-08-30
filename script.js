//ALMOST SNAKE, COURSE CONTRE LA MONTRE

//W S D Z pour se déplacer

//ESPACE POUR CHANGER DE COULEUR DE LA PROIE


//LE CODE CI-DESSOUS

let canvas = document.querySelector('.snake');
let canvastwo = document.querySelector('.manger');

let body = document.querySelector('body');
let restartr = document.createElement("button");
restartr.id = "recommencer"
let restartrlost = document.createElement("button"); //enfant unique pas multiple
let loser = document.createElement("div");
loser.id = "losemenu";
let score = document.getElementById("score");
var serpent = canvas.getContext('2d');
var manger = canvastwo.getContext('2d');
let posSerpent = { x: 10, y: 10};
let posManger = { x: 50, y :50 };
let sizeSerpent = 20;
const colors = ["yellow","green","blue","orange"];
let nbcolor = 0;
let nbscore = 0;
score.innerText = nbscore;
let youlose = false;
let eaten = false;
let speed = 6; //vitesse pour le déplacement 2D
let timing = document.getElementById("timing");
let nbtimer = 5;


function timer(){
    timing.innerText = nbtimer;
    var down = setInterval(() => {
        timing.innerText = nbtimer--;
        if(nbtimer < 0){ //si temps écoulé
            youlose = true;
            clearInterval(down);
            nbtimer = 5; //reset à 5s
        }
        if(youlose){ //si perdu (sortie du canvas)
            clearInterval(down);
            nbtimer = 5; //reset à 5s
        }
        //faire un pour le bouton restart button
    },1000);
}

function createCanvas(canvas,widthSize,heightSize,color,z){
    canvas.width = widthSize;
    canvas.height = heightSize;
    canvas.setAttribute("style","z-index: " + z + "; margin: auto; position: absolute; left: 0; right: 0; top: 150px; bottom: 0; display: block; background: " + color + ";")
}

function leSerpent(serpent,ser_col,posSerpent){
    serpent.fillStyle = ser_col;
    serpent.fillRect(posSerpent.x, posSerpent.y, sizeSerpent, sizeSerpent); //posX,posY, sizeX, sizeY
}

function leManger(ca,manger,man_col,posManger){
    manger.fillStyle = man_col;
    manger.fillRect(posManger.x, posManger.y, sizeSerpent, sizeSerpent); //posX,posY, sizeX, sizeY
}

function animatio(canvas,serpent,x,y){
    serpent.clearRect(0,0,canvas.width,canvas.height); //mettre le ctx à 0 en position size et en taille 
    serpent.fillRect(x, y, sizeSerpent, sizeSerpent); //posX,posY, sizeX, sizeY
}

function checkCollision(canvas, pos){
    if(pos.x <= -1 || pos.x >= canvas.width - sizeSerpent){
        youlose = true
    }
    if(pos.y <= -1 || pos.y >= canvas.height - sizeSerpent){
        youlose = true;
    }
}
function randomizer(size){
    return Math.floor(Math.random() * size);
}

function serpentEat(posS,posM,size){
    if((posS.x < posM.x + size && posS.x + size > posM.x) && (posS.y < posM.y + size && posS.y + size > posM.y)){ //collisions au bordure de chaque CTX
        // console.warn("collision");
        nbscore++;
        // speed = speed + 5;
        score.innerText = nbscore;
        eaten = true;
    }
}

function getEaten(x,y,man){ //reset la bouffe et le place au pif x, y
    man.clearRect(0,0,canvas.width,canvas.height); //mettre le ctx à 0 en position size et en taille 
    man.fillRect(x,y, sizeSerpent, sizeSerpent); //posX,posY, sizeX, sizeY
    eaten = false;
}

function createRestartButton(restartr){
    restartr.innerText = "Recommencer";
    restartr.setAttribute("style"," margin: 10px auto; display: block; width: 200px; height: 50px; cursor: pointer;");
    body.appendChild(restartr);
}
createRestartButton(restartr);

function createYouLost(loser){
    loser.setAttribute("style","width: 50%; height: 40%; z-index: 10; background: grey; border-radius: 8px; transition: background 1s; margin: auto; display: none; position: fixed; font-size: 5em; text-align: center; top: 0; bottom: 0; left: 0; right: 0;");
    let textloser = document.createElement("p");
    textloser.innerHTML = "TU AS PERDU !";
    body.appendChild(loser);
    loser.appendChild(textloser);
    createRestartButton(restartrlost);
    loser.appendChild(restartrlost);
}
createYouLost(loser);

function start(){
    posSerpent = { x: 10, y: 10 }; //init
    posManger = { x :50, y: 50 }; //init
    timer();
    serpent.clearRect(0,0,canvas.width,canvas.height);
    createCanvas(canvas,500,500,"transparent",10);
    createCanvas(canvastwo,500,500,"black",1);
    leSerpent(serpent,"yellow",posSerpent);
    leManger(canvastwo,manger,"red",posManger);

    let checkingcollide = setInterval(() => {
        checkCollision(canvas,posSerpent);
        if(!eaten){
            serpentEat(posSerpent,posManger,sizeSerpent);
        }
        if(youlose){
            clearInterval(checkingcollide);
            loser.style.display = "block";
        }
        if(eaten){
            nbtimer = 5;
            posManger = { x: randomizer(500), y: randomizer(500) };
            getEaten(posManger.x,posManger.y,manger);
        }
    },100);
}

function changeColorSnake(ser,tableau,nbtab,pos){ //changer couleur
    ser.fillStyle = tableau[nbtab];
    ser.fillRect(posSerpent.x, posSerpent.y, sizeSerpent, sizeSerpent); //posX,posY, sizeX, sizeY
}

function moveSnake(ser,event){
    console.log(event.code)
    switch(event.key){
        case 'q': //gauche
            posSerpent.x = posSerpent.x - speed;
            animatio(canvas,ser,posSerpent.x,posSerpent.y);
        break;
        case 'd': //droite
            posSerpent.x = posSerpent.x + speed;
            animatio(canvas,ser,posSerpent.x,posSerpent.y);
        break;
        case 's': //en bas
            posSerpent.y = posSerpent.y + speed;
            animatio(canvas,ser,posSerpent.x,posSerpent.y);
        break;
        case 'z': //en haut
            posSerpent.y = posSerpent.y - speed;
            animatio(canvas,ser,posSerpent.x,posSerpent.y);
        break;
    }
}


start(); //le jeu commence, la base


function restart(){
    nbscore = 0;
    score.innerText = nbscore;
    start();
}

document.addEventListener("keypress",(e) => {
    if(e.code == 'Space'){
        nbcolor++;
        if(nbcolor >= colors.length){ //si supérieur à la taille décimal du tableau
            nbcolor = 0;
        }
        changeColorSnake(serpent,colors,nbcolor,posSerpent);
    } else {
        if(!youlose){ //si toujours en vie
            moveSnake(serpent,e);
        }
    }
})

restartr.addEventListener("click", function(){
    if(!youlose) restart(); //!youlose pour désactiver le bouton recommencer de base
})

restartrlost.addEventListener("click", function(){
    youlose = false;
    nbscore = 0;
    score.innerText = nbscore;
    loser.style.display = "none";
    restart();
})


//je dois fix le bouton recommencer, le timer ne reset pas :/