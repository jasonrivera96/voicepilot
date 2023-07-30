import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import { COLORS } from '../constants'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

const statusBarHeight = Constants.statusBarHeight

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style='dark' backgroundColor='white' />
      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil</Text>
        </View>
        <View style={styles.circle}>
          <Ionicons name='person-outline' size={40} color={COLORS.ORANGE} />
        </View>
        <View style={styles.section}>
          <Text style={styles.user}>Nombres Completos</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.texto}>User</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Ionicons name='chatbox-outline' size={20} color={COLORS.WHITE} />
          </View>
          <View style={styles.button}>
            <Ionicons name='call-outline' size={20} color={COLORS.WHITE} />
          </View>
          <View style={styles.button}>
            <Ionicons name='share-social-outline' size={20} color={COLORS.WHITE} />
          </View>
          <View style={styles.button}>
            <Ionicons name='ellipsis-vertical-outline' size={20} color={COLORS.WHITE} />
          </View>
        </View>

        <View style={styles.table}>
            <View style={styles.tableRowInfo}>
                <Ionicons name='business-outline' marginHorizontal={20} size={20} color={COLORS.ORANGE} />
                <Text style={styles.tableCell}>(123) 456-7890</Text>
            </View>
            <View style={styles.tableRowInfo}>
                <Ionicons name='at-outline' marginHorizontal={20} size={20} color={COLORS.ORANGE} />
                <Text style={styles.tableCell}>user@mail.com</Text>
            </View>
            <View style={styles.tableRowInfo}>
                <Ionicons name='location-outline' marginHorizontal={20} size={20} color={COLORS.ORANGE} />
                <Text style={styles.tableCell}>La Vicentina. Quito-Ecuador.</Text>
            </View>
        </View>

        <Text style={styles.tit}>Redes Sociales</Text>
        
        <View style={styles.table}>
            <View style={styles.tableRowSocial}>
                <Text style={styles.tableCell}>Instagram</Text>
                <Ionicons name='logo-instagram' marginHorizontal={20} size={20} color={COLORS.ORANGE} />
            </View>
            <View style={styles.tableRowSocial}>
                <Text style={styles.tableCell}>Facebook</Text>
                <Ionicons name='logo-facebook' marginHorizontal={20} size={20} color={COLORS.ORANGE} />
            </View>
        </View>

      </View>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.WHITE,
    paddingTop: statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    width: '90%',
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center'
  },
  section: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25
  },
  user: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 13
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: COLORS.ORANGE,
    backgroundColor: COLORS.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: 5
  },
  tit: {
    fontWeight: '500',
    fontSize: 16,
    marginTop: '4%',
    alignSelf: 'flex-start'
  },
  table: {
    width: '90%',
    borderWidth: 0.2,
    borderColor: COLORS.GRAY_EXTRA_SOFT,
    borderRadius: 4,
    margin: 25
  },
  tableRowInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.GRAY_EXTRA_SOFT,
  },
  tableRowSocial: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.GRAY_EXTRA_SOFT,
  },
  tableCell: {
    fontSize: 14,
    color: COLORS.GRAY_SOFT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    marginTop: '5%',
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: COLORS.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  texto: {
    padding: 15,
    color: COLORS.GRAY_SOFT
  }
})

