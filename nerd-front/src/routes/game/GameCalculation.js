import { useState, useEffect } from 'react';
import client from '../../ApolloClient';
import gql from 'graphql-tag';

const ATTEMPT_COUNT = 3;

export const GameCalculation = () => {
  useEffect(() => {
    client
      .query({
        query: gql`
          query {
            words {
              eng_word
              ru_word
            }
          }
        `,
      })
      .then(result => {
        const arr = [];
        result.data.words.map(element => {
          arr.push({
            engWord: element.eng_word,
            ruWord: element.ru_word,
            attemptCount: 1,
          });
        });
        setWords(arr);
        changeRandomWordID(getRandomWordID(arr));
      });
  }, []);

  const [words, setWords] = useState([]);
  const [randomWordID, changeRandomWordID] = useState(0);

  const getRandomWordID = words => {
    return Math.floor(Math.random() * words.length);
  };

  const checkWord = text => {
    return text.toLowerCase() === words[randomWordID].engWord.toLowerCase();
  };

  const submitPositive = () => {
    if (words[randomWordID].attemptCount === 1) {
      const arr = removeWord(randomWordID);
      setWords([...arr]);
      changeRandomWordID(getRandomWordID(arr));
    } else {
      const arr = words;
      arr[randomWordID].attemptCount--;
      setWords([...arr]);
      changeRandomWordID(getRandomWordID(arr));
    }
  };

  const submitNegative = () => {
    const arr = words;
    arr[randomWordID].attemptCount = ATTEMPT_COUNT;
    setWords([...arr]);
    changeRandomWordID(getRandomWordID(arr));
  };

  const removeWord = id => {
    const arr = [...words];
    arr.splice(id, 1);
    return arr;
  };

  return {
    words,
    randomWordID,
    checkWord,
    submitNegative,
    submitPositive,
  };
};
