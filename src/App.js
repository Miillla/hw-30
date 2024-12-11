import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { clearData, fetchSwapiData } from "./store/swapiSlice";

function App() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.swapi);
  const person = data[0];
  console.log(data);
  return (
    <div className="app-container">
      <div className="app-header">
        <h1>SWAPI</h1>
      </div>
      <div className="app-content ">
        <div className="form-group">
          <div className="input-group">
            <input
              className="input-group-text"
              id="basic-addon3"
              placeholder="https://swapi.dev/api/people/"
            />
            <input
              type="text"
              className="form-control"
              id="basic-url"
              placeholder="Enter SWAPI endpoint"
              aria-describedby="basic-addon3 basic-addon4"
            />
            <button
              onClick={() => dispatch(fetchSwapiData())}
              className="btn btn-secondary"
              disabled={loading}
            >
              Get Info
            </button>
          </div>
        </div>

        <div className="border p-3 m-2">
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {person ? (
            <>
              <p>Name: {person.name}</p>
              <p>Height: {person.height}</p>
              <p>Mass: {person.mass}</p>
              <p>Hair Color: {person.hair_color}</p>
              <p>Skin Color: {person.skin_color}</p>
            </>
          ) : (
            // <p>{JSON.stringify(data, null, 2)}</p>
            <p>No data available</p>
          )}
        </div>
        <button
          onClick={() => dispatch(clearData())}
          className="btn btn-warning"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
