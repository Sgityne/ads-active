    import { SplashScreen, Stack } from 'expo-router';
    import { useFonts } from 'expo-font'
    import { useEffect } from 'react';
    import GlobalProvider from '../context/GlobalProvider';
    
    // prevent the splash screen from auto hiding before asset loading is complete
    SplashScreen.preventAutoHideAsync();
    
    const RootLayout = () => {
      const [fontsLoaded, error] = useFonts({
        "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
        "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
        "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
        "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Thin": require("../assets/fonts/Roboto-Thin.ttf"),
        "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
      });

      // allows us to perform some actions while the page or(and) screen is loading
      useEffect(() => {
        if(error) throw error;
        if(fontsLoaded) SplashScreen.hideAsync() // hides the native splash screen instatly
      }, [fontsLoaded, error])

      if(!fontsLoaded && !error) return null;

      return (
        <GlobalProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false}} />
            <Stack.Screen name="aux_screens/explore" options={{ headerShown: false}} />
            <Stack.Screen name="aux_screens/create" options={{ headerShown: false}} />
            <Stack.Screen name="aux_screens/edit" options={{ headerShown: false}} />
            <Stack.Screen name="aux_screens/select" options={{ headerShown: false}} />
            <Stack.Screen name="(auth)" options={{ headerShown: false}} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
            <Stack.Screen name="search/[query]" options={{ headerShown: false}} />
          </Stack>
        </GlobalProvider>
      );
    };
    
    export default RootLayout;
