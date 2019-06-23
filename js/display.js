class Display {
    constructor(pathFinder) {
        this.pathFinder = pathFinder;
        this.gridSize = { x:this.pathFinder.grid.length, y:this.pathFinder.grid[0].length };
        this.size = { x:256, y:256 };
        this.zoom = 2;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.size.x * this.zoom;
        this.canvas.height = this.size.y * this.zoom;

        this.cx = this.canvas.getContext("2d");
        this.cx.scale(this.zoom, this.zoom);

        document.body.appendChild(this.canvas);

        this.drawGrid = () => {
            this.cx.fillStyle = '#000';
            this.pathFinder.grid.forEach(row => row.forEach(cell => {
                if (cell.tile === 'floor') {
                    this.cx.fillRect(
                        cell.pos.x * this.size.x / this.gridSize.x + this.size.x / this.gridSize.x / 8,
                        cell.pos.y * this.size.y / this.gridSize.y + this.size.y / this.gridSize.y / 8,
                        this.size.x / this.gridSize.x - this.size.x / this.gridSize.x / 4,
                        this.size.y / this.gridSize.y - this.size.y / this.gridSize.y / 4
                    );
                }
            }));
        }

        this.drawFrame = () => {
            this.pathFinder.closedSet.forEach(cell => {
                this.cx.clearRect(
                    cell.pos.x * this.size.x / this.gridSize.x + this.size.x / this.gridSize.x / 8,
                    cell.pos.y * this.size.y / this.gridSize.y + this.size.y / this.gridSize.y / 8,
                    this.size.x / this.gridSize.x - this.size.x / this.gridSize.x / 4,
                    this.size.y / this.gridSize.y - this.size.y / this.gridSize.y / 4
                );
            });
            
            this.cx.fillStyle = '#fff';
            this.pathFinder.openSet.forEach(cell => {
                this.cx.fillRect(
                    cell.pos.x * this.size.x / this.gridSize.x + this.size.x / this.gridSize.x / 8,
                    cell.pos.y * this.size.y / this.gridSize.y + this.size.y / this.gridSize.y / 8,
                    this.size.x / this.gridSize.x - this.size.x / this.gridSize.x / 4,
                    this.size.y / this.gridSize.y - this.size.y / this.gridSize.y / 4
                );
            });
            
            this.cx.fillStyle = '#00f';
            this.pathFinder.path.forEach(cell => {
                this.cx.fillRect(
                    cell.pos.x * this.size.x / this.gridSize.x + this.size.x / this.gridSize.x / 8,
                    cell.pos.y * this.size.y / this.gridSize.y + this.size.y / this.gridSize.y / 8,
                    this.size.x / this.gridSize.x - this.size.x / this.gridSize.x / 4,
                    this.size.y / this.gridSize.y - this.size.y / this.gridSize.y / 4
                );
            });
        }

        this.drawMessage = message => {
            this.cx.strokeStyle = '#000';
            this.cx.lineWidth = 2;
            this.cx.textAlign = 'center';
            this.cx.fillStyle = '#fff';
            this.cx.font = 'bold 32px sans-serif';
            this.cx.fillText(message, this.size.x / 2, this.size.y / 2);
            this.cx.strokeText(message, this.size.x / 2, this.size.y / 2);
        }
    }
}