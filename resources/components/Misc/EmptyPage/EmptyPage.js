import React from 'react';
import {
    View,
    Text,
    AppRegistry
} from 'react-native';
import style from './style';
import { Icon } from 'react-native-eva-icons';

AppRegistry.registerComponent('EmptyPage',()=>EmptyPage);

export default class EmptyPage extends React.Component
{
    render()
    {
        return(
            <View style={style.emptyTaskPanel}>
                <Icon name='folder-outline' width={100} height={100} fill={this.props.selectedTheme}/>
                <Text style={style.emptyTaskText}>{this.props.text}</Text>
            </View>
        );
    }
}