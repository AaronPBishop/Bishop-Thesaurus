import { useEffect, useState } from 'react';
import { useWordContext } from "../../context/WordContext";

import './styles.css';
import Definitions from '../Definitions/index.js';
import Synonyms from '../Synonyms/index.js';
import Antonyms from '../Antonyms/index.js';

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
    }, [data]);

    console.log(data)

    return (
        <div id='results-area'>
            Word: {wordContext}
            <Definitions definitionsData={data[0].meanings[0].definitions} />
            <Synonyms synonymsData={data[0].meanings[0].synonyms} />
            <Antonyms antonymsData={data[0].meanings[0].antonyms} />
        </div>
    );
};

export default SearchResults;