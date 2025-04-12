import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import BootSplash from "react-native-bootsplash";


export default function App() {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };
  
    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);
  return <AppNavigator />;
}