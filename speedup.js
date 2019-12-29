function SpeedUp()
{
    this.graphics = loadImage("assets/graphics/speedup.png");

    this.speedMultiplier = 2;
    this.scoreMultiplier = 5;
    this.duration = 5;

    this.scoreBonus = 50;

    this.size = 20;
    this.x = random(maxCellSize, width - maxCellSize);
    this.y = -this.size;
    this.currentSpeedMultiplier = random(1, 1.5);

    this.update = function()
    {
        this.y += netMovementSpeed * this.currentSpeedMultiplier;
    }

    this.show = function()
    {
        // rectMode(CENTER);
        // noStroke();
        // fill(255, 195, 99);
        // rect(this.x, this.y, this.size, this.size);
        imageMode(CENTER);
        image(this.graphics, this.x, this.y, this.size, this.size);
    }

    this.offscreen = function()
    {
        return this.y > height;
    }

    this.hits = function(cell)
    {
        if (this.y + this.size / 2 > cell.y - cell.size / 2 && this.y - this.size / 2 < cell.y + cell.size / 2)
            if (this.x + this.size / 2 > cell.x - cell.size / 2 && this.x - this.size / 2 < cell.x + cell.size / 2)
                return true;

        return false;
    }
}