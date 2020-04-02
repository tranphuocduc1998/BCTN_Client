import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { BasicCard } from './Card';
import { Icon } from '../components/Icon';
import { color } from '../constants/Theme';

export function GoogleMap({ geolocation }) {
    const { latitude, longitude } = geolocation;
    return (
        <BasicCard styleCard={{ height: 500 }}>
            <MapView
                style={{ height: '100%' }}
                provider={PROVIDER_GOOGLE} initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                <Marker title='Vị trí hiện tại của bạn' coordinate={{ latitude: latitude, longitude: longitude }}>
                    <Icon name='ios-disc' size={25} type='Ionicons' color={color.primary} />
                </Marker>


            </MapView>
        </BasicCard>
    );
}