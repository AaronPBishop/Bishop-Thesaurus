import { useState, useEffect } from 'react';

import './styles.css';
import expandMore from '../../expand_more_FILL0_wght200_GRAD0_opsz24.png';
import expandLess from '../../expand_less_FILL0_wght200_GRAD0_opsz24.png';

const imgArr = [`url(${expandMore})`, `url(${expandLess})`];

const Synonyms = ({ synonymsData }) => {
    const [clicked, setClicked] = useState(false);
    const [srcIndex, setSrcIndex] = useState(0);

    useEffect(() => {
        if (srcIndex === 2) setSrcIndex(0);
    }, [srcIndex]);

    const synonymResults = [];
    if (synonymsData.length) synonymResults.push(...synonymsData[0].meanings[0].synonyms);

    const showResults = synonymResults.map((synonym, i) => <li className='synonym-li' key={i}>- {synonym}</li>);

    return (
        <div id='synonym-results'>

            Synonyms: {synonymResults.length}

            <button 
            id='expand-synonyms' 
            style={{backgroundImage: imgArr[srcIndex]}} 
            onClick={() => {
                setClicked((isClicked) => !isClicked)
                setSrcIndex(srcIndex + 1)}}>
            </button>

            {clicked && 
            showResults}

        </div>
    );
};

export default Synonyms;