import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { GitHub, Dashboard, AddLocation, Sensors } from '@mui/icons-material'
import Link from 'next/link';
const drawerWidth = 260;

export default function PermanentDrawerLeft({ children }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href={'/'}>
                            Water quality monitoring system
                        </Link>
                    </Typography>
                    <Button color='inherit'>
                        <a href={'https://github.com/ap211unitech/Water-Quality-Monitoring-System'} target='_blank'>
                            <GitHub fontSize='large' />
                        </a>
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <Link href={'/dashboard'}>
                            <ListItem key={'dashboard'} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon style={{ marginRight: 6 }}>
                                        <Dashboard fontSize='large' />
                                    </ListItemIcon>
                                    <ListItemText primary={'Dashboard'} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link href={'/addLocation'}>
                            <ListItem key={'addLocation'} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon style={{ marginRight: 6 }}>
                                        <AddLocation fontSize='large' />
                                    </ListItemIcon>
                                    <ListItemText primary={'Add Location'} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link href={'/addSensor'}>
                            <ListItem key={'addSensor'} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon style={{ marginRight: 6 }}>
                                        <Sensors fontSize='large' />
                                    </ListItemIcon>
                                    <ListItemText primary={'Add Sensor'} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, my: 8 }}>
                {children}
            </Box>
        </Box>
    );
}