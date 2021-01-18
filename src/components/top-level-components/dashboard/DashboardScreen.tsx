import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Styles } from '@material-ui/styles';
import LessonPlannerCard from './lesson-planner-card/LessonPlannerCard';
import TopicLinksWidget from '../../widgets/topic-links/TopicLinksWidget';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class DashboardScreen extends Component<DashboardScreenProps> {
  render(): JSX.Element {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TopicLinksWidget />
        </Grid>

        <Grid item xs={6}>
          <LessonPlannerCard />
        </Grid>
      </Grid>
    );
  }
}

export type DashboardScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(DashboardScreen);