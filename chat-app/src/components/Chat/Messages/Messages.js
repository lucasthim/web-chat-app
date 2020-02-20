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
    {listChat(messages)}
    </List>

  );
};


function listChat(messages) {
    console.log(messages)
    return messages.flatMap((message, index) => [
        message.isUserMessage? <ListItem alignItems="flex-start" key={index}>
            <ListItemAvatar>
                <Avatar alt={message?.user} src="/"/>
            </ListItemAvatar>
            <ListItemText 
                primary={message?.user}
                secondary={
                <React.Fragment>
                    <Typography component="span" variant="body2" color="textPrimary">
                        {formatDateAndTime(message?.datetime) } — </Typography> {message?.body}
                </React.Fragment>
                }/>
        </ListItem> : 
        <ListItemText primary={message?.statusMessage}/>,
        <Divider variant="inset" component="li" key={"divider-"+index}></Divider>

    ]).slice(0,-1)
}

function formatDateAndTime(datetime){
    if(datetime != null || datetime != undefined){
        var datetime =  new Date(datetime).toLocaleTimeString()
        return datetime
    }
    return ''
}
export default Messages;