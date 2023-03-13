import { useState, useEffect } from 'react';
import { useWordContext } from '../../context/WordContext.js';

import './styles.css';
import expandMore from '../../expand_more_FILL0_wght200_GRAD0_opsz24.png';
import expandLess from '../../expand_less_FILL0_wght200_GRAD0_opsz24.png';

const imgArr = [`url(${expandMore})`, `url(${expandLess})`];

const Antonyms = ({ antonymsData }) => {
    const { wordContext } = useWordContext();
    
    const [clicked, setClicked] = useState(false);
    const [srcIndex, setSrcIndex] = useState(0);

    useEffect(() => {
        if (srcIndex === 2) setSrcIndex(0);
    }, [srcIndex]);

    useEffect(() => {
        setClicked(false);
        setSrcIndex(0);
    }, [wordContext]);

    const antonymResults = [];
    if (antonymsData.length) antonymResults.push(...antonymsData[0].meanings[0].antonyms);

    const showResults = antonymResults.map((antonym, i) => <li className='antonym-li' key={i}>- {antonym}</li>);

    return (
        <div id='antonym-results'>

            <p className='header'>Antonyms: {antonymResults.length}</p>

            {
                antonymResults.length > 1 ? 
                <button 
                id='expand-antonyms' 
                style={{backgroundImage: imgArr[srcIndex]}} 
                onClick={() => {
                    setClicked((isClicked) => !isClicked)
                    setSrcIndex(srcIndex + 1)}}>
                </button> :
                showResults
            }

            {
                clicked && 
                showResults
            }

        </div>
    );
};

export default Antonyms;