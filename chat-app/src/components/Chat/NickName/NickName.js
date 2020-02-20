import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';

const NickName = ({onSetNickname: pushSetNickname, existingNicknames}) => {
  const [open, setOpen] = useState(true);
  const [nickname, setNickname] = useState("");
  const [warningNickname, setWarningNickname] = useState(false);
  const [nicknameAlreadyChosen, setnicknameAlreadyChosen] = useState(false);
  
  const handleClose = () => {
    if(nickname == null || nickname == ""){
      setWarningNickname(true);
      setnicknameAlreadyChosen(false);
    } else if (existingNicknames.includes(nickname)){
      setWarningNickname(false);
      setnicknameAlreadyChosen(true);
    } else {
      setOpen(false);
      pushSetNickname(nickname);
    }
  };

  const handleCloseNo = () => {
    setOpen(false);
    pushSetNickname('Anonymous');
  }

  function showWarningPickNickname() {
    return (warningNickname ? 
      <Typography variant="caption" align="center" color="error" gutterBottom>
        Hey, make sure to actually pick a nickname.
      </Typography> : null);
  }

  function showWarningNicknameChosen() {
    warningNickname
    return (nicknameAlreadyChosen ? 
      <Typography variant="caption" align="center" color="error" gutterBottom>
        Your nickname has been already picked! Please, pick another one.
      </Typography> : null);
  }

  return (
    <div>
      <Dialog 
      open={open} 
      disableBackdropClick={true} 
      disableEscapeKeyDown={true}
      // onEnter={handleClose}
      aria-labelledby="form-dialog-title">
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
            onChange = { (event) =>{ setNickname(event.target.value)}}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleCloseNo} color="primary">
            Don't Feel Like It
          </Button> */}
          <Button onClick={handleClose} color="primary">
            Hook Me Up!
          </Button>
        </DialogActions>
        {showWarningPickNickname()}
        {showWarningNicknameChosen()}

      </Dialog>
    </div>
  );
}



export default NickName