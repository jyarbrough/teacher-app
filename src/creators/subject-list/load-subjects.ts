import actions from '../actions';
import { AnyAction } from 'redux';
import { Subject } from '../../configs/types/Subject';

export const loadSubjectList = (subjectList: Subject[]): AnyAction => {
  return {
    type: actions.LOAD_SUBJECT_LIST,
    subjectList: subjectList,
  };
};
