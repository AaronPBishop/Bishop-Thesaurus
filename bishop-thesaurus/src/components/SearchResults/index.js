import { useCallback, useEffect, useState } from 'react';
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
    }, [wordContext]);

    return (
        <div id='results-area'>
            <div id='display-word'>
                Word: {wordContext}
            </div>
            
            <div id='definition-results'>
                <Definitions definitionsData={data}/>
            </div>

            <div id='synonym-results'>
                <Synonyms synonymsData={data} />
            </div>

            <div id='antonym-results'>
                <Antonyms antonymsData={data}/>
            </div>
        </div>
    );
};

export default SearchResults;