import  React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import NickName from './Nickname/Nickname';

class Landing extends Component {
    
    constructor() {
        super();
        this.state = {
            currentNickname: '',
            showDialog: false,
            nicknameAlreadyChosen: false
        };
    }

    saveNickname = (nickname) => {
        fetch(`http://localhost:8001/nickname/${nickname}`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                isLoaded: true,
                currentNickname: result.nickname,
                nicknameAlreadyChosen: false,
                showDialog: false
                });
                //Route to another page
            },
            (error) => {
                this.setState({
                isLoaded: true,
                nicknameAlreadyChosen: true,
                error
                });
            }
        )
    }

    nicknameAvailable = (available) => {
        this.setState({currentNickname:available})
    }

    openDialog = () => {
        this.setState({showDialog:true})
    }

    render() {
        return (
            <div>
                <NickName 
                emitNickname = {this.saveNickname}
                showDialog = {this.state.showDialog}
                nicknameAlreadyChosen = {this.state.nicknameAlreadyChosen}/>
                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>
                    <Grid item xs={6}>
                        {/* <Typography component="div" style={{ height: '70vh',margin:'2vh 0 1vh 0' }}> */}
                        <Typography variant="h5" align="center" color="primary" gutterBottom>
                            Ready to meet some really cool people and have a great time?
                        </Typography>
                            
                        {/* </Typography> */}
                        <Button color="primary" onClick={this.openDialog} size="large">
                            Click here!
                        </Button>
                    </Grid>   

                </Grid> 
            </div>

        );
    }
}

export default Landing;