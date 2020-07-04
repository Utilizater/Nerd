import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import DialogContent from '@material-ui/core/DialogContent';
import ListItem from '@material-ui/core/ListItem';
import WordLine from './WordLine';
import gql from 'graphql-tag';
import Fuse from 'fuse.js';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import ModalContent from './ModalContent';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
  boxRoot: {
    backgroundColor: theme.palette.secondary.main,
    minHeight: '100vh',
  },
  inputRoot: {
    backgroundColor: 'white',
    width: '300px',
    height: '50px',
    borderRadius: '5px',
    color: 'black',
    paddingLeft: '20px',
  },
  text: {
    color: 'white',
  },
  searchBox: {
    width: '100vh',
    height: '70px',
  },
  wordListBox: {
    width: '100vh',
    height: '70vh',
  },
  buttonRoot: {
    backgroundColor: '#ffd152',
    color: '#343233',
    textTransform: 'inherit',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#ffc31f',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    /*outline: 0,
    '&:focus': {
      outline: 0,
    },*/
  },
  dialogRoot: {
    flex: 'inherit',
    padding: 0,
    overflowY: 'unset',
  },
}));

export default () => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, modalController] = useState(false);
  const [editedWord, setEditedWord] = useState('');
  const [englishWordText, setEnglishWord] = useState('');
  const [russianWordText, setRussianWord] = useState('');

  const GET_USER = gql`
    query {
      words {
        eng_word
        ru_word
      }
    }
  `;

  const { /*loading, error,*/ data, refetch } = useQuery(GET_USER);
  const words = data ? data.words : [];

  const options = {
    keys: ['eng_word', 'ru_word'],
  };
  const fuse = new Fuse(words, options);

  const filteredWords = searchText
    ? fuse.search(searchText).map(element => (element = element.item))
    : words;

  const closeModal = () => {
    setEnglishWord('');
    setRussianWord('');
    modalController(false);
  };

  const ADD_WORD = gql`
    mutation {
      addWord(data: { eng_word: "${englishWordText}", ru_word: "${russianWordText}" }) {
        eng_word
      }
    }
  `;

  const DELETE_WORD = gql`
    mutation($eng_word: String!) {
      deleteWord(eng_word: $eng_word) {
        eng_word
      }
    }
  `;

  const EDIT_WORD = gql`
    mutation(
      $edited_eng_word: String!
      $new_eng_word: String!
      $new_ru_word: String!
    ) {
      editWord(
        edited_eng_word: $edited_eng_word
        new_eng_word: $new_eng_word
        new_ru_word: $new_ru_word
      ) {
        eng_word
      }
    }
  `;

  const checkExistingWords = checkedWord => {
    const result = words.find(word => word.eng_word === checkedWord);
    return !!result;
  };

  const [addWordHook] = useMutation(ADD_WORD);
  const [deleteWordHook] = useMutation(DELETE_WORD);
  const [editWordHook] = useMutation(EDIT_WORD);

  const modalSubmit = () => {
    if (editedWord !== '') {
      console.log(editedWord);
      console.log(englishWordText);
      console.log(russianWordText);
      editWordHook({
        variables: {
          edited_eng_word: editedWord,
          new_eng_word: englishWordText,
          new_ru_word: russianWordText,
        },
      }).then(closeModal());
      /* {
        variables: {
          eng_word: editedWord,
          data: {
            eng_word: englishWordText,
            ru_word: russianWordText,
          },
        },
      }*/
      setEditedWord('');
    } else {
      addWordHook().then(closeModal());
    }
    refetch();
  };

  const deleteWord = engWord => {
    deleteWordHook({ variables: { eng_word: engWord } }).then(closeModal());
    refetch();
  };

  const editStart = englishWord => {
    const word = words.find(word => word.eng_word === englishWord);
    //console.log(word.ru_word);
    setEditedWord(englishWord);
    setRussianWord(word.ru_word);
    setEnglishWord(word.eng_word);
    modalController(true);
  };

  return (
    <Box
      classes={{ root: classes.boxRoot }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        classes={{ root: classes.searchBox }}
        display="flex"
        alignItems="center"
        justifyContent="space-around"
      >
        <Input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          classes={{ root: classes.inputRoot }}
          placeholder="search"
          disableUnderline
        />
        <Button
          disableFocusRipple={true}
          disableRipple={true}
          disableElevation={true}
          classes={{ root: classes.buttonRoot }}
          onClick={() => modalController(true)}
        >
          Add new Word
        </Button>
      </Box>
      <Box classes={{ root: classes.wordListBox }}>
        <List>
          {filteredWords.map(element => {
            return (
              <ListItem key={element.eng_word}>
                <WordLine
                  engWord={element.eng_word}
                  ruWord={element.ru_word}
                  deleteWord={deleteWord}
                  editStart={editStart}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Modal
        className={classes.modal}
        open={isModalOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <DialogContent classes={{ root: classes.dialogRoot }}>
          <ModalContent
            setEnglishWord={setEnglishWord}
            setRussianWord={setRussianWord}
            closeModal={closeModal}
            modalSubmit={modalSubmit}
            englishWordText={englishWordText}
            russianWordText={russianWordText}
            checkExistingWords={checkExistingWords}
            editedWord={editedWord}
          />
        </DialogContent>
      </Modal>
    </Box>
  );
};
