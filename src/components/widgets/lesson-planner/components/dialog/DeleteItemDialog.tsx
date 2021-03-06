import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import DeleteIcon from '@material-ui/icons/Delete';
import { State } from '../../../../../configs/redux/store';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { LessonItem } from '../../../../../configs/models/LessonItem';
import { deleteItem } from '../../../../../services/template-builder-service';
import { displayAppDialog } from '../../../../../creators/application/app-dialog';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

const DeleteItemDialog = (props: DeleteDialogProps): JSX.Element => {
  const classes = useStyles();

  return (
    <IconButton
      edge={'end'}
      aria-label={'delete'}
      onClick={() => {
        props.displayAppDialogHandler(
          <Grid
            container
            spacing={2}
            justify={'center'}
            direction={'column'}
            style={{
              minHeight: '30vh',
            }}
            alignItems={'center'}
          >
            <Grid item>
              <Typography variant={'h6'}>
                {`Are you sure you want to delete?`}
              </Typography>
            </Grid>
          </Grid>,
          () => {
            props.deleteClickHandler(props.day, props.item);
          }
        );
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export interface DeleteDialogProps {
  day: string;
  item: LessonItem;
  deleteClickHandler: (day: string, item: LessonItem) => void;
  displayAppDialogHandler: (
    content: JSX.Element,
    clickHandler: (id: string) => void
  ) => void;
}

const mapStateToProps = (state: any): DeleteDialogProps => {
  return ({} as unknown) as DeleteDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: any
): DeleteDialogProps =>
  (({
    displayAppDialogHandler: (
      content: JSX.Element,
      clickHandler: (id: string) => void
    ) => {
      dispatch(
        displayAppDialog({
          maxWidth: 'sm',
          titleColor: '',
          content: content,
          title: '',
          confirmButtonTitle: 'Delete',
          confirmClickHandler: clickHandler,
        })
      );
    },
    deleteClickHandler: (day: string, item: LessonItem) => {
      console.log(`DELETING_ITEM_ID=${item.id}`);
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        deleteItem(day, item)
      );
    },
  } as unknown) as DeleteDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteItemDialog);
