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
