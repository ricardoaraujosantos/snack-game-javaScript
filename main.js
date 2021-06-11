let canvas = document.getElementById('snack');
let context = canvas.getContext('2d');
let box = 32;
let snack = [];
snack[0] = {
     x: 8 * box,
     y: 8 * box
 };

//Criando background
function getbackground() {
    context.fillStyle = 'lightgrey';
    context.fillRect(0 , 0, 16 * box, 16 * box);
};

//Criando a cobrinha
function getSnack() {
    for(i = 0; i < snack.length; i++){
        context.fillStyle = "yellow";
        context.fillRect(snack[i].x, snack[i].y, box, box);
    }
};


getbackground();
getSnack();
