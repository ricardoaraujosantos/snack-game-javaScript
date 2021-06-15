
//Botões inicio e pause
let btnStart = document.getElementById('btn-start');
let btnStop = document.getElementById('btn-stop');

let audioGame = {file: "file/title.mp3"};
let audio = document.getElementById('audio');
let game = [];

//Quando clicar no botão vai setar o inicio ou pause do jogo e audio
btnStart.onclick = () => { 
    game = setInterval(startGame, 200);
  
    audio.src = audioGame.file;  //Add audio ao game
};
btnStop.onclick = () => { clearInterval(game)};

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

 //objeto comidinha
 let food = {
     x: Math.floor(Math.random() * 15 + 1) * box,
     y: Math.floor(Math.random() * 15 + 1) * box
 }

//Criando background
getBackground = () => {
    context.fillStyle = '#212F3C';
    context.fillRect(0 , 0, 16 * box, 16 * box);
};

//define uma nova imagem a ser usada no desenho snake
let imgHead = new Image();
imgHead.src = "img/head-snake.jpg";


//Criando a cobrinha
getSnack = () => {
    for(i = 0; i < snack.length; i++){
        let patternImg = context.createPattern(imgHead, 'repeat');
        context.fillStyle = patternImg;
        context.fillRect(snack[i].x, snack[i].y, box-1, box-1);
    }
};

//Criar comida
getFood = () => {
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

//Variavel score 
let score = 0;

//Função cria nova comida e faz um loop em cada elemento snack adicionando a comida
function snakeNotFood(){
    if(food.x){
        prevFoodX = food.x;
    }
    if(food.y){
        prevFoodY = food.y;
    }
//Criando nova comida aleatorio
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
    

    if(prevFoodX === food.x && prevFoodY === food.y){
        snakeNotFood();
    }else{
       snack.forEach(function(elem){
           if(((elem.x === food.x) && (elem.y === food.y))){
           snakeNotFood();
           }
       });
            
        };
    }

startGame = () => {

 //Condição para fazer a cobrinha ultrapassar a posição 16 do background e retornar na posição 0, do outro lado
 if(snack[0].x > 15 * box && direction === 'right') snack[0].x = 0;
 if(snack[0].x < 0 && direction === 'left') snack[0].x = 16 * box;
 if(snack[0].y > 15 * box && direction === 'down') snack[0].y = 0;
 if(snack[0].y < 0 && direction === 'up') snack[0].y = 16 * box;

 //Caso a cabeça se choque com o corpo fim de game
    for(i = 1; i < snack.length; i++) {
        if(snack[0].x === snack[i].x && snack[0].y === snack[i].y){
            clearInterval(game);
            alert("Fim de jogo!")
        }
    }

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

    //Condição enquanto não se chocar com a comida permanece uma só cabeça do contrario acrescenta uma cabeça ao corpo e pontoa 10 pontos no score 
    if(snackX !== food.x || snackY !== food.y) {
        snack.pop();
    }else{
        snakeNotFood();

        let pontos = document.getElementById('score');
        score += 10;
        pontos.innerHTML = `<span>SCORE : ${ score } Pts</span></br>`;

    }

     let newHead = {
         x: snackX,
         y: snackY
     };

     snack.unshift(newHead);//E cada vez que a cobrinha se movimentar como sera removido a ultima posição sera adicionada uma nova cabeça na primeira posição com o unsshift

};