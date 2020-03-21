import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { color } from '../constants/Theme';

export function Button({ children, onPress, disabled, right, left, style }) {

    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}
            style={[{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
                borderRadius: 30,
                flexDirection: 'row',
                shadowRadius: 6,
                shadowOpacity: 0.5,
                elevation: 10,
                padding: 15,
                borderRadius: 20,
                backgroundColor: 'white',
            }, style]}>
            {left}
            {children}
            {right}
        </TouchableOpacity>
    );
}