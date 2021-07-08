console.log("%c🪐🪐🪐", "font-size: 3em; padding: 10px 0;");
console.log(
  "%c📨 hi@tauseefahmad.com",
  "color: #FFFFFF; font-weight: bold; font-size: 2em; font-family: Arial"
);

type State = {
  mouseDown: boolean;
};

function StateEventManager() {
  const subs: any = [];
  let state: State = {
    mouseDown: false,
  };

  function getState(): State {
    return state;
  }

  function subscribe(fn: (state: State) => void): State {
    subs.push(fn);
    return state;
  }

  function emit(newState: State) {
    state = newState;
    subs.map((fn: any) => fn(newState));
  }

  return { getState, subscribe, emit };
}

const mouseDownEventManager = StateEventManager();

window.onload = () => {
  const ALGOS = ["dijkstras", "bfs", "dfs"];
  let SELECTED_ALGO = ALGOS[0];
  const SPEED = 15,
    ROWS = 30,
    COLS = 60,
    START: Pair = { first: 14, second: 7 },
    END: Pair = { first: 14, second: 57 };

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

  const visualiseBtn = document.getElementById("visualise_btn");
  (visualiseBtn as HTMLButtonElement).innerText = `Visualize ${SELECTED_ALGO}`;

  visualiseBtn?.addEventListener("click", () => {
    let s: GridNode[] | undefined;

    switch (SELECTED_ALGO) {
      case "dijkstras":
        s = dijkstra(grid);
        break;
      case "dfs":
        s = dfs(grid);
        break;
    }

    s = s as GridNode[];

    for (let i = 0; i < s.length; ++i) {
      setTimeout(() => {
        (s as GridNode[])[i].markVisited();
      }, i * SPEED);
    }

    let current = s[s.length - 1];
    const start = grid.grid[START.first][START.second];
    const end = grid.grid[END.first][END.second];
    const nodesInPath: GridNode[] = [];

    if (current === end) {
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
    }
  });

  const algos_select = document.getElementById("algos");
  ALGOS.forEach((algo) => {
    const option = document.createElement("option");
    option.value = algo;
    option.innerText = algo[0].toUpperCase().concat(algo.slice(1));
    algos_select?.appendChild(option);
  });

  algos_select?.addEventListener("change", (e) => {
    SELECTED_ALGO = (e.target as HTMLInputElement)?.value;
    (visualiseBtn as HTMLButtonElement).innerText = `Visualize ${SELECTED_ALGO}`;
  });
};
