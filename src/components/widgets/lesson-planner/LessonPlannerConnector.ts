import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../configs/redux/store';
import { LessonWeekdays } from '../../../configs/types/LessonPlanner';
import LessonPlannerComp, { LessonPlannerProps } from './LessonPlanner';
import { reorderPlannerItems } from '../../../creators/lesson-planner/reorder-items';
import { movePlannerItems } from '../../../creators/lesson-planner/move-items';
import { lessonBoardChanged } from '../../../creators/lesson-planner/lesson-board-changed';
import { LessonItem } from '../../../configs/models/LessonItem';

const mapStateToProps = (state: State): LessonPlannerProps => {
  const lessons = state.lessonPlannerState.lessonPlanners;

  const selectedPlanner =
    lessons &&
    lessons.find((planner) => {
      return planner.id === state.lessonPlannerState.selectedLessonId;
    });

  return ({
    selectedPlanner: selectedPlanner,
    subjectList: state.subjectListState.subjectList,
    templateBuilder: state.lessonPlannerState.templateBuilder,
  } as unknown) as LessonPlannerProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: any
): LessonPlannerProps =>
  (({
    reorderHandler: (items: LessonItem[], dayOfWeek: string) => {
      dispatch(reorderPlannerItems(items, dayOfWeek, ownProps.isTemplate));
      dispatch(lessonBoardChanged());
    },
    moveHandler: (days: LessonWeekdays) => {
      dispatch(movePlannerItems(days, ownProps.isTemplate));
      dispatch(lessonBoardChanged());
    },
  } as unknown) as LessonPlannerProps);

export default connect(mapStateToProps, mapDispatchToProps)(LessonPlannerComp);
