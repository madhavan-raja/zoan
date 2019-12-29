function Cell()
{
    this.graphics = loadImage("assets/graphics/cell.png");

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
        this.x = lerp(this.x, mouseX, 0.6);
        this.x = constrain(this.x, this.xBounds, width - this.xBounds);

        this.y = lerp(this.y, mouseY, 0.6);
        this.y = map(this.y, height, 0, this.maxY, this.minY);
        this.y = constrain(this.y, this.minY, this.maxY);

        this.size = map(mouseY, this.startRegion, this.startRegion - this.sizeModificationActiveRegion, this.minSize, this.maxSize)
        this.size = constrain(this.size, this.minSize, this.maxSize)
    }

    this.show = function()
    {
        imageMode(CENTER)
        image(this.graphics, this.x, this.y, this.size, this.size);;
    }
}
