import actions from './actions';
import { PlannerItem, PlannerItems } from '../configs/types/WeeklyPlanner';

export const reorderPlannerItems = (
  items: PlannerItem[],
  dayOfWeek: string
): ReorderItemsAction => {
  return {
    type: actions.REORDER_WEEKLY_PLANNER,
    items: items,
    dayOfWeek: dayOfWeek,
  };
};

export interface ReorderItemsAction {
  type: string;
  items: PlannerItem[];
  dayOfWeek: string;
}

export const updatePlannerItems = (items: PlannerItems): UpdateItemsAction => {
  return {
    type: actions.MOVE_PLANNER_ITEMS,
    items: items,
  };
};

export interface UpdateItemsAction {
  type: string;
  items: PlannerItems;
}
