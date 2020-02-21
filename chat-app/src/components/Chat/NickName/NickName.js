import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';

const NickName = ({onSetNickname: pushSetNickname, existingNicknames:existingNicknames}) => {
  const [open, setOpen] = useState(true);
  const [nickname, setNickname] = useState("");
  const [warningNickname, setWarningNickname] = useState(false);
  const [nicknameAlreadyChosen, setnicknameAlreadyChosen] = useState(false);
  
  const handleClose = () => {
    if(nickname == null || nickname == ""){
      setWarningNickname(true);
      setnicknameAlreadyChosen(false);
    } else if (existingNicknames?.includes(nickname)){
      setWarningNickname(false);
      setnicknameAlreadyChosen(true);
    } else {
      setOpen(false);
      pushSetNickname(nickname);
    }
  };

  function showWarningPickNickname() {
    return (warningNickname ? 
      <Typography variant="caption" align="center" color="error" gutterBottom>
        Hey, make sure to actually pick a nickname.
      </Typography> : null);
  }

  function showWarningNicknameChosen() {
    var message = "Your nickname has been already picked! Please, pick another one."
    return (nicknameAlreadyChosen ? 
      <Typography variant="caption" align="center" color="error" gutterBottom>
        {message}
      </Typography> : null);
  }

  function disableConfirmButton() {
    console.log(existingNicknames == undefined || existingNicknames == null)
    return existingNicknames == undefined || existingNicknames == null;
  }

  return (
    <div>
      <Dialog 
      open={open} 
      disableBackdropClick={true} 
      disableEscapeKeyDown={true}
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

          <Button onClick={handleClose} color="primary" disabled = {disableConfirmButton()}>
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