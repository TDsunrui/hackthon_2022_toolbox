import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Bar from "./pages/bar";

import './global.scss';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="root-container">
        <Bar />
      </div>
    </DndProvider>
  );
}

export default App;
