function Wall()
{
    this.graphics = loadImage("assets/graphics/wall.png");

    this.maxGapSizeMultiplier = 2;
    this.minGapSizeOffset = 10;
    this.gapSize = random(minCellSize + this.minGapSizeOffset, maxCellSize * this.maxGapSizeMultiplier);
    this.leftSideSize = random(maxCellSize, width - maxCellSize - this.gapSize);
    this.rightSideSize = width - this.leftSideSize - this.gapSize;
    this.wallHeight = 50;
    this.y = -this.wallHeight;

    this.scored = false;

    this.update = function()
    {
        this.y += netMovementSpeed;
    }

    this.show = function()
    {
        imageMode(CORNER);
        image(this.graphics, 0, this.y, this.leftSideSize, this.wallHeight);
        image(this.graphics, this.leftSideSize + this.gapSize, this.y, this.rightSideSize, this.wallHeight);
    }
    
    this.offscreen = function()
    {
        return this.y > height;
    }

    this.passed = function(cell)
    {
        if (!this.scored && this.y > cell.y + cell.size / 2)
        {
            this.scored = true;
            return true;
        }
        return false;
    }

    this.hits = function(cell)
    {
        if (this.y + this.wallHeight > cell.y - cell.size / 2 && this.y < cell.y + cell.size / 2)
            if (this.leftSideSize > cell.x - cell.size / 2 || width - this.rightSideSize < cell.x + cell.size / 2)
                return true;

        return false;
    }
}
