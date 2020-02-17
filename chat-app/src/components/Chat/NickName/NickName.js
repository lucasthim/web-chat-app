import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const NickName = ({onSetNickname: pushSetNickname}) => {
  const [open, setOpen] = useState(true);
  const [nickname, setNickname] = useState("");

  const handleClose = () => {
    setOpen(false);
    pushSetNickname(nickname)

  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nickname</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Hi there! Pick a really cool nickname and start chatting right away!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cool nickname"
            value = {nickname}
            onChange = { (event) => setNickname(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Don't Feel Like It
          </Button>
          <Button onClick={handleClose} color="primary">
            Hook Me Up!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NickName