import React from 'react'
import { 
    AppBar, 
    Toolbar, 
    Grid, 
    InputBase, 
    IconButton, 
    Badge 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { 
    NotificationsNone, 
    ChatBubbleOutline, 
    PowerSettingsNew, 
    Search 
} from '@mui/icons-material';


const useStyles = makeStyles(theme => ({
    searchInput: {
        opacity: '0.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    }
}))

export default function Header() {

    const classes = useStyles();

    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <Grid container
                    alignItems="center">
                    <Grid item>
                        <InputBase
                            placeholder="Search topics"
                            className={classes.searchInput}
                            startAdornment={<Search fontSize="small" />}
                        />
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                        <IconButton>
                            <Badge badgeContent={4} color="error">
                                <NotificationsNone fontSize="small" />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={3} color="primary">
                                <ChatBubbleOutline fontSize="small" />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <PowerSettingsNew fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}