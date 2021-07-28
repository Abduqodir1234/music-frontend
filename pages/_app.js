import MiniDrawer from '../Components/Navbar'
import '../styles/globals.css'
import "../styles/Carousel.css"
import "../styles/Search.css"
import "../styles/player.css"
import { Provider, useDispatch } from 'react-redux';
import store from '../Redux/store'

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
