import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Voice from '@react-native-community/voice';
import * as Speech from 'expo-speech';

import { sendHttpRequest } from '../constants/Fetch';
import { Container, Footer, FooterSound } from '../components/Container';
import { color } from '../constants/Theme';

const Main = () => {
    const [valueText, setValueText] = useState('');
    const [speech, setSpeech] = useState(false);
    const [valueAI, setValueAI] = useState('');

    const onSpeechStart = Voice.onSpeechStart = (e) => {

    };

    const onSpeechRecognized = Voice.onSpeechRecognized = (e) => {

    };

    const onSpeechError = Voice.onSpeechError = (e) => {

    };

    const onSpeechResults = Voice.onSpeechResults = (e) => {

    };

    const onSpeechVolumeChanged = Voice.onSpeechVolumeChanged = (e) => {

    };

    const onSpeechPartialResults = Voice.onSpeechPartialResults = (e) => {
        setValueText(e.value[0]);
    };

    const onSpeechEnd = Voice.onSpeechEnd = (e) => {
        setSpeech(false);
        console.log(valueText);
        // sendHttpRequest('POST', 'http://192.168.25.104:3030/ai/request', { query: valueText })
        //     .then(resJson => {
        //         const { result } = resJson
        //         setValueAI(result)
        //         Speech.speak(result);
        //     });
    };

    const _startRecognizing = async () => {
        setSpeech(true);
        setValueText('');
        try {
            await Voice.start('vi-VN');
        } catch (e) {
            console.error(e);
        }
    };

    const _stopRecognizing = async () => {
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    };

    let contentSpeech = <Footer onPress={_startRecognizing} color={color.accent} />

    if (speech) {
        contentSpeech = <FooterSound />
    }


    return (
        <Container>
            <View style={{
                justifyContent: 'center',
                shadowRadius: 6,
                shadowOpacity: 0.5,
                elevation: 10,
                padding: 15,
                backgroundColor: 'white',
            }}>
                <Text style={{ fontSize: 20, color: '#000' }}>{valueText}</Text>
            </View>
            <ScrollView>
                <Text style={{ fontSize: 20, color: '#000' }}>
                    {valueAI}
                </Text>
            </ScrollView>
            {contentSpeech}
        </Container>
    );
}

export default Main;