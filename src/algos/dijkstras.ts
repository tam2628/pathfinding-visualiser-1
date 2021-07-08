const dijkstra = (grid: Grid): GridNode[] => {
  const ROWS = grid.rows,
    COLS = grid.cols,
    START_ROW = grid.start.first,
    START_COL = grid.start.second,
    END_ROW = grid.end.first,
    END_COL = grid.end.second;

  let _grid = grid.grid;
  let visitedNodesInOrder: GridNode[] = [];
  let nodes = _grid.reduce((a, b) => [...a, ...b], []);

  _grid[START_ROW][START_COL].distance = 0;
  while (!!nodes.length) {
    nodes = nodes.sort((a, b) => a.distance - b.distance);
    const node = nodes.shift() as GridNode;
    if (node.isWall()) continue;
    if (node.distance === Infinity) return visitedNodesInOrder;

    node.isVisited = true;
    visitedNodesInOrder.push(node);

    if (node.row === END_ROW && node.col === END_COL)
      return visitedNodesInOrder;

    updateNeighbors(_grid, node, ROWS, COLS);
  }

  return visitedNodesInOrder;
};

function updateNeighbors(
  nodeGrid: GridNode[][],
  node: GridNode,
  rows: number,
  cols: number
) {
  const neighbors = getNeighbors(nodeGrid, node, rows, cols);
  neighbors.map((n) => {
    n.distance = node.distance + 1;
    n.previous = node;
  });
}

function getNeighbors(
  nodeGrid: GridNode[][],
  node: GridNode,
  rows: number,
  cols: number
): GridNode[] {
  const neighbors: GridNode[] = [];

  try {
    if (node.col - 1 >= 0) neighbors.push(nodeGrid[node.row][node.col - 1]); //left
    if (node.row + 1 < rows) neighbors.push(nodeGrid[node.row + 1][node.col]); //down
    if (node.col + 1 < cols) neighbors.push(nodeGrid[node.row][node.col + 1]); // right
    if (node.row - 1 >= 0) neighbors.push(nodeGrid[node.row - 1][node.col]); //up
  } catch {
    throw new Error("Updating neighbors failed");
  }

  return neighbors.filter((n) => n.isVisited === false);
}
