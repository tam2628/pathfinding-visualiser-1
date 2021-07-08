type Grid = {
  cols: number;
  rows: number;
  start: Pair;
  end: Pair;
  grid: GridNode[][];
  getGrid: () => HTMLElement;
};

type Pair = {
  first: number;
  second: number;
};

const GridFactory = (
  rows: number,
  cols: number,
  start: Pair,
  end: Pair
): Grid => {
  let grid: GridNode[][] = [];
  for (let i = 0; i < rows; ++i) {
    const temp = [];
    for (let j = 0; j < cols; ++j) {
      const isStart = start.first === i && start.second === j;
      const isEnd = end.first === i && end.second === j;
      temp.push(GridNodeFactory(i, j, isStart, isEnd));
    }
    grid.push(temp);
  }

  const getGrid = (): HTMLElement => {
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("grid");
    for (let i = 0; i < rows; ++i) {
      const rowDivsContainer = document.createElement("div");
      rowDivsContainer.classList.add("row");
      for (let j = 0; j < cols; ++j) {
        const div = grid[i][j].getNode();
        if (grid[i][j].isEnd) div.innerHTML = "🏁";
        rowDivsContainer.appendChild(div);
      }
      containerDiv.appendChild(rowDivsContainer);
    }

    containerDiv.addEventListener("mousedown", () => {
      const state = mouseDownEventManager.getState();
      const newState = { ...state, mouseDown: true };
      mouseDownEventManager.emit(newState);
    });

    containerDiv.addEventListener("mouseup", () => {
      const state = mouseDownEventManager.getState();
      const newState = { ...state, mouseDown: false };
      mouseDownEventManager.emit(newState);
    });

    return containerDiv;
  };

  let gridObj: Grid = {
    cols,
    rows,
    getGrid,
    start,
    end,
    grid,
  };

  return gridObj;
};
