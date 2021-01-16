import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import { closeNewLinkDialog } from '../creators/topic-links/links-dialog';
import { displayAppSnackbar } from '../creators/application/app-snackbar';
import { NewLinkForm } from '../components/widgets/topic-links/components/NewLinkDialog';

export const saveLinkInfo = (
  link: NewLinkForm
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch,
  getState: () => State
): Promise<void> => {
  const linkRef = firebase.database().ref('/links');
  const newLinkRef = linkRef.push();

  return await newLinkRef.set(
    {
      id: uuidv4(),
      linkUrl: link.linkUrl,
      linkTitle: link.linkTitle,
      subjectId: link.subjectId,
    },
    (error) => {
      if (error) {
        // todo: dispatch error snackbar
      } else {
        dispatch(
          displayAppSnackbar({
            text: 'Link Saved',
            severity: 'success',
            position: {
              vertical: 'bottom',
              horizontal: 'left',
            },
          })
        );
        setTimeout(() => {
          dispatch(closeNewLinkDialog());
        }, 1000);
      }
    }
  );
};

export const deleteLink = (
  id: string
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch,
  getState: () => State
): Promise<void> => {
  return await firebase
    .database()
    .ref('/links')
    .child(id)
    .remove((error) => {
      if (error) {
        // todo: dispatch error snackbar
      } else {
        dispatch(
          displayAppSnackbar({
            text: 'Deleted Link',
            severity: 'success',
            position: {
              vertical: 'bottom',
              horizontal: 'left',
            },
          })
        );
      }
    });
};

export interface UpdateLinkProps {
  firebaseId: string;
  linkUrl: string;
  linkTitle: string;
  subjectId: string;
}

export const updateLink = (
  updateLink: UpdateLinkProps
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch,
  getState: () => State
): Promise<void> => {
  return await firebase
    .database()
    .ref('/links')
    .child(updateLink.firebaseId)
    .update(
      {
        linkUrl: updateLink.linkUrl,
        linkTitle: updateLink.linkTitle,
        subjectId: updateLink.subjectId,
      },
      (error) => {
        if (error) {
          // todo: dispatch error snackbar
        } else {
          dispatch(
            displayAppSnackbar({
              text: `Updated ${updateLink.linkTitle}`,
              severity: 'success',
              position: {
                vertical: 'bottom',
                horizontal: 'left',
              },
            })
          );
        }
      }
    );
};

export const getLinksList = async () => {
  return await firebase
    .database()
    .ref('/links')
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};