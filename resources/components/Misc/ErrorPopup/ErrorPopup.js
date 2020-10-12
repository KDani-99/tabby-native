import React from 'react';
import {
    Animated,
    View,
    Text,
    Easing,
    AppRegistry
} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import style from './style';
import { store } from '../../Redux/Store';

export default class ErrorPopup extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            progress:new Animated.Value(0),
            fadeProgress:new Animated.Value(0)
        };
        this.fadeOut = this.fadeOut.bind(this);
    }
    onLayout = event =>{
        Animated.timing(this.state.progress, {
            toValue: -event.nativeEvent.layout.width,
            duration: 15000,
            easing: Easing.linear,
            useNativeDriver:true
        }).start((e)=>{
            if(e.finished === true)
                this.fadeOut();
        });
    }
    fadeOut()
    {
        Animated.timing(this.state.fadeProgress, {
            toValue: -500,
            duration: 2500,
            easing: Easing.linear,
            useNativeDriver:true
        }).start((e)=>{
            store.dispatch({
                type:'error::hide'
            });
        });
    }
    render()
    {
        return(
            <Animated.View onLayout={this.onLayout} style={[style.container,{transform:[{translateY:this.state.fadeProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                })}]}]}>
                <View style={style.innerContainer}>
                    <Icon name='alert-circle-outline' width={28} height={28} fill={'#e74c3c'}/>
                    <Text style={style.text}>{this.props.text}</Text>
                </View>       
                <Animated.View style={[style.showProgress,{
                        transform:[{translateX:this.state.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                            })}]
                    }]}
                    />
            </Animated.View>
        );
    }
}
AppRegistry.registerComponent('ErrorPopup',()=>ErrorPopup);