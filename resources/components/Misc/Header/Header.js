import React from 'react';
import {
    View,
    Text,
    AppRegistry
} from 'react-native';

import CommonStyle from '../CommonStyle';
import style from './style';

const Header = (props)=>{
    return(
        <View style={style.container}>
            <Text style={[style.header,CommonStyle.textHeader]}>{props.header}</Text>
            <Text style={style.description}>{props.children}</Text>
        </View>
    )
};

AppRegistry.registerComponent('Header',()=>Header);

export default Header;