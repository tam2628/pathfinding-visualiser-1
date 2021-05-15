window.onload = () => {
  console.log("This is a pathfinding visualiser project!");

  const ALGOS = ["dijkstras", "bfs", "dfs"];

  let SELECTED_ALGO = ALGOS[0];

  const ROWS = 30,
    COLS = 50,
    START: Pair = { first: 14, second: 7 },
    END: Pair = { first: 14, second: 42 };

  const grid: Grid = GridFactory(ROWS, COLS, START, END);

  document.getElementById("root")?.appendChild(grid.getGrid());
  document.getElementById("visualise_btn")?.addEventListener("click", () => {
    const s = dijkstra(grid);

    for (let i = 0; i < s.length; ++i) {
      setTimeout(() => {
        s[i].markVisited();
      }, i * 15);
    }

    let current = s[s.length - 1];
    const start = grid.grid[START.first][START.second];
    const nodesInPath: GridNode[] = [];
    while (current !== start) {
      nodesInPath.push(current);
      if (current.previous) current = current.previous as GridNode;
    }
    nodesInPath.reverse();

    const wait = s.length * 15;

    for (let i = 0; i < nodesInPath.length; ++i) {
      setTimeout(() => {
        nodesInPath[i].markPath();
      }, wait + (i + 1) * 15);
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
