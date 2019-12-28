var cell;
var walls = [];

var canvas;
var backgroundImage;

let minCellSize = 20;
let maxCellSize = 100;

let movementSpeed = 5;

let wallSpawnCounter = 0;

let score = 0;
let wallScoreBonus = 10;
let idleBonus = 5;
let minCellSizeScoreMultiplier = 1;
let maxCellSizeScoreMultiplier = 10;

let gameOver = false;

function preload()
{
	fontRegular = loadFont("assets/expressway-free.regular.ttf");
}

function setup()
{
	canvas = createCanvas(480, 640);
  	var x = (windowWidth - width) / 2;
  	var y = (windowHeight - height) / 2;
	canvas.position(x, y);
	  
	cell = new Cell();
}

function windowResized()
{
  	var x = (windowWidth - width) / 2;
  	var y = (windowHeight - height) / 2;
	canvas.position(x, y);
}

function draw()
{
	background(10);

	fill(255);
	textFont(fontRegular);
	textSize(62);
	textStyle(BOLD);
	textAlign(CENTER);
	text(Math.round(score), width / 2, 100);

	cell.update();
	cell.show();

	scoreMultiplier = map(cell.size, minCellSize, maxCellSize, minCellSizeScoreMultiplier, maxCellSizeScoreMultiplier);

	if (frameRate() > 1)
	{
		score += idleBonus / frameRate() * scoreMultiplier;
	}

	if (wallSpawnCounter <= 0)
	{
		walls.push(new Wall());
		wallSpawnCounter = random(200 / movementSpeed, 500 / movementSpeed);
	}
	wallSpawnCounter--;

	for (let i = walls.length - 1; i >= 0; i--)
	{
		walls[i].update();
		walls[i].show();

		if (walls[i].offscreen())
		{
			walls.splice(i, 1);
		}

		if (walls[i].passed(cell))
		{
			score += wallScoreBonus * scoreMultiplier;
		}

		if (walls[i].hits(cell))
		{
			noLoop();
			gameOver = true;
		}
	}
}

function keyPressed()
{
	if (key == ' ')
		action();
}

function mousePressed()
{
	if (mouseButton == LEFT)
		action();
}

function action()
{
	if (gameOver)
	{
		gameOver = false;
		walls = [];
		score = 0;
	}
	loop();
}
