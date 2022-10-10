import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import libraryIcon from '../../local_library_FILL0_wght400_GRAD200_opsz48.png';

import { useWordContext } from '../../context/WordContext.js'; 

const Home = () => {
    const [word, setWord] = useState('');
    const history = useHistory();

    const { setWordContext } = useWordContext();

    const handleSubmit = e => {
        e.preventDefault();

        setWordContext(word);
        history.push(`/${word}`);
        setWord('');
    };

    return (
        <div id='main'>

            <div id='home'>
                <img src={libraryIcon} alt="library-icon" id="header-icon"></img>
                <h1>Bishop Thesaurus</h1>
            </div>

            <form id='search-form' onSubmit={handleSubmit}>

                <label htmlFor='search'>

                    <input 
                    type='text' 
                    id='search-bar' 
                    placeholder="Find a definition" 
                    value={word} 
                    onChange={e => setWord(e.target.value)}>
                    </input>

                    <button type='submit' id='make-search'></button>

                </label>

            </form>

        </div>
    )
};
export default Home;