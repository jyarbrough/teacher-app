import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import AddIcon from '@material-ui/icons/Add';
import { Fab, Tooltip } from '@material-ui/core';
import {
  editTemplate,
  saveNewTemplate,
} from '../../../../../services/template-builder-service';
import { State } from '../../../../../configs/redux/store';
import TemplateBuilderForm from '../lesson-form/TemplateBuilderForm';
import { displayAppDialog } from '../../../../../creators/application/app-dialog';

const NewTemplateButton = (props: NewTemplateButtonProps): JSX.Element => {
  return (
    <Tooltip title={'Add New'}>
      <Fab
        color={'primary'}
        onClick={() => {
          props.displayAppDialogHandler(
            <TemplateBuilderForm />,
            props.isNewTemplate
          );
        }}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export interface NewTemplateButtonProps {
  displayAppDialogHandler: (
    content: JSX.Element,
    isNewTemplate: boolean
  ) => void;
  isNewTemplate: boolean;
}

const mapStateToProps = (state: State): NewTemplateButtonProps => {
  return ({
    isNewTemplate: Boolean(!state.lessonPlannerState.templateBuilder),
  } as unknown) as NewTemplateButtonProps;
};

const mapDispatchToProps = (dispatch: Dispatch): NewTemplateButtonProps =>
  (({
    displayAppDialogHandler: (content: JSX.Element, isNewTemplate: boolean) => {
      dispatch(
        displayAppDialog({
          maxWidth: 'sm',
          titleColor: '#3baafc',
          content: content,
          title: 'Add Class to Template',
          confirmButtonTitle: 'Add Class',
          confirmClickHandler: async () => {
            if (isNewTemplate) {
              (dispatch as ThunkDispatch<State, void, AnyAction>)(
                saveNewTemplate()
              );
            } else {
              (dispatch as ThunkDispatch<State, void, AnyAction>)(
                editTemplate()
              );
            }
          },
        })
      );
    },
  } as unknown) as NewTemplateButtonProps);

export default connect(mapStateToProps, mapDispatchToProps)(NewTemplateButton);
