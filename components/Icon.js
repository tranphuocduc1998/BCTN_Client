import React from 'react';

import {
    SimpleLineIcons,
    Octicons,
    MaterialIcons,
    AntDesign,
    Entypo,
    EvilIcons,
    Feather,
    FontAwesome,
    Ionicons,
    Foundation,
    MaterialCommunityIcons,
    Zocial,
} from '@expo/vector-icons';

export function Icon({ name, color = '#d0d0d1', size = 24, style, type }) {
    let I = Ionicons;
    switch (type) {
        case 'AntDesign':
            I = AntDesign;
            break;
        case 'Entypo':
            I = Entypo;
            break;
        case 'EvilIcons':
            I = EvilIcons;
            break;
        case 'Feather':
            I = Feather;
            break;
        case 'FontAwesome':
            I = FontAwesome;
            break;
        case 'Foundation':
            I = Foundation;
            break;
        case 'Ionicons':
            I = Ionicons;
            break;
        case 'MaterialCommunityIcons':
            I = MaterialCommunityIcons;
            break;
        case 'MaterialIcons':
            I = MaterialIcons;
            break;
        case 'Octicons':
            I = Octicons;
            break;
        case 'SimpleLineIcons':
            I = SimpleLineIcons;
            break;
        case 'Zocial':
            I = Zocial;
            break;
        default:
            I = Ionicons;
    }

    return (
        <I color={color} size={size} name={name} style={style} />
    );
}
