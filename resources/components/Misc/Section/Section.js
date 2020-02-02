import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import CommonStyle from '../../Misc/CommonStyle';
import style from './style';

export default class Section extends React.Component
{
    constructor()
    {
        super();
    }
    render()
    {
        return(
            <View style={style.container}>
                <View style={style.header}>
                    <Text style={CommonStyle.textBold}>{this.props.header}</Text>
                </View>
                <View>
                    {
                        this.props.children
                    }
                </View>
            </View>
        );
    }
}