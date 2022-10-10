import { useEffect, useState } from 'react';
import { useWordContext } from "../../context/WordContext";

const SearchResults = () => {
    const { wordContext } = useWordContext();
    const [data, setData] = useState([]);

    useEffect(() => {
        const makeSearch = async () => {
            const fetchRequest = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordContext}`);
            const fetchJSON = await fetchRequest.json();

            setData([...fetchJSON]);
        };

        makeSearch();
    }, [data])

    return (
        <div>
            {wordContext}
            <p>{data[0].meanings[0].synonyms}</p>
        </div>
    )
};

export default SearchResults;