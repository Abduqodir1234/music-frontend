import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Player from '../Components/player'
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AppsIcon from '@material-ui/icons/Apps';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Carousel from "../Components/Carousel"
import "bootstrap/dist/css/bootstrap.min.css"
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import FormControl from "@material-ui/core/FormControl"
import homeicon from "../public/home.svg"
import categoryicon from '../public/category.svg'
import usericon from "../public/user-2.svg"
import {
  Grid,
  Input,
  InputLabel,
  Paper,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  Menu,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList
} from "@material-ui/core"
import logo from "../public/logo.png"
import Image from "next/image"
import { useRouter } from 'next/dist/client/router';
const drawerWidth = 240;


export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  console.log(windowSize)
  return windowSize;
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: "black"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function MiniDrawer({ children }) {
  const router = useRouter()
  const [age, setage] = useState()
  const [lang, setlang] = useState("uz")
  const windowSize = useWindowSize()
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [value, setvalue] = useState(router.pathname)
  const [languagedropdown, setlanguagedropdown] = useState(false)
  const anchorRef = React.useRef(null);
  let style = {}
  if (windowSize.width < 889) {
    style = {
      zIndex: "10000",
      marginBottom: "56px"
    }
  }
  else {
    style = {
      zIndex: "10000"
    }
  }
  const handleselect = (e) => {
    setlanguagedropdown(!languagedropdown)
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setlanguagedropdown(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setlanguagedropdown(false);
    }
  }

  return (
    <div>
      {windowSize.width < 889
        ?
        <div>
          <div>
            <Grid container style={{ backgroundColor: "#382366", padding: "5px", paddingLeft: "5px" }}>
              <Grid item xs={6}>
                <Typography variant="div" style={{ paddingLeft: "20px" }} >
                  <Image src={logo} width="100" height="26" />
                </Typography>
              </Grid>
              <Grid item xs={4}>

              </Grid>
              <Grid item xs={2}>
                <Button
                  ref={anchorRef}
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={handleselect}
                  onBlur={handleClose}
                  size="small"
                  style={{ color: "white" }}
                >
                  {lang}
                </Button>
                <Popper style={{ zIndex: 10000000000 }} open={languagedropdown} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                      <Paper >
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} >
                            <MenuItem onClick={() => { setlang("uz"); setlanguagedropdown(false) }}>O&apos;zbekcha</MenuItem>
                            <MenuItem onClick={() => { setlang("ru"); setlanguagedropdown(false) }}>Rus tili</MenuItem>
                            <MenuItem onClick={() => { setlang("k"); setlanguagedropdown(false) }}>Kirilcha</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Grid>
            </Grid>
            <Grid container>

              <Grid xs={12}>
                <center> <input type="search" className="search" placeholder="Search" style={{ borderRadius: "8px", width: "97%", border: "2px solid grey", marginTop: "10px", padding: "2px", paddingLeft: "10px" }} /></center>
              </Grid>
            </Grid>

          </div>
          <div>
            <div style={{ backgroundColor: "#f5feff" }}>
              {children}
            </div>
            <div style={style} className="fixed-bottom"  >
              {/* <div style={{position:"absolute",top:"0%",left:"0px",width:"100%"}}> */}
              <Player />
            </div>
          </div>
          <div>
            <BottomNavigation
              value={value}
              className="fixed-bottom"
              style=
              {{
                backgroundColor: "white",
                borderTop: "1px solid lavender"
              }}
            >
              <BottomNavigationAction
                label="Home"
                onClick=
                {
                  () => {
                    setvalue("/");
                    router.push("/")
                  }
                }
                value="/"
                icon={<Image src={homeicon} width={20} height={20} />}
              />
              <BottomNavigationAction
                label="Categories"
                onClick=
                {
                  () => {
                    setvalue("/category");
                    router.push("/category")
                  }
                }
                value="/category"
                icon={<Image src={categoryicon}
                  color="initial"
                  width={20}
                  height={20}
                />}
              />
              <BottomNavigationAction
                label="Artists"
                onClick=
                {
                  () => setvalue("/artists")
                }
                value="/artists"
                icon=
                {
                  <Image src={usericon}
                    color="initial"
                    width={20}
                    height={20}
                  />
                }
              />
              <BottomNavigationAction label="Search" onClick={() => setvalue("/search")} value="/search" icon={<SearchIcon />} />
            </BottomNavigation>
          </div>
        </div>
        :
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar style={{ backgroundColor: "white" }}>
              <IconButton
                style={{ color: "black" }}
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Grid
                container


              >
                <Grid item xs={3}>
                  <Typography variant="h6" noWrap color="textPrimary">
                    Music Store
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    fullWidth
                    style={{ backgroundColor: "white" }}
                    size="small"
                    color="primary"
                    variant="outlined"
                    placeholder="Search"
                    type="text"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />


                </Grid>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleselect}
                    onBlur={handleClose}
                    size="small"
                    style={{ color: "black" }}
                  >
                    {lang}
                  </Button>
                  <Popper style={{ zIndex: 10000000000 }} open={languagedropdown} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      >
                        <Paper >
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} >
                              <MenuItem onClick={() => { setlang("uz"); setlanguagedropdown(false) }}>O&apos;zbekcha</MenuItem>
                              <MenuItem onClick={() => { setlang("ru"); setlanguagedropdown(false) }}>Rus tili</MenuItem>
                              <MenuItem onClick={() => { setlang("k"); setlanguagedropdown(false) }}>Kirilcha</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Grid>
              </Grid>


            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <Typography variant="h6" noWrap style={{ marginRight: "15%" }}>
                Music Store
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem button onClick={() => router.push("/")}>
                <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={() => router.push("/category")}>
                <ListItemIcon><AppsIcon /></ListItemIcon>
                <ListItemText primary="Category" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="Artists" />
              </ListItem>
            </List>
            <Divider />


          </Drawer>
          <div style={{ marginTop: "70px", backgroundColor: "#f5feff " }}>
            {children}
            <div style={style} className="fixed-bottom"  >
              {/* <div style={{position:"absolute",top:"0%",left:"0px",width:"100%"}}> */}
              <Player />
            </div>
          </div>
        </div>
      }
    </div>
  );

}
export default MiniDrawer;