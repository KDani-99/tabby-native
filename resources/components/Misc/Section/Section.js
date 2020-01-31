import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

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
                <View>
                    <Text style={style.header}>{this.props.header}</Text>
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