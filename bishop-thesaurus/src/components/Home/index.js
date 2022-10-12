import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import libraryIcon from '../../local_library_FILL0_wght400_GRAD200_opsz48.png';

import { useWordContext } from '../../context/WordContext.js'; 

const Home = () => {
    const [word, setWord] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const { setWordContext } = useWordContext();

    useEffect(() => {
        const errorsArr = [];
        let input = word.split('');
    
        for (let letter of input) {if (!letter.match(/[A-Za-z]/)) errorsArr.push('You entered an invalid character. Please check your spelling.')};

        setErrors(errorsArr);

    }, [word]);

    const handleSubmit = e => {
        e.preventDefault();

        setWordContext(word);
        history.push(`/${word}`);
        setWord('');
    };

    const errMsg = (<center><p id='err-msg'>{errors[0]}</p></center>);

    return (
        <div id='main'>

            <div id='home'>
                <img src={libraryIcon} alt="library-icon" id="header-icon"></img>
                <h1>Bishop Thesaurus</h1>
            </div>

            {errors.length > 0 &&
            errMsg}

            <form id='search-form' onSubmit={handleSubmit}>

                <label htmlFor='search'>

                    <input 
                    type='text' 
                    id='search-bar' 
                    placeholder="Find a definition" 
                    value={word} 
                    onChange={e => setWord(e.target.value)}>
                    </input>

                    <button type='submit' id='make-search' disabled={errors.length > 0}></button>

                </label>

            </form>

        </div>
    )
};
export default Home;