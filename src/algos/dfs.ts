const dfs = (grid: Grid): GridNode[] => {
  const ROWS = grid.rows,
    COLS = grid.cols,
    START_ROW = grid.start.first,
    START_COL = grid.start.second,
    END_ROW = grid.end.first,
    END_COL = grid.end.second;

  let _grid = grid.grid;
  let visitedNodesInOrder: GridNode[] = [];
  const stack = [];
  stack.push(_grid[START_ROW][START_COL]);

  while (stack.length !== 0) {
    const node = stack.pop() as GridNode;
    node.isVisited = true;
    visitedNodesInOrder.push(node);

    if (node.row === END_ROW && node.col === END_COL)
      return visitedNodesInOrder;

    // get the new neighbors and put them in the stack
    const neighbors = getNeighbors(_grid, node, ROWS, COLS);
    neighbors.map((n) => {
      n.previous = node;
      stack.push(n);
    });
  }

  return visitedNodesInOrder;
};
