window.onload = () => {
    var gridSize = { x:32, y:32 };

    var grid = Array.from(Array(gridSize.x), () => new Array(gridSize.y));
    for (let x = 0; x < gridSize.x; x++) for (let y = 0; y < gridSize.y; y++) grid[x][y] = new Cell({ x:x, y:y }, (Math.floor(Math.random()*10) < 3) ? 'wall' : 'floor');
    grid.forEach(row => row.forEach(cell => cell.addNeighbors(grid)));

    var gridStart = grid[0][0];
    gridStart.tile = 'floor';
    var gridEnd = grid[gridSize.x-1][gridSize.y-1];
    gridEnd.tile = 'floor';

    var pathFinder = new Astar(grid, gridStart, gridEnd);
    
    var display = new Display(pathFinder);
    display.drawGrid();
    
    var startTime = Date.now();
    var frame = () => {
        if (pathFinder.isSearching) {
            pathFinder.search();
            display.drawFrame(pathFinder);
            requestAnimationFrame(frame);
        }
        else display.drawMessage(pathFinder.isSolvable ? Math.floor(Date.now() - startTime) / 1000 + 's' : 'NOT SOLVABLE');
    }
    requestAnimationFrame(frame);
}