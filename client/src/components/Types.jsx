import {useEffect, useState} from "react";
import axios from "axios";
import {MAIN_URL} from "../URLS";

export const Types = (props) => {
    const {handleChange, filter, disable} = props;
    const [types, setTypes] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get(`${MAIN_URL}/types`);
                setTypes(() => data);
            } catch (e) {
                setTypes(() => [{type_name: "Can´t get types"}]);
            }
        })();
    }, []);

    return (
        <select
            disabled={disable || false}
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
                <option key={type.id} value={type.type_name.toLowerCase()}>
                    {type.type_name}
                </option>
            ))}
        </select>
    );
};
