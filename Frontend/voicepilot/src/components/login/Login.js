//import liraries
import React, { useState } from 'react';
import { NativeBaseProvider } from 'native-base'
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Button } from '@rneui/themed';
import { TextInput } from 'react-native-paper';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CheckBox, Icon } from 'react-native-elements';

//mostrar y ocultar contrasena
export const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    return {
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility
    };
};
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [hidePass, setHidePass] = useState(true);
    const [isSelected, setSelection] = useState(false);
    const toggleCheckbox = () => setSelection(!isSelected);

    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();



    const navigation = useNavigation();
    return (
        //Contenedor general
        <View style={styles.container}>
            <Text style={{ color: 'black', fontSize: 32, fontWeight: 'bold' }}>Iniciar Sesión</Text>

            <View style={styles.form}>

                <Text style={{ fontWeight: 'bold' }}>Correo</Text>
                <View style={styles.inputContainer}>
                    <Icon style={styles.searchIcon} name='mail-outline' />
                    <TextInput style={styles.input} placeholder="Ingrese su correo" onChangeText={(text) => setEmail(text)} value={email} />
                </View>

                <Text style={{ fontWeight: 'bold' }}>Contraseña</Text>
                <View style={styles.inputContainer}>
                    <Icon style={styles.searchIcon} name='lock-open' />
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese su contraseña"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={passwordVisibility}
                        value={password}
                        enablesReturnKeyAutomatically
                        onChangeText={text => setPassword(text)}
                    />
                    <Pressable onPress={handlePasswordVisibility}>
                        <MaterialCommunityIcons name={rightIcon} size={22} style={styles.icono} color="#232323" />
                    </Pressable>
                </View>
                {/*Contenedor Recuerdame */}
                <View style={styles.recuerdo}>
                    <CheckBox

                        checked={isSelected}
                        onPress={toggleCheckbox}
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        checkedColor="#E46B00FF"
                        style={styles.checkbox}
                    />
                    <Text style={{ paddingTop: 17, marginLeft: -15 }}>Recuérdame</Text>
                    <Text style={{ color: "#E46B00FF", padding: 17, marginLeft: 35 }}>Olvidaste tu contraseña?</Text>

                </View>
                <Button color="#E46B00FF" onPress={() => navigation.navigate('Recorder')}>Iniciar Sesión</Button>
            </View>
            {/*Iniciar sesion con redes sociales */}
            <Text style={{ alignItems: 'center', marginTop: "5%" }}>O iniciar sesión con</Text>
            <View style={styles.buttonContainer}>
                <Button radius={'sm'} type="solid" color="#E7F1F8">
                    <Icon name='facebook' color="darkblue" />
                </Button>
                <Button radius={'sm'} type="solid" color="#F8E7E8" >
                    <FontAwesome name="google" size={24} color="red" />
                </Button>
            </View>
            {/*Ingresar a registro */}
            <View style={styles.final}>
                <Text>No tienes una cuenta?</Text>
                <Text onPress={() => navigation.navigate('Registro')} style={styles.registrar} >Registrarse</Text>
            </View>

        </View>
    )
}
export default () => {
    return (
        <NativeBaseProvider>
            <Login />
        </NativeBaseProvider>
    )

}

// Estilos
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%'
    },
    form: {
        gap: 10,
        width: '80%',

    },
    inputContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 4,
        borderWidth: 1,

    },

    icono: {
        marginTop: "50%",
        marginRight: "3%"
    },
    input: {
        flex: 1,
        height: 44,
        backgroundColor: '#fff',

    },
    recuerdo: {
        marginLeft: -20,
        flexDirection: 'row',
    },
    checkbox: {
        paddingRight: 0
    },

    searchIcon: {
        padding: 10,
    },

    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
        width: "30%",
        justifyContent: "space-between"
    },
    final: {
        flexDirection: 'row',
        marginTop: "20%"

    },
    registrar: {
        fontWeight: 'bold',
        color: "#E46B00FF"
    }


});


