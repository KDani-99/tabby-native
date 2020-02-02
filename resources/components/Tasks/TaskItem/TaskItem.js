import React from 'react';
import {
    View,
    Text,
    Animated,
    Easing
} from 'react-native';

import { Icon } from 'react-native-eva-icons';
import Ripple from 'react-native-material-ripple';
import {store} from '../../Redux/Store';

import CommonStyle from '../../Misc/CommonStyle';
import style from './style';

export default class TaskItem extends React.Component
{
    
    constructor(props)
    {
        super(props);
        this.state = {
            selectedTheme:props.selectedTheme,
            selected:props.completed,
            progress:new Animated.Value(-1000),
            componentWidth:0,
            mainProgress:new Animated.Value(0)
        };

        this.select = this.select.bind(this);      
        this.delete = this.delete.bind(this); 
        this.stopDelete = this.stopDelete.bind(this);
        this.deleteAnimation = this.deleteAnimation.bind(this);
    }
    componentDidMount()
    {
        Animated.spring(this.state.mainProgress, {toValue: 1,useNativeDriver: true}).start();
    }
    static getDerivedStateFromProps(props,state)
    {
        let changes = {};

        if(state.completed !== props.completed)
            changes.selected = props.completed;
        
        return changes;
    }
    select()
    {
        store.dispatch({
            type:'task::complete',
            value:!this.state.selected,
            index:this.props.index
        });
    }
    delete()
    {
        Animated.timing(this.state.progress, {
            toValue: 0,
            duration: 750,
            easing: Easing.linear,
            useNativeDriver:true
          }).start((e)=>{
            if(e.finished === true)
                this.deleteAnimation();
          });
    }
    deleteAnimation()
    {
        this.props.remove(this.props.index);
        // TODO: Fix Bug
        /*Animated.spring(this.state.mainProgress, {toValue: 0,useNativeDriver: true}).start((e)=>{
            if(e.finished === true)
                this.props.remove(this.props.index);
        });*/
    }
    stopDelete()
    {
        Animated.timing(this.state.progress, {
            toValue: -this.state.componentWidth,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver:true
          }).start();
    }
    onLayout = event =>{
        this.setState({componentWidth:event.nativeEvent.layout.width,progress:new Animated.Value(-event.nativeEvent.layout.width)});
    }
    render()
    {
        return( 
            <Animated.View style={[{transform:[{scale:this.state.mainProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                })
            }]}]}>    
                <Ripple onLayout={this.onLayout} style={style.container} rippleColor={this.state.selectedTheme} onPress={this.select} delayLongPress={500} onLongPress={this.delete} onPressOut={this.stopDelete}>   
                    <Animated.View style={[style.deleteProgress,{
                        backgroundColor:this.state.selectedTheme,
                        transform:[{translateX:this.state.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                            })}]
                    }]}
                    ></Animated.View>
                    <Text style={[CommonStyle.textHeader,style.header,{color:this.state.selectedTheme}]}>{this.props.header}</Text>
                    <Text style={[style.description,{textDecorationLine:this.state.selected ? 'line-through' : 'none'}]}>{this.props.text}</Text>
                    <View style={[style.done,{backgroundColor:this.state.selected ? this.state.selectedTheme : 'white'}]}>
                        { this.state.selected && <Icon name='checkmark-outline' width={18} height={18} fill='white'/>}
                    </View>
                </Ripple>
            </Animated.View>     
        );
    }
}
