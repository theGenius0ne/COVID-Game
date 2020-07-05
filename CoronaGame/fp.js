//flaticon
function load_images(){
	virus_image = new Image;
	virus_image.src = "v1.png";

	player_image = new Image;
	player_image.src = "superhero.png";

	gem_image = new Image;
	gem_image.src = "gemm.png";
}
//add movement to the bird
//game loop
function init(){
//DOM TREE TRAVERSAL
canvas = document.getElementById("canvas_one");
console.log(canvas);
//CHANGE THE HEIGHT AND WIDTH OF THE BOX
W = 700;
H = 400;

canvas.width = W;
canvas.height = H;

//PEN FOR CANVAS
pen = canvas.getContext('2d');
console.log(pen);

score = 0;
game_over= "false";

//USE OF JSON creating an object without a class
e1 = {
	x : 150,
	y : 50,
	w : 90,
	h : 90,
	speed : 20,
};

e2 = {
	x : 300,
	y : 150,
	w : 60,
	h : 70,
	speed : 35,
};

e3 = {
	x : 450,
	y : 20,
	w : 60,
	h : 80,
	speed : 40,
};
enemy = [e1,e2,e3];

player ={
	x : 20,
	y : H/2,
	w : 60,
	h : 60,
	speed : 20,
	moving : "false",
};

gem ={
	x : W-100,
	y : H/2,
	w : 60,
	h : 60,
};

//create an event listener for game area i.e canvas otherwise we can include whole document
canvas.addEventListener('mousedown',function(){
	console.log("You pressed the mouse");
	player.moving = true;
});

canvas.addEventListener('mouseup',function(){
	console.log("You released the mouse");
	player.moving = false;
});

}

function draw(){
//clear the old screen entire area
pen.clearRect(0,0,W,H);

//drawing bird on screeen
pen.fillStyle = "red";

pen.drawImage(player_image, player.x, player.y, player.w, player.h);

pen.drawImage(gem_image, gem.x, gem.y, gem.w, gem.h);
// pen.fillRect(bird.x,bird.y,bird.w,bird.h);
for(let i =0; i<enemy.length;i++){
		pen.drawImage(virus_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
	}
	pen.fillStyle = "white";
	pen.fillText("Score: "+ score,10,10);
}

function isColliding(b1,b2){
	//x,y,w,h
	if(Math.abs(b1.x-b2.x)<=b2.w && Math.abs(b1.y-b2.y)<=b2.h){
		return true;
	}
	return false;

}

function update(){

	//player state
	if(player.moving == true){
		player.x += player.speed;
		score+=20;
	}

	//loop check for collision betwen corona and player
	for(let i = 0; i< enemy.length; i++){
		if(isColliding(enemy[i],player)){
			score -= i*100;
			if(score < 0){
				game_over = true;
				alert("Game Over bro");

			}
		}
	}

	if(isColliding(gem,player)){
		game_over = true;
		draw();
		alert("Your Score "+ score);

		//break the game loop
	}

	for(let i =0 ; i< enemy.length; i++){
		enemy[i].y += enemy[i].speed;
		if(enemy[i].y >H-enemy[i].h || enemy[i].y < 0){
		enemy[i].speed *= -1;
		}
	}
}

function gameloop(){
	if(game_over == true){
		clearInterval(f);
	}

	draw();
	update();
}

load_images();
//start of the game
init();

//repeatedly call gameloop
var f =setInterval(gameloop,100);

