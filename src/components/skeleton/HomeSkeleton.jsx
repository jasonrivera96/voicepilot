import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from "expo-constants";
import { Ionicons } from '@expo/vector-icons';

const folderIcon = <Ionicons name="folder-open-outline" size={50}/>
const addIcon = <Ionicons name="add" size={16} color="white"/>

const HomeSkeleton = () => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.titlePage}>My workspace</Text>
      <View style={styles.icon}>
        {folderIcon}
      </View>
      <Text style={styles.message}>It's empty here</Text>
      <Text style={styles.description}>Ea ea occaecat labore labore proident fugiat sunt do in magna</Text>
      <TouchableOpacity style={styles.containerButton}>
        <Text>{addIcon}</Text>
        <Text style={styles.textButton}>Create new</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
  }, 
  titlePage: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
  },
  icon: {
    backgroundColor: '#F3F4F6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: 128,
    height: 128,
    borderRadius: 100,
  },
  message: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
  description: {
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
    marginTop: 10,
    color: "#9095A0FF"
  },
  containerButton: {
    backgroundColor: '#FF7700FF',
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: 152,
    height: 44,
    borderRadius: 8,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  textButton: {
    color: '#fff',
  }
});

export default HomeSkeleton