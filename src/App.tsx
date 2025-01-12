import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="line-clamp-2 text-red-900">Vite + React</h1>
      <div className="card top-2 bg-red-300 px-2 placeholder-zinc-50">
        <Button
          variant="destructive"
          onClick={() => setCount((count) => count + 1)}
        >
          Click me. Count is {count}
        </Button>
      </div>
    </>
  );
}

export default App;
