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

  const getNode = () => {
    const classes = ["node"];
    if (isStart) classes.push("start");
    if (isEnd) classes.push("end");
    div.classList.add(...classes);
    return div;
  };

  const markVisited = () => {
    if (isStart || isEnd) return;
    div.classList.add("visited");
  };

  const markPath = () => {
    if (isStart || isEnd) return;
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
  };

  return gridNode;
};
