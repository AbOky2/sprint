import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

let openSnackbarFn;

class Notifier extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      message: '',
    };
  }

  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
  }

  handleSnackbarRequestClose = () => {
    this.setState({
      open: false,
      message: '',
    });
  };

  openSnackbar = ({ message }) => {
    this.setState({ open: true, message });
  };

  render() {
    const { open, message: stateMessage } = this.state;
    const message = (
      <span id="snackbar-message-id" dangerouslySetInnerHTML={{ __html: stateMessage }} />
    );

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        message={message}
        autoHideDuration={5000}
        onClose={this.handleSnackbarRequestClose}
        ContentProps={{
          'aria-describedby': 'snackbar-message-id',
        }}
      />
    );
  }
}

export function openSnackbarExported({ message }) {
  openSnackbarFn({ message });
}

export default Notifier;
