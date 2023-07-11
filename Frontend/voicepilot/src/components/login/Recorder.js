import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';
import { Icon } from 'react-native-elements';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { color } from 'react-native-elements/dist/helpers';

export default function App() {
    const [recording, setRecording] = React.useState();
    const [recordings, setRecordings] = React.useState([]);
    const [message, setMessage] = React.useState("");
    //variables para cronometro
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [customInterval, setCustomInterval] = useState();

    const changeTime = () => {
        setSeconds((prevState) => {
            if (prevState + 1 == 60) {
                setMinutes(minutes + 1);
                return 0;
            }
            return prevState + 1;

        });
    };

    const clear = () => {
        stopRecording();
        setSeconds(0);
        setMinutes(0);
    }


    async function startRecording() {
        try {
            const permission = await Audio.requestPermissionsAsync();

            if (permission.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });

                const { recording } = await Audio.Recording.createAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );

                setRecording(recording);
            } else {
                setMessage("Please grant permission to app to access microphone");
            }

            //cronometro
            setCustomInterval(
                setInterval(() => {
                    changeTime();

                }, 1000)
            )
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();

        let updatedRecordings = [...recordings];
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        updatedRecordings.push({
            sound: sound,
            duration: getDurationFormatted(status.durationMillis),
            file: recording.getURI()
        });

        setRecordings(updatedRecordings);

        //cronometro
        if (customInterval) {
            clearInterval(customInterval);
        }

    }

    function getDurationFormatted(millis) {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutesDisplay}:${secondsDisplay}`;
    }

    function getRecordingLines() {
        return recordings.map((recordingLine, index) => {
            return (
                <View key={index} style={styles.row}>
                    <Text style={styles.fill}>Grabación {index + 1} - {recordingLine.duration}</Text>
                    <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} color="white"><FontAwesome name='play' color="#FF7700FF" size={15} /></Button>
                    <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} color="white"><FontAwesome name='download' color="#FF7700FF" size={15} /></Button>
                </View>
            );
        });
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize:50, marginBottom:70}}>{minutes < 10 ? '0' + minutes : minutes}:
                {seconds < 10 ? '0' + seconds : seconds}</Text>

            <StatusBar style="auto" />

            <Text>{message}</Text>
            <Text style={{fontSize:12, marginBottom:30}}>Presióname para empezar a grabar</Text>

            <Button
                color="white"
                style={{marginBottom:20}}
                onPress={recording ? stopRecording : startRecording} >
                <Icon name='mic' color="#FF7700FF" size={200} />
            </Button>
            {getRecordingLines()}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fill: {
        flex: 1,
        margin: 10,
        marginLeft: 50
    },
    button: {

        marginRight: 50


    }
});