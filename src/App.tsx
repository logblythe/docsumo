import "./App.css";
import BoundingBoxOnImage from "./BoundingBoxOnImage";
import RightBar from "./components/RightBar";

function App() {
  const coordinate1 = {
    x: 110,
    y: 483,
    width: 283,
    height: 499,
  };

  const coordinate2 = {
    x: 319,
    y: 170,
    width: 456,
    height: 195,
  };

  const coordinate3 = {
    x: 1409,
    y: 133,
    width: 1538,
    height: 187,
  };

  const coordinate4 = {
    x: 748,
    y: 1356,
    width: 820,
    height: 1371,
  };

  return (
    <div className="h-screen w-auto grid grid-cols-3">
      <div className="col-span-2">
        <BoundingBoxOnImage
          coordinates={[coordinate1, coordinate2, coordinate3, coordinate4]}
        />
      </div>
      <div className="col-span-1">
        <RightBar />
      </div>
    </div>
  );
}

export default App;
