import { View, Text, StyleSheet } from 'react-native';
import Constants from "expo-constants";
import { useState } from 'react';
import HomeSkeleton from '../skeleton/HomeSkeleton';


const HomeScreen = () => {
  const [folders, setFolders] = useState([])

  if (folders.length === 0) return (<HomeSkeleton/>)
  
  return (
    <View style={styles.container}>
      <Text>Mis folders</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  }, 
});

export default HomeScreen