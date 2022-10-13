import { useState, useEffect } from 'react';

import './styles.css';
import expandMore from '../../expand_more_FILL0_wght200_GRAD0_opsz24.png';
import expandLess from '../../expand_less_FILL0_wght200_GRAD0_opsz24.png';

const imgArr = [`url(${expandMore})`, `url(${expandLess})`];

const Definitions = ({ definitionsData }) => {
    const [clicked, setClicked] = useState(false);
    const [srcIndex, setSrcIndex] = useState(0);

    useEffect(() => {
        if (srcIndex === 2) setSrcIndex(0);
    }, [srcIndex]);

    const definitionResults = [];
    if (definitionsData.length) definitionResults.push(...definitionsData[0].meanings[0].definitions);

    const showResults = definitionResults.map((definition, i) => <li className='definition-li' key={i}>- {definition.definition}</li>);

    return (
        <div id='definition-results'>

            Definitions: {definitionResults.length}

            {
                definitionResults.length > 1 ?
                
                 <button 
                 id='expand-definitions' 
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

export default Definitions;