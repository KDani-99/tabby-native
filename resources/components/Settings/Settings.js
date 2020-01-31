import React from 'react';
import {
    AppRegistry,
    Animated,
    View,
    Text,
    Linking
} from 'react-native';

import Header from '../Misc/Header/Header';
import Section from '../Misc/Section/Section';

import {connect} from 'react-redux';
import { Icon } from 'react-native-eva-icons';

import Ripple from 'react-native-material-ripple';
import style from './style';
import {store, persistor} from '../Redux/Store';
import Dropdown from '../Misc/DropDown/DropDown';

import urls from '../../settings/urls.json';

class Settings extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            selectedTheme:props.selectedTheme,
            selectedWeek:props.selectedWeek,
            progress:new Animated.Value(0.01),
            language:props.languages[props.selectedLanguage].menu.settings,
            selectedLanguage:props.selectedLanguage,
            weeks:props.weeks
        };
        this.selectTheme = this.selectTheme.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
        this.deleteSave = this.deleteSave.bind(this);
    }
    componentDidMount()
    {
        Animated.spring(this.state.progress, {toValue: 1,useNativeDriver: true}).start();
    }
    static getDerivedStateFromProps(props,state)
    {
        let changes = {};

        if(props.selectedTheme !== state.selectedTheme)
            changes.selectedTheme = props.selectedTheme;
        /* Compare objects! -- ERR */
        /*if(props.language !== state.language)
            changes.language = props.language;*/
        if(props.selectedLanguage !== state.selectedLanguage)
            changes.selectedLanguage = props.selectedLanguage;
        if(props.selectedWeek !== state.selectedWeek)
            changes.selectedWeek = props.selectedWeek;
        /* Compare arrays! -- ERR */
        if(props.weeks !== state.weeks)
            changes.weeks = props.weeks;

        return changes;
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
    selectWeek(week)
    {
        store.dispatch({
            type:'settings::save',
            settings:{
                selectedWeek:week
            }
        });
    }
    selectLanguage(lang)
    {
        store.dispatch({
            type:'settings::save',
            settings:{
                selectedLanguage:lang
            }
        });
    }
    deleteSave()
    {
        store.dispatch({
            type:'PURGE'
        });
        persistor.purge();
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
                    <Dropdown border={false} header={this.state.selectedWeek} content={this.state.weeks} select={this.selectWeek} />
                </Section>
                <Section header={this.state.language.language}>
                    {
                        Object.keys(this.props.languages).map((elem,index)=>{
                            return <LanguageItem key={`lang#${index}`} name={this.props.languages[elem]['language']} isSelected={this.state.selectedLanguage === elem} onPress={()=>this.selectLanguage(elem)} />;
                        })
                    }
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
                <Ripple style={style.deleteSaves} rippleColor='red' onPress={this.deleteSave}>
                    <Icon name='trash-2-outline' width={24} height={18} fill='red' />
                    <Text style={style.deleteSavesText}>{this.state.language.deleteSave}</Text>
                </Ripple>
                <Ripple style={[style.deleteSaves,style.git]} onPress={()=>Linking.openURL(urls.git)}>
                    <Icon name='github-outline' width={24} height={18} fill='#6e5494'/>
                    <Text style={[style.deleteSavesText,{color:'#6e5494'}]}>Check repository</Text>
                </Ripple>
            </Animated.View >
        );
    }
}

const LanguageItem = props =>{
    return(
        <Ripple style={style.language} onPress={props.onPress}>
            <Text style={style.languageText}>{props.name}</Text>
            {props.isSelected && <Icon name='checkmark-circle-2-outline' width={18} height={18} fill='rgb(56, 62, 83)'/>}
        </Ripple>
    );
};

AppRegistry.registerComponent("Settings",()=>Settings);

const mapStateToProps = state=>({
    selectedTheme:state?.Main?.selectedTheme,
    weeks:Object.keys(state?.Timetable?.weeks),
    selectedWeek:state?.Main?.selectedWeek,
    selectedLanguage:state?.Main?.selectedLanguage,
    languages:state?.Main?.languages
});

export default connect(mapStateToProps)(Settings);