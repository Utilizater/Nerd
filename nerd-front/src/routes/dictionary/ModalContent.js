import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  paper: {
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '300px',
    height: '300px',
  },
  modalInputs: {
    backgroundColor: 'white',
    color: 'black',
  },
});

const ModalContent = ({
  setEnglishWord,
  setRussianWord,
  closeModal,
  modalSubmit,
  englishWordText,
  russianWordText,
  checkExistingWords,
  editedWord,
}) => {
  const [englishTextError, setEnglishTextError] = useState(false);
  const [russianTextError, setRussianTextError] = useState(false);
  const [errorEngText, setErrorEngText] = useState('');
  const classes = useStyles();
  const preSubmit = () => {
    let checkResult = true;
    if (englishWordText === '') {
      setEnglishTextError(true);
      setErrorEngText("can't be empty");
      checkResult = false;
    }
    if (russianWordText === '') {
      setRussianTextError(true);
      checkResult = false;
    }
    if (checkExistingWords(englishWordText) && !editedWord) {
      setEnglishTextError(true);
      setErrorEngText('already exist');
      checkResult = false;
    }

    if (checkResult) modalSubmit();
  };
  return (
    <Box
      className={classes.paper}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-around"
    >
      <Box>
        <TextField
          error={englishTextError}
          id="standard-error-helper-text"
          placeholder="english word"
          value={englishWordText}
          helperText={englishTextError ? errorEngText : null}
          InputProps={{
            className: classes.modalInputs,
          }}
          onChange={e => {
            setEnglishWord(e.target.value);
            if (englishTextError) setEnglishTextError(false);
          }}
        />
      </Box>
      <Box>
        <TextField
          error={russianTextError}
          id="standard-error-helper-text"
          placeholder="russian word"
          value={russianWordText}
          helperText={russianTextError ? "can't be empty" : null}
          InputProps={{
            className: classes.modalInputs,
          }}
          onChange={e => {
            setRussianWord(e.target.value);
            if (russianTextError) setRussianTextError(false);
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') preSubmit();
          }}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        width="100%"
      >
        <IconButton onClick={closeModal}>
          <CloseIcon />
        </IconButton>
        <IconButton onClick={preSubmit}>
          <CheckIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ModalContent;
