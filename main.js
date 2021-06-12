
//Ligando o index canvas definindo contexto 2d e criando o tamanho do nosso box 
let canvas = document.getElementById('snack');
let context = canvas.getContext('2d');
let box = 32;

//Array cobrinha e posição de inicio
let snack = [];
snack[0] = {
     x: 8 * box,//posição inicial
     y: 8 * box
 };

 //Array comidinha
 let food = {
     x: Math.floor(Math.random() * 15 + 1) * box,
     y: Math.floor(Math.random() * 15 + 1) * box
 }

//Criando background
function getBackground() {
    context.fillStyle = 'grey';
    context.fillRect(0 , 0, 16 * box, 16 * box);
};

//Criando a cobrinha
function getSnack() {
    for(i = 0; i < snack.length; i++){
        context.fillStyle = "yellow";
        context.fillRect(snack[i].x, snack[i].y, box, box);
    }
};

//Criar comida
function getFood(){
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box)
};

//Criando um evento de teclado que vai receber updateDirection e direcionar a cobrinha conforme a tecla digitada
document.addEventListener('keydown', updateDirection);

function updateDirection(event) {
    if(event.keyCode === 37 && direction !== 'right') direction = 'left';
    if(event.keyCode === 38 && direction !== 'down') direction = 'up';
    if(event.keyCode === 39 && direction !== 'left')
    direction = 'right';
    if(event.keyCode === 40 && direction !== 'up')
    direction = 'down';
}

//Criando movimentos da cobrinha
let direction = 'right';

function startGame() {

 //Condição para fazer a cobrinha ultrapassar a posição 16 do background e retornar na posição 0, do outro lado
 if(snack[0].x > 15 * box && direction === 'right') snack[0].x = 0;
 if(snack[0].x < 0 && direction === 'left') snack[0].x = 16 * box;
 if(snack[0].y > 15 * box && direction === 'down') snack[0].y = 0;
 if(snack[0].y < 0 && direction === 'up') snack[0].y = 16 * box;

    getBackground();
    getSnack();
    getFood();
    
    let snackX = snack[0].x;
    let snackY = snack[0].y;

    //Definindo as direções da cobrinha
    if(direction === 'right') snackX += box;
    if(direction ==='left') snackX -= box;
    if(direction === 'up') snackY -= box;
    if(direction === 'down') snackY += box;

     snack.pop();//cada vez que a cobrinha for direcionada o pop vai remover o ultima posição dando a sensação de movimentação

     let newHead = {
         x: snackX,
         y: snackY
     };

     snack.unshift(newHead);//E cada vez que a cobrinha se movimentar como sera removido a ultima posição sera adicionada uma nova cabeça na primeira posição com o unsshift

};

//Vai setar a velocidade em que o jogo vai se movimentar
let game = setInterval(startGame, 100);
