import "./App.css";
import Select from "react-select";
import { useEffect, useState } from "react";

function App() {
  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];
  const [selectedOption, setSelectedOption] = useState([]);
  const [userSelect, setUserSelect] = useState("");
  const [isShow, setIsShow] = useState(false);
  const getBerries = async() => {
    const berries = await fetch("https://pokeapi.co/api/v2/berry/");
    const value = await berries.json();
    const result = value.results.map((data) => {
      return{
        label: data.name,
        value: data.name
      }
    })
    setSelectedOption(result.sort((a,b) => a.label.localeCompare(b.label)))
  }
  useEffect(() => {
    getBerries()
  },[])
  const handleSubmit = () => {
    setIsShow(state => !state);
  }
  const handleChange = (value) => {
    setUserSelect(value)
  }
  return (
    <div className="App">
      <h1>{isShow ? userSelect : ""}</h1>
      <button onClick={() => handleSubmit()} disabled={!userSelect}>{isShow ? "Hide Button" : "Show Value"}</button>
      <Select
        options={selectedOption}
        onChange={(event) => handleChange(event.value)}
        // onChange={setSelectedOption}
        // options={options}
      />
    </div>
  );
}

export default App;
