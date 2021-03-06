import React from 'react';
import {
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import NewLessonButton from '../dialog/NewLessonButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
  })
);

export default function PlannerControls(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems={'center'}
      justify={'space-between'}
      className={classes.root}
    >
      <Grid item xs={6}>
        <Grid container alignItems={'center'} spacing={2}>
          <Grid item>
            <Button variant={'contained'} color={'secondary'}>
              <ArrowBack />
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: '0 8px 8px 8px' }}>
              <FormControl style={{ width: '100%' }}>
                <InputLabel id={'current-week'}>{'Current Week'}</InputLabel>
                <Select labelId={'current-week'} id={'current-week'}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>

          <Grid item>
            <Button variant={'contained'} color={'secondary'}>
              <ArrowForward />
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <NewLessonButton />
      </Grid>
    </Grid>
  );
}
