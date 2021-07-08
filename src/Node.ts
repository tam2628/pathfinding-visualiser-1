type GridNode = {
  col: number;
  row: number;
  isStart: boolean;
  isEnd: boolean;
  getNode: () => HTMLElement;
  distance: number;
  isVisited: boolean;
  previous?: GridNode;
  markVisited: () => void;
  markPath: () => void;
  isWall: any;
};

const GridNodeFactory = (
  row: number,
  col: number,
  isStart: boolean = false,
  isEnd: boolean = false
): GridNode => {
  const div = document.createElement("div");
  let distance = Infinity;
  let isVisited = false;
  let _isWall = false;
  let state: State;

  state = mouseDownEventManager.subscribe((newState) => {
    state = newState;
  });

  const isWall = () => _isWall;

  const getNode = () => {
    const classes = ["node"];
    if (isStart) classes.push("start");
    if (isEnd) classes.push("end");
    div.classList.add(...classes);

    const makeWall = () => {
      _isWall = true;
      div.classList.add("wall");
    };

    div.addEventListener("mouseover", () => {
      if (state.mouseDown) makeWall();
    });

    return div;
  };

  const markVisited = () => {
    if (isStart || isEnd) return;
    div.classList.add("visited");
  };

  const markPath = () => {
    if (isStart) return;
    div.classList.add("path");
  };

  let gridNode: GridNode = {
    getNode,
    col,
    row,
    isStart,
    isEnd,
    distance,
    isVisited,
    markVisited,
    markPath,
    isWall,
  };

  return gridNode;
};
