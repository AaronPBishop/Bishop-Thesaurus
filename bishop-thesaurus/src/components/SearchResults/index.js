import { useEffect, useState } from 'react';
import { useWordContext } from "../../context/WordContext";
import { useHistory } from 'react-router-dom';

import './styles.css';
import Definitions from '../Definitions/index.js';
import Synonyms from '../Synonyms/index.js';
import Antonyms from '../Antonyms/index.js';
import Anagrams from '../Anagrams';

const SearchResults = () => {
    const { wordContext } = useWordContext();
    const [data, setData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const makeSearch = async () => {
            try {
                const fetchRequest = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordContext}`);

                const fetchJSON = await fetchRequest.json();

                setData([...fetchJSON]);
            } catch (e) {
                history.push('/error');
            };
        };

        makeSearch();
    }, [wordContext]);

    return (
        <div id='results-area'>
            <div id='display-word'>
                <p className='header' style={{position: 'relative', top: '10px'}}>Word: {wordContext}</p>
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

            <div id='anagram-results'>
                <Anagrams />
            </div>
        </div>
    );
};

export default SearchResults;