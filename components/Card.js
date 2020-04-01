import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export function BasicCard({ children, styleCard }) {
    return (
        <View style={[{
            width: '100%',
            alignItems: 'center',
            alignContent: 'center',
        }, styleCard]}>
            <View style={{
                width: '90%',
                borderRadius: 20,
                backgroundColor: 'white',
                shadowRadius: 6,
                shadowOpacity: 0.5,
                elevation: 3,
            }}>
                {children}
            </View>
        </View>
    );
}

export function AdviceCard({ onPress, data }) {
    const { title, formattedText, imageUri, titleButton, query } = data;
    return (
        <BasicCard styleCard={{ marginTop: 10, height: 300 }}>
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
            <TouchableOpacity style={{
                padding: 5,
            }} onPress={onPress.bind(this, query)}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#000' }}>{titleButton}</Text>
            </TouchableOpacity>
        </BasicCard>
    );
}

export function BMICard({ data }) {
    const { height, weight, BMI, imageUri, classify } = data;
    return (
        <BasicCard styleCard={{ marginTop: 10, height: 300 }}>
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
                    <View style={{
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        paddingHorizontal: 12,
                        paddingVertical: 5,
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18, color: 'white', textAlign: 'left' }}>Chiều cao: {height} cm</Text>
                            <Text style={{ fontSize: 18, color: 'white', textAlign: 'left' }}>Cân nặng: {weight} kg</Text>
                        </View>
                        <Text style={{ fontSize: 18, color: 'white', textAlign: 'left' }}>Chỉ số BMI: {BMI.toFixed(2)}</Text>
                    </View>
                </ImageBackground>
            </View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#000' }}>{classify}</Text>
        </BasicCard>
    );
}

export function CareCard({ Data }) {
    return (
        <BasicCard styleCard={{ marginVertical: 10 }}>
            {Data.map(result => {
                return (
                    <View key={result._id} style={{ margin: 10 }}>
                        <Text style={{ marginVertical: 5, color: '#000', fontWeight: 'bold', fontSize: 18 }}>{result.title}</Text>
                        <View style={{ width: '100%', height: 30, backgroundColor: '#d8d8d8', borderRadius: 20, justifyContent: 'center' }}>
                            <LinearGradient style={{ width: `${result.percentAdded}%`, height: '100%', borderRadius: 20, position: 'absolute' }} colors={['#F2709C', '#FF9472']} />
                            <Text style={{ textAlign: 'center', color: '#000', fontWeight: 'bold', fontSize: 18 }}>{result.added}</Text>
                        </View>
                    </View>
                );
            })}
        </BasicCard>
    );
}

export function FoodCard({ data }) {
    const { imageUrl, typeFood, name, nutrition, number } = data;

    return (
        <BasicCard>
            <Image source={{ uri: imageUrl }} style={{ width: '100%', height: 200, borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
            <View style={{ padding: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ color: '#000', fontWeight: '600', fontSize: 22 }}>Tên: {name}</Text>
                    <Text style={{ color: '#000', fontWeight: '600', fontSize: 22 }}>SL: {number}</Text>
                </View>
                <Text style={{ color: '#000', fontWeight: '600', fontSize: 22, textAlign: 'center' }}>Loại: {typeFood}</Text>
            </View>
            <Text style={{ color: '#000', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Mức dinh dưỡng</Text>
            {
                nutrition.map(reslut => (
                    <View key={reslut} style={{ marginVertical: 10, marginHorizontal: 20, borderColor: '#ccc', borderWidth: 2, padding: 10 }}>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: 16 }}>{reslut}</Text>
                    </View>
                ))
            }
        </BasicCard >
    );
}