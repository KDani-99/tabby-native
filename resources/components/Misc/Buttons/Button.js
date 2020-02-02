import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {Icon} from 'react-native-eva-icons';

import style from './style';

const Button = props => {
    return(
        <Ripple style={style.row} rippleColor={props.color} onPress={props.onPress}>
            <View style={[style.rowBg,{backgroundColor:props.color}]}></View>
            <View style={style.iconContainer}>
                <View style={[style.innerBg,{
                backgroundColor:props.color
            }]}></View>
                <Icon name={props.iconName} width={28} height={28} fill={props.color}/>
            </View>
            <Text style={[style.rowText,{color:props.color}]}>{props.text}</Text>
        </Ripple>
    );
};

export default Button;