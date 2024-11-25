import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { clearData, fetchSwapiData } from "./store/swapiSlice";

function App() {
  const dispatch = useDispatch();
  const {
    data = [],
    loading,
    error,
  } = useSelector((state) => state.swapi || {});
  return (
    <div className="App">
      <h1>Hello</h1>

      <button onClick={() => dispatch(fetchSwapiData())}>get info</button>

      <button onClick={() => dispatch(clearData())}>clear</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data.length > 0 ? (
        data.map((item, index) => <p key={index}>{item.name}</p>)
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default App;
