import React from 'react';
import {
    View,
    Animated,
    AppRegistry,
} from 'react-native';
import {
    OutlinedTextField
} from 'react-native-material-textfield';
import style from './style';
import { Icon } from 'react-native-eva-icons';
import Header from '../../Misc/Header/Header';
import Ripple from 'react-native-material-ripple';
import { connect } from 'react-redux';

class AddTaskPanel extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            language:props.language,
            progress:new Animated.Value(0.01)
        };
        this.addTask = this.addTask.bind(this);
        this.close = this.close.bind(this);
    }
    componentDidMount()
    {
        Animated.spring(this.state.progress, {toValue: 1,useNativeDriver: true}).start();
    }
    addTask()
    {
        let header = this.refs._header.state.text;
        let description = this.refs._description.state.text;
        if(typeof header === 'undefined' || typeof description === 'undefined' || (header === '' && description === ''))
            return;
            
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
                <Header header={this.state.language.header}>{this.state.language.description}</Header>
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
                    <Ripple style={style.button} onPress={this.close}>
                        <Icon name='close-outline' width={28} height={28} fill={'rgba(231,76,60 ,1)'}/>
                    </Ripple>
                    <Ripple style={style.button} onPress={this.addTask}>
                        <Icon name='checkmark-outline' width={28} height={28} fill={'rgba(39,174,96 ,1)'}/>
                    </Ripple>
                </View>        
            </Animated.View>
        );
    }
}

AppRegistry.registerComponent("AddTaskPanel",()=>AddTaskPanel);

const mapStateToProps = state => ({
    language:state.Language.languages[state.Language.languages.findIndex(elem=>elem.code === state.Main.selectedLanguage)].menu.addTask
});

export default connect(mapStateToProps)(AddTaskPanel);