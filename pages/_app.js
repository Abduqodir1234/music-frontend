import MiniDrawer from '../Components/Navbar'
import '../styles/globals.css'
import "../styles/Carousel.css"
import "../styles/Search.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux';
import store from '../Redux/store'
import "../styles/card.css"
import "../styles/player.scss"
import "../styles/CategoryNavigation.css"
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
const progress = new ProgressBar({
    size: 4,
    color: "red",
    className: "bar-of-progress",
    delay: 100,
});
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);
function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <MiniDrawer>
        <Component {...pageProps} />
      </MiniDrawer>
    </Provider>
  )
}



export default MyApp
