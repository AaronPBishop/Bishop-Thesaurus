import { useState, useEffect } from 'react';
import { useWordContext } from '../../context/WordContext.js'; 
import { Link } from 'react-router-dom';

import './styles.css';
import expandMore from '../../expand_more_FILL0_wght200_GRAD0_opsz24.png';
import expandLess from '../../expand_less_FILL0_wght200_GRAD0_opsz24.png';

const imgArr = [`url(${expandMore})`, `url(${expandLess})`];

const Anagrams = () => {
    const { wordContext, setWordContext } = useWordContext();

    const [currAnagrams, setCurrAnagrams] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [srcIndex, setSrcIndex] = useState(0);

    useEffect(() => {
        const myAnagrams = [];

        const hasDuplicates = (str) => {
            const letters = {};
            str.split('').forEach(letter => {
                if (letters[letter] !== undefined) letters[letter]++;
                if (letters[letter] === undefined) letters[letter] = 1;
            });
        
            for (let key in letters) if (letters[key] > 1) return letters;
        
            return false;
        };
        
        const numPermutations = (str) => {
            if (hasDuplicates(str) === false) {
                let multiplier = 1;
        
                for (let i = 1; i <= str.length; i++) multiplier *= i;
        
                return multiplier;
            };
        
            const letters = hasDuplicates(str);
            let multiplier = 1;
            let divisor = 1;
            let visited = new Set();
        
            for (let i = 1; i <= str.length; i++) {
                let currLetter = str[i];
        
                if (letters[currLetter] > 1 && !visited.has(currLetter)) {
                    for (let j = 1; j <= letters[currLetter]; j++) divisor *= j;
                    visited.add(currLetter);
                };
        
                multiplier *= i;
            };
        
            return (multiplier / divisor);
        };
        
        const permutations = (string, finalArray = [], i = 0, visited = new Set()) => {
            if (string.length === 2) {
                if (string.split('')[0] === string.split('')[1]) {
                    finalArray.push(string);
                    return finalArray;
                };
            };
        
            if (string.length <= 2 && finalArray.length === string.length) return finalArray;
        
            const maxPermutations = numPermutations(string);
            if (i === maxPermutations) {
                myAnagrams.push(...finalArray)
                return;
            };
        
            const splitString = string.split('');
        
            for (let i = splitString.length - 1; i > 0; i--) {
                let randNum = Math.floor(Math.random() * (i + 1));
                let replacement = splitString[i];
        
                splitString[i] = splitString[randNum];
                splitString[randNum] = replacement;
            };
        
            if (!visited.has(splitString.join(''))) {
                finalArray.push(splitString.join(''));
                visited.add(splitString.join(''));
        
                return permutations(string, finalArray, i += 1, visited);
            };
        
            return permutations(string, finalArray, i, visited);
        };

        if (wordContext.length < 6) {
            permutations(wordContext);
            setCurrAnagrams(myAnagrams);
        };
    }, [wordContext]);

    useEffect(() => {
        if (srcIndex === 2) setSrcIndex(0);
    }, [srcIndex]);

    useEffect(() => {
        setClicked(false);
        setSrcIndex(0);
    }, [wordContext]);

    const showResults = currAnagrams.sort().map((anagram, i) => <Link 
    to={`/${anagram}`} 
    className='anagram-li' 
    key={i}
    onClick={() => setWordContext(anagram)}>{anagram}</Link>);

    return (
        <div>

            {
                wordContext.length < 6 ?
                <div id='anagram-results'>
                    <p>Anagrams:</p>
                    <button 
                    id='expand-anagrams' 
                    style={{backgroundImage: imgArr[srcIndex]}} 
                    onClick={() => {
                    setClicked((isClicked) => !isClicked)
                    setSrcIndex(srcIndex + 1)}}>
                </button>
                </div> :
                <p id='no-anagrams'>No anagrams to show here!</p>
            }

            {
                clicked && 
                showResults
            }

        </div>
    );
};

export default Anagrams;