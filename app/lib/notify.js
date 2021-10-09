import { openSnackbarExported } from 'components';

export default function notify(obj) {
  openSnackbarExported({ message: obj.message || obj.toString() });
}
