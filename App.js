import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import Main from './components/Main';

export default function App() {
  //* -------БЛОК подгрузка шрифтов
  const [fontsLoaded] = useFonts({
    Allerta: require('./assets/fonts/AllertaStencil-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  //* -------конец БЛОКА подгрузки шрифтов

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
