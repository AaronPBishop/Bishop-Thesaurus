import { useState } from 'react';

import './styles.css';

const Definitions = ({ definitionsData }) => {
    const [clicked, setClicked] = useState(false);

    let definitionResults = [];

    if (definitionsData.length) {
        definitionResults.push(...definitionsData[0].meanings[0].definitions);
    };

    const showResults = definitionResults.map((definition, i) => <li className='definition-li' key={i}>{definition.definition}</li>);

    return (
        <div id='definition-results'>
            Definitions: {definitionResults.length}
            <button onClick={() => setClicked((isClicked) => !isClicked)}>Definitions</button>
            {clicked && 
            showResults}
        </div>
    );
};

export default Definitions;