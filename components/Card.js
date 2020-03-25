import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

export function BasicCard({ onPress, data }) {
    const { title, formattedText, imageUri, titleButton, query } = data;
    return (
        <View style={{
            height: 300,
            width: '100%',
            alignItems: 'center',
            alignContent: 'center'
        }}>
            <View style={{
                width: '90%',
                borderRadius: 20,
                shadowRadius: 6,
                shadowOpacity: 0.5,
                elevation: 10,
                backgroundColor: 'white',
            }}>
                <View style={{ flexDirection: 'row', height: '85%' }}>
                    <ImageBackground
                        borderTopLeftRadius={20}
                        borderTopRightRadius={20}
                        source={{ uri: imageUri }}
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'flex-end',
                        }}
                    >
                        {title || formattedText ? <View style={{
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            paddingHorizontal: 12,
                            paddingVertical: 5,
                        }}>
                            {title ? <Text style={{ fontSize: 18, color: 'white', textAlign: 'left' }}>{title}</Text> : <View></View>}
                            {formattedText ? <Text style={{ fontSize: 18, color: 'white', textAlign: 'left' }}>{formattedText}</Text> : <View></View>}
                        </View> : <View></View>}
                    </ImageBackground>
                </View>
                <TouchableOpacity style={{ padding: 5 }} onPress={onPress.bind(this, query)}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{titleButton}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}