import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import Constants from "expo-constants";
import { useState } from 'react';
import HomeSkeleton from './HomeEmpty';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants';

const folderIcon = <Ionicons name="folder-open-outline" size={25} />;
const addIcon = <Ionicons name="add" size={30} color="white" />;

const HomeScreen = () => {
  const [folders, setFolders] = useState([])

  if (folders.length === 0) return (<HomeSkeleton setFolders={setFolders}/>)

  const Folder = ({ item, index }) => {
    return(
      <TouchableOpacity key={index} style={styles.folderContainer}>
        <View style={styles.icon}>
          {folderIcon}
        </View>
        <Text>{item}</Text>
      </TouchableOpacity>
    )
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
          <TouchableOpacity onPress={() => console.log('')} style={styles.addIcon}>
            <Text>{addIcon}</Text>
          </TouchableOpacity>
          <View style={styles.text}>
            <Text style={styles.titlePage}>My workspace</Text>
          </View>
      </View>
      <FlatList 
      style={styles.folderListContainer}
        data={folders}
        renderItem={({item, index}) => <Folder item={item} index={index}/> }
      >
      </FlatList>
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
  contentContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginTop: 80,
  },
  addIcon: {
    backgroundColor: COLORS.ORANGE,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    position: 'absolute',
    left: -28,
  },
  text: {
    width: '70%',
  },
  titlePage: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  folderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  folderListContainer: {
    alignSelf: 'flex-start',
    marginTop: 30,
    marginHorizontal: 30
  },
  icon: {
    backgroundColor: COLORS.GRAY,
    padding: 10,
    borderRadius: 50,
  },
});

export default HomeScreen