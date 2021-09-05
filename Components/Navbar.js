import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Player2 from '../Components/player'
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
import "bootstrap/dist/css/bootstrap.min.css"
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import homeicon from "../public/home.svg"
import categoryicon from '../public/category.svg'
import usericon from "../public/user-2.svg"
import play from "../public/play.svg"
import { GetApp, PlaylistPlay } from "@material-ui/icons"
import {
  Grid,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList
} from "@material-ui/core"
import logo from "../public/logo.png"
import Image from "next/image"
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import axios from "axios";
import { port } from "../port";
import get_one_music_info from "../Redux/Actions/get_one_music_info";
import get_music_id from "../Redux/Actions/get_music_id";
import open_player from "../Redux/Actions/openplayer";
const drawerWidth = 240;


export function useWindowSize() {
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
  const [desktop_searchbar, setsearch_bar] = useState(false)
  const [more, setmore] = useState(false)
  const router = useRouter()
  const [lang, setlang] = useState("uz")
  const windowSize = useWindowSize()
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [value, setvalue] = useState(router.pathname)
  const [languagedropdown, setlanguagedropdown] = useState(false)
  const [searchbar, setsearchbar] = useState(false)
  const [searchitems, setitems] = useState([])
  const anchorRef = React.useRef(null);
  const dispatch = useDispatch()
  const musichandle = (id) => {
    axios.get(port + "/api/songs/" + id)
      .then(response => {
        dispatch(get_one_music_info(response.data))
      })
      .catch(error => {
        console.log(error)
      })
    dispatch(get_music_id(id))
    dispatch(open_player())

  }
  const download = (id) => {
    axios.get(port + "/api/download/song/" + id)
        .then(response=>{
          router.push(response.data.url)
        })
  }
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
  const handleSearch = (e) => {
    const data = new FormData()
    axios({
      method:"GET",
      url:port + "/api/search/navbar/?search=" + e.target.value ,
      data:data
    })
        .then(response=>{
          setitems(response.data)
        })
        .catch(error=>{
          console.log(error)
        })
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

              <Grid xs={12} style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 0, right: "0px", zIndex: "1000000" }}>
                  <center>
                    <input
                      onInput={() => setsearchbar(true)}
                      onMouseLeave={() => setsearchbar(false)}

                      type="search"
                      onChange={(e) => handleSearch(e)}
                      className="search"
                      placeholder="Search"
                      style=
                      {{
                        borderRadius: "8px",
                        width: "97%",
                        border: "2px solid grey",
                        marginTop: "10px",
                        padding: "2px",
                        paddingLeft: "10px"
                      }}
                    />
                  </center>
                  {searchbar
                    ?
                    <center


                    >
                      <div
                        onMouseEnter={() => setsearchbar(true)}
                        onMouseLeave={() => setsearchbar(false)}
                        onClick={() => setsearchbar(true)}
                        onFocus={() => setsearchbar(true)}
                        style=
                        {{
                          borderRadius: "8px",
                          width: "97%",
                          border: "2px solid grey",
                          marginTop: "-10px",
                          padding: "2px",
                          paddingLeft: "10px",
                          height: "100%",
                          backgroundColor: "white",

                        }}
                      >
                        {searchitems.map(music => (
                          <>
                            <div key={music.id} className="col-md-12 col-lg-12 col-12 col-sm-12" style={{ height: "25px", marginTop: "20px" }}>
                              <div className="row">
                                <div className="col-md-2 col-lg-2 col-2 col-sm-2" onClick={() => musichandle(music.id)}>
                                  <Image src={play} width={30} height={30} />
                                </div>
                                <div className="col-md-8 col-sm-8 col-8" onClick={() => musichandle(music.id)}>
                                  <Marquee gradient="none" speed={30}> {music.title}</Marquee>
                                </div>
                                <div className="col-md-2 col-sm-2 col-2">
                                  <GetApp onClick={() => download(music.id)} />
                                </div>
                              </div>
                            </div><hr />
                          </>
                        ))}
                        {more ? <>
                          <div
                            className="col-md-12 col-sm-12 col-12 text-center text-primary"
                          >
                            See Full Results
                          </div><br />
                        </>
                          :
                          ""
                        }
                      </div>
                    </center>
                    :
                    ""
                  }
                </div>
              </Grid>
            </Grid>

          </div>
          <div>
            <div style={{ backgroundColor: "#defaff" }}>
              {children}
            </div>
            <div style={style} className="fixed-bottom"  >
              {/* <div style={{position:"absolute",top:"0%",left:"0px",width:"100%"}}> */}
              <Player2 />
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
                    router.push("/", null, { shallow: true })
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
                    router.push("/category", null, { shallow: true })
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
                  () => {
                    setvalue("/artists")
                    router.push("/artists", null, { shallow: true })
                  }
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
               <BottomNavigationAction
                label="PlayList"
                onClick={() => {
                  setvalue("/playlist");
                  router.push('/playlist', null, { shallow: true })
                }}
                value="/playlist"
                icon={<PlaylistPlay style={{color:"#395589"}} />}
              />
              <BottomNavigationAction
                label="Search"
                onClick={() => {
                  setvalue("/search");
                  router.push('/search', null, { shallow: true })
                }}
                value="/search"
                icon={<SearchIcon style={{color:"#395589"}} />}
              />
             
            </BottomNavigation>
            
          </div>
        </div>
        :
        <div className={classes.root}>

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
                <MenuIcon style={{color:"#395589"}} />
              </IconButton>
              <Grid
                container
              >
                <Grid item xs={3}>
                  <Typography variant="h6" noWrap color="textPrimary">
                    Music Store
                  </Typography>
                </Grid>
                <Grid item xs={7} style={{ position: "relative" }}>
                  <TextField
                    onInput={() => setsearch_bar(true)}
                    onMouseLeave={() => setsearch_bar(false)}
                    onChange={(e) => handleSearch(e)}
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
                  <div>
                    <div style={{
                      position: "absolute",
                      left: "0px",
                      top: "40px",
                    }}>
                      {desktop_searchbar
                        ?
                        <div
                          onMouseEnter={() => setsearch_bar(true)}
                          onMouseLeave={() => setsearch_bar(false)}
                          onClick={() => setsearch_bar(true)}
                          onFocus={() => setsearch_bar(true)}
                          style=
                          {{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "white",
                            border: " 1px solid grey",
                            zIndex: 100
                          }}
                        >
                          {searchitems.map(music => (
                            <center key={music.id}>
                              <div className="col-md-12 col-lg-12 col-12 col-sm-12" style={{ height: "25px", marginTop: "20px", color: "black" }}>
                                <div className="row">
                                  <div className="col-md-2 col-lg-2 col-2 col-sm-2" onClick={() => musichandle(music.id)}>
                                    <Image src={play} width={30} height={30} />
                                  </div>
                                  <div className="col-md-8 col-sm-8 col-8" onClick={() => musichandle(music.id)}>
                                    <Marquee gradient="none" speed={30}>{music.title}</Marquee>
                                  </div>
                                  <div className="col-md-2 col-sm-2 col-2">
                                    <GetApp onClick={() => download(music.id)} />
                                  </div>
                                </div>
                              </div><hr />
                            </center>
                          ))}
                          {more ? <>
                            <div
                              className="col-md-12 col-sm-12 col-12 text-center text-primary"
                            >
                              See Full Results
                            </div><br />
                          </>
                            :
                            ""
                          }

                        </div>
                        :
                        ""
                      }
                    </div>
                  </div>
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
                  <Popper
                    style={{ zIndex: 10000000000 }}
                    open={languagedropdown}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal>
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
              <ListItem button onClick={() => router.push("/", null, { shallow: true })}>
                <ListItemIcon><HomeRoundedIcon style={{color:"#395589"}} /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={() => router.push("/category", null, { shallow: true })}>
                <ListItemIcon><AppsIcon style={{color:"#395589"}} /></ListItemIcon>
                <ListItemText primary="Category" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={() => router.push("/artists", null, { shallow: true })}>
                <ListItemIcon><PersonIcon style={{color:"#395589"}} /></ListItemIcon>
                <ListItemText primary="Artists" />
              </ListItem>
            </List>
            <List>
              <ListItem button onClick={() => router.push("/playlist", null, { shallow: true })}>
                <ListItemIcon><PlaylistPlay style={{color:"#395589"}} /></ListItemIcon>
                <ListItemText primary="Playlist" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={() => router.push("/search", null, { shallow: true })}>
                <ListItemIcon><SearchIcon style={{color:"#395589"}} /></ListItemIcon>
                <ListItemText primary="Search" />
              </ListItem>
            </List>
            <Divider />
          </Drawer>
          <div style={{ marginTop: "70px", backgroundColor: "#defaff ", width: "100%", height: "100%", marginLeft: "70px" }}>
            {children}
            <div style={style} className="fixed-bottom"  >
              {/* <div style={{position:"absolute",top:"0%",left:"0px",width:"100%"}}> */}
              <Player2 />
            </div>
          </div>
        </div>
      }
    </div>
  );

}
export default MiniDrawer;