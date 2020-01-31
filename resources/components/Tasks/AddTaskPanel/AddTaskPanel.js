import React from 'react';
import {
    View,
    Animated,
} from 'react-native';
import {
    OutlinedTextField
} from 'react-native-material-textfield';
import style from './style';
import { Icon } from 'react-native-eva-icons';
import Header from '../../Misc/Header/Header';
import Ripple from 'react-native-material-ripple';

export default class AddTaskPanel extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            progress:new Animated.Value(0.01)
        };
        this.addTask = this.addTask.bind(this);
        this.close = this.close.bind(this);
    }
    componentWillMount()
    {
        Animated.spring(this.state.progress, {toValue: 1,useNativeDriver: true}).start();
    }
    addTask()
    {
        let header = this.refs._header.state.text;
        let description = this.refs._description.state.text;
        
        if(header === '' && description === '') return;

        Animated.timing(this.state.progress, {toValue: 0.01,duration:250,useNativeDriver: true}).start((e)=>{
            if(e.finished === true)
            {
                this.props.addTask(header,description);
                this.props.close(false);
            }
        });
        
    }
    close()
    {
        Animated.timing(this.state.progress, {toValue: 0.01,duration:250,useNativeDriver: true}).start((e)=>{
            if(e.finished === true)
                this.props.close(false)
        });
        
    }
    render()
    {
        return(
            <Animated.View style={[style.container,{transform:[{scale:this.state.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                })
            }]}]}>
                <Header header={'Add Task'}>Fill out the fields and click on the checkmark</Header>
                <OutlinedTextField
                    label='Header'
                    keyboardType='default'
                    tintColor={this.props.selectedTheme}
                    ref='_header'
                    inputContainerStyle={{transform:[{scale:this.state.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        })
                    }]}}
                />
                <OutlinedTextField
                    
                    multiline={true}
                    label='Description'
                    keyboardType='default'
                    tintColor={this.props.selectedTheme}
                    ref='_description'
                    inputContainerStyle={{transform:[{scale:this.state.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        })
                    }]}}
                />
                <View style={style.buttonContainer}>
                    <Ripple style={[style.button,{transform:[{scale:this.state.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        })
                    }]}]} onPress={this.close}>
                        <Icon name='close-outline' width={28} height={28} fill={'rgba(231,76,60 ,1)'}/>
                    </Ripple>
                    <Ripple style={[style.button,{transform:[{scale:this.state.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        })
                    }]}]} onPress={this.addTask}>
                        <Icon name='checkmark-outline' width={28} height={28} fill={'rgba(39,174,96 ,1)'}/>
                    </Ripple>
                </View>        
            </Animated.View>
        );
    }
}