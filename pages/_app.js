import '../styles/globals.css'
import { Provider } from "react-redux";
import store from '../feature/store/store';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

function MyApp({ Component, pageProps }) {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>

    </Provider>
  )
}

export default MyApp
