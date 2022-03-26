import {useEffect, useState} from "react";
import axios from "axios";

export const Types = (props) => {
  const {handleChange, filter, disable} = props;
  const [types, setTypes] = useState([]);
  useEffect(() => {
    (async () => {
      const {data} = await axios.get("http://localhost:3001/types");
      setTypes(() => data);
    })();
  }, []);
  return (
    <select
      disabled={disable}
      name="types"
      onChange={(e) => handleChange(e)}
      defaultValue={filter ? "Filter by type" : "Select type/s"}
    >
      {filter ? (
        <option value={"reset"}>Filter by type</option>
      ) : (
        <option disabled={true}>Select type/s</option>
      )}
      {types.map((type) => (
        <option key={type.id} value={type.type_name}>
          {type.type_name}
        </option>
      ))}
    </select>
  );
};
