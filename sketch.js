var cell;
var walls = [];
var speedUps = [];

var canvas;
var fontRegular;
var backgroundImage;

let minCellSize = 20;
let maxCellSize = 100;

let baseMovementSpeed = 5;
let movementSpeed = baseMovementSpeed;
let acceleration = 0.01;
let netMovementSpeed = movementSpeed;

let wallSpawnCounter = 0;
let speedUpSpawnCounter = 5000 / movementSpeed;

let score = 0;
let highScore = 0;

let wallScoreBonus = 10;
let idleBonus = 5;
let minCellSizeScoreMultiplier = 1;
let maxCellSizeScoreMultiplier = 10;
let powerUpSpeedMultiplier = 1;
let powerUpScoreMultiplier = 1;
let powerUpActivity = 5;

let isGameOver = false;

function preload()
{
	fontRegular = loadFont("assets/fonts/expressway-free.regular.ttf");
	backgroundImage = loadImage("assets/graphics/background.png");
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
	imageMode(CORNER);
	background(backgroundImage);

	if (powerUpActivity <= 0)
	{
		powerUpScoreMultiplier = lerp(powerUpScoreMultiplier, 1, 0.05);
		powerUpSpeedMultiplier = lerp(powerUpSpeedMultiplier, 1, 0.05);
	}

	scoreMultiplier = map(cell.size, minCellSize, maxCellSize, minCellSizeScoreMultiplier, maxCellSizeScoreMultiplier) * powerUpScoreMultiplier;
	netMovementSpeed = movementSpeed * powerUpSpeedMultiplier;

	if (frameRate() > 1)
	{
		score += idleBonus / frameRate() * scoreMultiplier;

		if (powerUpActivity > 0)
		{
			powerUpActivity -= 1 / frameRate();
		}

		movementSpeed += acceleration / frameRate();
	}

	if (wallSpawnCounter <= 0)
	{
		walls.push(new Wall());
		wallSpawnCounter = random(200 / netMovementSpeed, 500 / netMovementSpeed);
	}
	wallSpawnCounter--;

	if (speedUpSpawnCounter <= 0 && powerUpActivity <= 0)
	{
		speedUps.push(new SpeedUp());
		speedUpSpawnCounter = random(1000 / netMovementSpeed, 3000 / netMovementSpeed);
	}
	speedUpSpawnCounter--;

	for (let i = speedUps.length - 1; i >= 0; i--)
	{
		speedUps[i].update();
		speedUps[i].show();

		if (speedUps[i] && speedUps[i].hits(cell))
		{
			powerUpSpeedMultiplier = speedUps[i].speedMultiplier;
			powerUpScoreMultiplier = speedUps[i].scoreMultiplier;
			powerUpActivity = speedUps[i].duration;
			score += speedUps[i].scoreBonus * scoreMultiplier;
			speedUps.splice(i, 1);
		}

		if (speedUps[i] && speedUps[i].offscreen())
		{
			speedUps.splice(i, 1);
		}
	}

	cell.update();
	cell.show();

	for (let i = walls.length - 1; i >= 0; i--)
	{
		walls[i].update();
		walls[i].show();

		if (walls[i] && walls[i].passed(cell))
		{
			score += wallScoreBonus * scoreMultiplier;
		}

		if (walls[i] && walls[i].hits(cell))
		{
			gameOver();
		}

		if (walls[i] && walls[i].offscreen())
		{
			walls.splice(i, 1);
		}
	}

	if (score > highScore)
		highScore = score;

	if (isGameOver)
	{
		rectMode(CENTER);
		fill(0, 0, 0, 230);
		rect(width / 2, height / 2, width, height);

		fill(242, 239, 233);
		stroke(0);
		strokeWeight(1);
		textFont(fontRegular);
		textSize(62);
		textStyle(BOLD);
		textAlign(CENTER);
		text("Game Over", width / 2, height / 2);
		textSize(32);

		if (Math.round(score) == 69)
			text("nice", width / 2, 162);
		else if (Math.round(score) == 420)
			text("ayy lmao", width / 2, 162);
		else if (Math.round(score) == 6969)
			text("niiiiice", width / 2, 162);
		else if (Math.round(score) == 42069)
			text("omg bro", width / 2, 162);
		else if (Math.round(score) == 69420)
			text("omfg bruh", width / 2, 162);
		else if (Math.round(score) == 420420)
			text("ayyyyyyyyyy lmaooooooo", width / 2, 162);
		else if (Math.round(score) == 696969)
			text("niiiiiiiiiiiiiiiiiiiiiiiiice", width / 2, 162);

		text("High Score: " + Math.round(highScore), width / 2, height / 2 + 62);

		text("Click on the screen to restart", width / 2, height - 50);
	}

	fill(242, 239, 233);
	stroke(0);
	strokeWeight(1);
	textFont(fontRegular);
	textSize(62);
	textStyle(BOLD);
	textAlign(CENTER);
	text(Math.round(score), width / 2, 100);

	rectMode(CENTER);
	fill(0, 0, 0, 10);
	rect(width / 2, height / 2, width, height);
}

function keyPressed()
{
	if (key == ' ')
		restart();
}

function mousePressed()
{
	if (mouseButton == LEFT)
		restart();
}

function gameOver()
{
	isGameOver = true;
	noLoop();
}

function restart()
{
	if (isGameOver)
	{
		isGameOver = false;
		walls = [];
		speedUps = [];
		powerUpActivity = 0;
		score = 0;
		movementSpeed = baseMovementSpeed;
		speedUpSpawnCounter = 5000 / movementSpeed;
	}

	loop();
}
