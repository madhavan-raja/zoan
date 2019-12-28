function Cell()
{
    this.minSize = minCellSize;
    this.maxSize = maxCellSize;
    this.size = this.minSize;

    this.x = width / 2;
    this.xBounds = this.maxSize;

    this.minY = height - 200;
    this.maxY = height - 100;
    this.y = height - 100;

    this.startRegion = height - 100;
    this.sizeModificationActiveRegion = 200;

    this.update = function()
    {
        this.x = constrain(mouseX, this.xBounds, width - this.xBounds);

        this.y = map(mouseY, height, 0, this.maxY, this.minY);
        this.y = constrain(this.y, this.minY, this.maxY);

        this.size = map(mouseY, this.startRegion, this.startRegion - this.sizeModificationActiveRegion, this.minSize, this.maxSize)
        this.size = constrain(this.size, this.minSize, this.maxSize)
    }

    this.show = function()
    {
        rectMode(CENTER)
        rect(this.x, this.y, this.size, this.size);
    }
}