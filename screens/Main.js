import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Voice from '@react-native-community/voice';
import * as Speech from 'expo-speech';

import { sendHttpRequest } from '../constants/Fetch';
import { Container, Footer, FooterSound } from '../components/Container';
import { color } from '../constants/Theme';
import { BasicCard } from '../components/Card';

const Main = () => {
    const [valueText, setValueText] = useState('');
    const [speech, setSpeech] = useState(false);
    const [valueTextString, setValueTextString] = useState('');
    const [valueBasicCard, setValueBasicCard] = useState([]);

    useEffect(() => {
        sendHttpRequest('GET', 'http://192.168.25.104:3030/ai')
            .then(resJson => {
                const { type, voice } = resJson;
                switch (type) {
                    case "basicCard":
                        const { Data } = resJson;
                        setValueTextString('');
                        setValueBasicCard(Data);
                        break;
                    case "textString":
                        setValueBasicCard([]);
                        setValueTextString(voice);
                        break;

                    default:
                        break;
                }
                Speech.speak(voice);
            });
    }, [])

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
        sendHttpRequest('POST', 'http://192.168.25.104:3030/ai/request', { query: valueText })
            .then(resJson => {
                const { type, voice } = resJson;
                switch (type) {
                    case "basicCard":
                        const { basicCard } = resJson;
                        setValueTextString('');
                        setValueBasicCard(basicCard);
                        break;
                    case "textString":
                        setValueBasicCard([]);
                        setValueTextString(voice);
                        break;

                    default:
                        break;
                }
                Speech.speak(voice);
            });
    };

    const _startRecognizing = async () => {
        setSpeech(true);
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
            <ScrollView style={{ backgroundColor: color.backgrounddark }}>
                {valueBasicCard.map(result => {
                    return <BasicCard key={result._id}
                        onPress={(query) => {
                            sendHttpRequest('POST', 'http://192.168.25.104:3030/ai/request', { query: query })
                                .then(resJson => {
                                    const { type, voice } = resJson;
                                    switch (type) {
                                        case "basicCard":
                                            const { basicCard } = resJson;
                                            setValueTextString('');
                                            setValueBasicCard(basicCard);
                                            break;
                                        case "textString":
                                            const { textString } = resJson;
                                            setValueBasicCard([]);
                                            setValueTextString(textString);
                                            break;

                                        default:
                                            break;
                                    }
                                    Speech.speak(voice);
                                });
                        }}
                        data={result} />
                })}
                {valueTextString ? <View style={{ borderRadius: 20, marginLeft: 10, backgroundColor: '#fff', paddingHorizontal: 10 }}><Text style={{ fontSize: 20, color: '#000' }}> {valueTextString} </Text></View> : <View></View>}
            </ScrollView>
            {contentSpeech}
        </Container>
    );
}

export default Main;