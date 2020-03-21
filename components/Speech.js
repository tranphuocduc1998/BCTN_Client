import React, { Component, useState, useEffect } from 'react';
import { Platform, TouchableOpacity, Text, View } from 'react-native';
import Voice from '@react-native-community/voice';
import { Dialogflow_V2 } from "react-native-dialogflow";
import * as Speech from 'expo-speech';

import { Icon } from './Icon';
import Enviroment from '../Environment';

const SpeechV = () => {
    const [value, setValue] = useState('');
    const [valueText, setValueText] = useState('');
    const [speech, setSpeech] = useState(false);
    Dialogflow_V2.setConfiguration(
        Enviroment.client_email,
        Enviroment.private_key,
        Dialogflow_V2.LANG_ENGLISH,
        Enviroment.project_id,
    );

    useEffect(() => {

    })

    const onSpeechStart = Voice.onSpeechStart = (e) => {
        setSpeech(true);
    };

    const onSpeechRecognized = Voice.onSpeechRecognized = (e) => {

    };

    const onSpeechEnd = Voice.onSpeechEnd = (e) => {
        setSpeech(false);
        Dialogflow_V2.requestQuery(value,
            result => {
                setValueText(result.queryResult.fulfillmentText);
                Speech.speak(result.queryResult.fulfillmentText);
                console.log(result.queryResult.fulfillmentMessages[1]);
            },
            error => console.log(error)
        );
    };

    const onSpeechError = Voice.onSpeechError = (e) => {

    };

    const onSpeechResults = Voice.onSpeechResults = (e) => {

    };

    const onSpeechPartialResults = Voice.onSpeechPartialResults = (e) => {
        setValue(e.value[0]);
    };

    const onSpeechVolumeChanged = Voice.onSpeechVolumeChanged = (e) => {

    };

    const _startRecognizing = async () => {
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

    const _cancelRecognizing = async () => {
        try {
            await Voice.cancel();
        } catch (e) {
            console.error(e);
        }
    };

    const _destroyRecognizer = async () => {
        try {
            await Voice.destroy();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: '#ff7f62',
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                }} onPress={_startRecognizing}>
                <Icon name='keyboard-voice' type='MaterialIcons' size={24} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18 }}>{value}</Text>
            <Text style={{ fontSize: 18 }}>{valueText}</Text>
        </View>
    );
}

export default SpeechV;