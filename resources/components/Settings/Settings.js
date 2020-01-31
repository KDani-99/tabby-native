import React from 'react';
import {
    AppRegistry,
    Animated,
    View,
    Text,
} from 'react-native';

import Header from '../Misc/Header/Header';
import Section from '../Misc/Section/Section';

import {connect} from 'react-redux';
import { Icon } from 'react-native-eva-icons';

import Ripple from 'react-native-material-ripple';
import style from './style';
import {store} from '../Redux/Store';

class Settings extends React.Component
{
    constructor(props)
    {
        super(props);
        console.log(props)
        this.state = {
            selectedTheme:props.selectedTheme,
            progress:new Animated.Value(0.01),
            language:props.language
        };
        this.selectTheme = this.selectTheme.bind(this);
    }
    componentDidMount()
    {
        Animated.spring(this.state.progress, {toValue: 1,useNativeDriver: true}).start();
    }
    /*componentWillReceiveProps(props)
    {
        if(props.selectedTheme)
            this.setState({selectedTheme:props.selectedTheme,language:props.language});
    }*/
    static getDerivedStateFromProps(props,state)
    {
        let changes = {};

        if(props.selectedTheme !== state.selectedTheme)
            changes.selectedTheme = props.selectedTheme;
        if(props.selectedLanguage !== state.selectedLanguage)
            changes.selectedLanguage = props.selectedLanguage;

        return Object.keys(changes).length === 0 ? null : changes;
    }
    selectTheme(theme)
    {
        if(theme === this.state.selectedTheme) return;
        store.dispatch({
            type:'settings::save',
            settings:{
                selectedTheme:theme
            }
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
                <Section header={this.state.language.selectedWeek}>
                    <Ripple style={style.language}>
                        <Text style={style.languageText}>A</Text>
                        <Icon name='checkmark-circle-2-outline' width={18} height={18} fill='rgb(56, 62, 83)'/>
                    </Ripple>
                </Section>
                <Section header={this.state.language.language}>
                    <Ripple style={style.language}>
                        <Text style={style.languageText}>English</Text>
                        <Icon name='checkmark-circle-2-outline' width={18} height={18} fill='rgb(56, 62, 83)'/>
                    </Ripple>
                    <Ripple style={style.language}>
                        <Text style={style.languageText}>Hungarian</Text>
                    </Ripple>
                </Section>
                <Section header={this.state.language.theme}>
                    <View style={style.themeContainer}>
                        <Ripple rippleCentered={true} rippleColor={'white'} style={[style.themeButton,{backgroundColor:'rgb(3,102,252)'}]} useForeground={false} onPress={()=>this.selectTheme('rgb(3,102,252)')}></Ripple>
                        <Ripple rippleCentered={true} rippleColor={'white'} style={[style.themeButton,{backgroundColor:'rgb(250,94,98)'}]} useForeground={false} onPress={()=>this.selectTheme('rgb(250,94,98)')}></Ripple>
                        <Ripple rippleCentered={true} rippleColor={'white'} style={[style.themeButton,{backgroundColor:'rgb(39,174,96)'}]} useForeground={false} onPress={()=>this.selectTheme('rgb(39,174,96)')}></Ripple>
                        <Ripple rippleCentered={true} rippleColor={'white'} style={[style.themeButton,{backgroundColor:'rgb(137,128,245)'}]} useForeground={false} onPress={()=>this.selectTheme('rgb(137,128,245)')}></Ripple>
                        <Ripple rippleCentered={true} rippleColor={'white'} style={[style.themeButton,{backgroundColor:'rgb(255,186,8)'}]} useForeground={false} onPress={()=>this.selectTheme('rgb(255,186,8)')}></Ripple>                 
                    </View>
                </Section>
                <Ripple style={style.deleteSaves}>
                    <Icon name='trash-2-outline' width={24} height={18} fill='red'/>
                    <Text style={style.deleteSavesText}>Delete Saves</Text>
                </Ripple>
                <Ripple style={[style.deleteSaves,style.git]}>
                    <Icon name='github-outline' width={24} height={18} fill='#6e5494'/>
                    <Text style={[style.deleteSavesText,{color:'#6e5494'}]}>Check out on GitHub</Text>
                </Ripple>
            </Animated.View >
        );
    }
}

AppRegistry.registerComponent("Settings",()=>Settings);

const mapStateToProps = state=>({
    selectedTheme:state?.Main?.selectedTheme,
    language:state?.Main?.languages[state?.Main?.selectedLanguage].menu.settings
});

export default connect(mapStateToProps)(Settings);