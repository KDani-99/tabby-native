import React from 'react';
import {
    View,
    Text,
    AppRegistry
} from 'react-native';
import * as Progress from 'react-native-progress';
import {version} from '../../../settings/settings.json';
import style from './style.js';

const Loader = () => {
    return(
        <View style={style.container}>
            <Progress.CircleSnail size={75} color={['rgb(3,102,252)', 'rgb(250,94,98)', 'rgb(39,174,96)','rgb(137,128,245)','rgb(255,186,8)']} />
            <Text style={style.text}>Loading Tabby...</Text>
            <Text style={[style.text,style.version]}>Version {version}</Text>
        </View>
    );
};

AppRegistry.registerComponent('Loader',()=>Loader);

export default Loader;