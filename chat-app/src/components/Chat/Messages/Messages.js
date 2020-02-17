import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


const Messages = ({ messages }) => {
  return (
    <List>
    {listMessages(messages)}
    </List>

  );
};


function listMessages(messages) {

    return messages.flatMap((message, index) => [
        <ListItem alignItems="flex-start" key={index}>
            <ListItemAvatar>
                <Avatar alt={message.user} src="/"/>
            </ListItemAvatar>
            <ListItemText 
                primary={message.user}
                secondary={
                <React.Fragment>
                    <Typography component="span" variant="body2" color="textPrimary">
                        {formatDateAndTime(message.datetime) } — </Typography> {message.body}
                </React.Fragment>
                }/>
        </ListItem>,
        <Divider variant="inset" component="li" key={"divider-"+index}></Divider>

    ]).slice(0,-1)
}

function formatDateAndTime(datetime){
    var datetime =  new Date(datetime).toLocaleTimeString()
    return datetime
}
export default Messages;