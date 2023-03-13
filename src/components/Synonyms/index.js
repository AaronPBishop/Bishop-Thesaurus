import { useState, useEffect } from 'react';
import { useWordContext } from '../../context/WordContext.js';

import './styles.css';
import expandMore from '../../expand_more_FILL0_wght200_GRAD0_opsz24.png';
import expandLess from '../../expand_less_FILL0_wght200_GRAD0_opsz24.png';

const imgArr = [`url(${expandMore})`, `url(${expandLess})`];

const Synonyms = ({ synonymsData }) => {
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

    const synonymResults = [];
    if (synonymsData.length) synonymResults.push(...synonymsData[0].meanings[0].synonyms);

    const showResults = synonymResults.map((synonym, i) => <li className='synonym-li' key={i}>- {synonym}</li>);

    return (
        <div id='synonym-results'>

            <div
            style={{
                display: 'flex',
                justifyContent: synonymResults.length >= 1 ? 'space-between' : 'center',
                width: '10vw'
            }}>
                <p className='header'>Synonyms: {synonymResults.length}</p>

                {
                    synonymResults.length >= 1 ?

                    <button 
                    id='expand-synonyms' 
                    style={{backgroundImage: imgArr[srcIndex], cursor: 'pointer'}} 
                    onClick={() => {
                        setClicked((isClicked) => !isClicked)
                        setSrcIndex(srcIndex + 1)}}>
                    </button> :
                    showResults   
                }
            </div>

            {
                clicked && 
                showResults
            }

        </div>
    );
};

export default Synonyms;