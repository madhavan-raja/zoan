function Wall()
{
    this.minGapSizeOffset = 10;
    this.gapSize = random(minCellSize + this.minGapSizeOffset, maxCellSize);
    this.leftSideSize = random(maxCellSize, width - maxCellSize - this.gapSize);
    this.rightSideSize = width - this.leftSideSize - this.gapSize;
    this.wallHeight = 50;
    this.y = -this.wallHeight;

    this.scored = false;

    this.update = function()
    {
        this.y += movementSpeed;
    }

    this.show = function()
    {
        rectMode(CORNER);
        noStroke();
        rect(0, this.y, this.leftSideSize, this.wallHeight);
        rect(this.leftSideSize + this.gapSize, this.y, this.rightSideSize, this.wallHeight);
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
