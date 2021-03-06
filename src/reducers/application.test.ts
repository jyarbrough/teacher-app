import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import application from './application';
import actions from '../creators/actions';

describe('Application Reducer', () => {
  it('should return DISPLAY_APP_SNACKBAR action', () => {
    const snackbarProps = {
      text: uuidv4(),
      severity: uuidv4(),
      position: {
        vertical: uuidv4(),
        horizontal: uuidv4(),
      },
    };

    const state = application.reducer(undefined, {
      type: actions.DISPLAY_APP_SNACKBAR,
      snackbarProps: snackbarProps,
    });

    expect(state.displayAppSnackbar).toEqual(true);
    expect(state.snackbarProps).toEqual(snackbarProps);
  });

  it('should return HIDE_APP_SNACKBAR action', () => {
    const state = application.reducer(undefined, {
      type: actions.HIDE_APP_SNACKBAR,
    });

    expect(state.displayAppSnackbar).toEqual(false);
  });

  it('should return DISPLAY_APP_DIALOG action', () => {
    const state = application.reducer(undefined, {
      type: actions.DISPLAY_APP_DIALOG,
      maxWidth: 'xs',
      titleColor: 'testing-color',
      content: React.createElement('p'),
      title: 'Testing title',
      buttonTitle: 'Test Button',
      clickHandler: Function,
    });

    expect(state.displayAppDialog).toEqual(true);
    expect(state.dialogContent).toEqual(React.createElement('p'));
    expect(state.dialogWidth).toEqual('xs');
    expect(state.dialogTitleColor).toEqual('testing-color');
    expect(state.dialogTitle).toEqual('Testing title');
    expect(state.confirmButtonTitle).toEqual('Test Button');
    expect(state.confirmClickHandler).toEqual(Function);
  });

  it('should return CLOSE_APP_DIALOG action', () => {
    const state = application.reducer(undefined, {
      type: actions.CLOSE_APP_DIALOG,
    });

    expect(state.displayAppDialog).toEqual(false);
  });

  it('should return CLEAR_APP_DIALOG action', () => {
    const state = application.reducer(undefined, {
      type: actions.CLEAR_APP_DIALOG,
    });

    expect(state.dialogContent).toEqual(React.createElement(React.Fragment));
    expect(state.dialogWidth).toEqual('xs');
    expect(state.dialogTitleColor).toEqual('');
    expect(state.dialogTitle).toEqual('');
    expect(state.confirmButtonTitle).toEqual('');
    expect(state.confirmClickHandler).toEqual(null);
  });

  it('should return empty object', () => {
    const state = application.reducer(undefined, {
      type: 'TESTING',
    });

    expect(state).toEqual({});
  });
});
