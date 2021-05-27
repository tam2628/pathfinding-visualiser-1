window.onload = () => {
  console.log("This is a pathfinding visualiser project!");

  const ALGOS = ["dijkstras", "bfs", "dfs"];
  let SELECTED_ALGO = ALGOS[0];

  const SPEED = 15;

  const ROWS = 30,
    COLS = 50,
    START: Pair = { first: 14, second: 7 },
    END: Pair = { first: 14, second: 3 };

  let grid: Grid = GridFactory(ROWS, COLS, START, END);
  const root = document.getElementById("root");
  root?.appendChild(grid.getGrid());

  function reset() {
    grid = GridFactory(ROWS, COLS, START, END);
    root?.removeChild(root?.lastElementChild as HTMLElement);
    root?.appendChild(grid.getGrid());
  }

  document.getElementById("reset_btn")?.addEventListener("click", () => {
    reset();
  });

  document.getElementById("visualise_btn")?.addEventListener("click", () => {
    reset();
    let s: GridNode[];

    // switch (SELECTED_ALGO) {
    //   case "dijkstras":
    //     s = dijkstra(grid);
    //     break;
    //   case "dfs":
    //     s = dfs(grid);
    //     break;
    // }

    s = dfs(grid);

    console.log(s.length);

    for (let i = 0; i < s.length; ++i) {
      setTimeout(() => {
        s[i].markVisited();
      }, i * SPEED);
    }

    let current = s[s.length - 1];
    const start = grid.grid[START.first][START.second];
    const nodesInPath: GridNode[] = [];
    while (current !== start) {
      nodesInPath.push(current);
      if (current.previous) current = current.previous as GridNode;
    }
    nodesInPath.reverse();

    const wait = s.length * SPEED;

    for (let i = 0; i < nodesInPath.length; ++i) {
      setTimeout(() => {
        nodesInPath[i].markPath();
      }, wait + (i + 1) * SPEED);
    }
  });

  const algos_select = document.getElementById("algos");
  ALGOS.forEach((algo) => {
    const option = document.createElement("option");
    option.value = algo;
    option.innerText = algo;
    algos_select?.appendChild(option);
  });
  algos_select?.addEventListener(
    "change",
    (e) => (SELECTED_ALGO = (e.target as HTMLInputElement)?.value)
  );
};
