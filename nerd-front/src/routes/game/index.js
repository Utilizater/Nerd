import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import { GameCalculation } from './GameCalculation';

const useStyles = makeStyles(theme => ({
  boxRoot: {
    backgroundColor: theme.palette.secondary.main,
    minHeight: '100vh',
  },
  inputRoot: {
    backgroundColor: 'white',
    width: '300px',
    height: '100px',
    borderRadius: '10px',
  },
  inputBase: { textAlign: 'center', color: 'black' },
}));

export default () => {
  const [stage, setStage] = useState('offerWord'); //'offerWord', 'checkWord'
  const [text, setText] = useState({
    inputWord: '',
    compareWord: '',
  });
  const classes = useStyles();

  const {
    words,
    randomWordID,
    checkWord,
    submitPositive,
    submitNegative,
  } = GameCalculation();

  const submitHandle = () => {
    if (stage === 'offerWord') {
      setStage('checkWord');
    }

    if (stage === 'checkWord') {
      const result = checkWord(text.compareWord);
      if (result) {
        submitPositive();
      } else {
        submitNegative();
      }
      setStage('offerWord');
    }
    setText({ ...text, ['inputWord']: '', ['compareWord']: text.inputWord });
  };

  let message;
  if (stage === 'offerWord' && words.length !== 0)
    message = words[randomWordID].ruWord;

  if (stage === 'checkWord' && words.length !== 0) {
    message = checkWord(text.compareWord)
      ? 'Perfect!'
      : `Not ${text.compareWord}, but ${words[randomWordID].engWord}`;
  }

  if (words.length === 0) message = 'Game over';

  return (
    <Box
      classes={{ root: classes.boxRoot }}
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="space-around"
    >
      <Box width="100%">
        <Typography
          style={{
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
          }}
        >
          Count of remaining words is {words.length}
        </Typography>
      </Box>
      <Box width="100%">
        <Typography
          style={{
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
          }}
        >
          {message}
        </Typography>
      </Box>
      <Box>
        <Input
          autoFocus
          disableUnderline
          classes={{ root: classes.inputRoot, input: classes.inputBase }}
          value={text.inputWord}
          onChange={e => {
            setText({ ...text, ['inputWord']: e.target.value });
          }}
          onKeyPress={e => {
            if (e.key === 'Enter' && words.length !== 0) submitHandle();
          }}
        />
      </Box>
    </Box>
  );
};
