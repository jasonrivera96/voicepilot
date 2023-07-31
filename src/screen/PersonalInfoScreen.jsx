import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { COLORS } from '../constants'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { AuthContext } from '../context/AuthContext'

const PersonalInfoScreen = () => {
  const { userData, logout } = useContext(AuthContext)
  const userEmail = userData?.email
  const userName = userData?.username

  const closeSession = () => {
    Alert.alert(
      null,
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Cerrar sesión', onPress: () => logout() }
      ],
      { cancelable: false }
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark' backgroundColor='white' />
      <View style={styles.contentContainer}>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil</Text>
        </View>
        <View style={styles.circle}>
          <Ionicons name='person-outline' size={60} color='black' />
        </View>
        <TouchableOpacity>
          <View style={styles.section}>
            <Text style={styles.user}>{userName}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.texto}>Cuenta gratuita</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity>
            <View style={styles.button}>
              <Ionicons name='logo-facebook' size={20} color={COLORS.WHITE} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.button}>
              <Ionicons name='logo-instagram' size={20} color={COLORS.WHITE} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.button}>
              <Ionicons name='share-social-outline' size={20} color={COLORS.WHITE} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.button}>
              <Ionicons name='ellipsis-vertical-outline' size={20} color={COLORS.WHITE} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.table}>
          <TouchableOpacity style={styles.tableRowInfo}>
            <Ionicons name='at-outline' marginHorizontal={20} size={20} color={COLORS.ORANGE} />
            <Text style={styles.tableCell}>{userEmail}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tableRowInfo}>
            <Ionicons name='phone-portrait-outline' marginHorizontal={20} size={20} color={COLORS.ORANGE} />
            <Text style={styles.tableCell}>(+593) 99 998 7744</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tableRowInfo, { borderBottomWidth: 0 }]}>
            <Ionicons name='location-outline' marginHorizontal={20} size={20} color={COLORS.ORANGE} />
            <Text style={styles.tableCell}>Quito - Ecuador</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => closeSession()} style={styles.logoutButton}>
          <Ionicons name='log-out-outline' size={20} color='white' />
          <Text style={styles.logoutButtonText}> Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PersonalInfoScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    width: '90%',
    flex: 1,
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.GRAY_EXTRA_SOFT
  },
  tableRowSocial: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.GRAY_EXTRA_SOFT
  },
  tableCell: {
    fontSize: 14,
    color: COLORS.GRAY_SOFT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    marginTop: '5%',
    width: 128,
    height: 128,
    backgroundColor: COLORS.GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150
  },
  texto: {
    padding: 15,
    color: COLORS.GRAY_SOFT
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.ORANGE,
    height: 48,
    width: '90%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '40%',
    shadowColor: COLORS.ORANGE,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10
  },
  logoutButtonText: {
    color: '#fff'
  }
})
