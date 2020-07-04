import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  removeButton: {
    right: '50px',
  },
  iconButtonRoot: {
    color: '#efdab9',
  },
  checkboxIn: { backgroundColor: 'white' },
  checkboxOut: {},
  checkboxRoot: {
    color: theme.palette.text.secondary,
  },
}));

const WordLine = ({ engWord, ruWord, deleteWord, editStart }) => {
  const classes = useStyles();
  return (
    <>
      <Box>
        <Typography
          style={{ color: '#efdab9', fontWeight: 'bold', fontSize: 20 }}
        >
          {engWord}
        </Typography>
        <Typography color="textPrimary">{ruWord}</Typography>
      </Box>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="edit"
          classes={{ root: classes.iconButtonRoot }}
          onClick={() => editStart(engWord)}
        >
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
      <ListItemSecondaryAction classes={{ root: classes.removeButton }}>
        <IconButton
          edge="end"
          aria-label="delete"
          classes={{ root: classes.iconButtonRoot }}
          onClick={() => deleteWord(engWord)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  );
};

export default WordLine;
