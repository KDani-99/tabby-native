import React from 'react';
import {
    AppRegistry,
    Animated,
    View,
    Text,
    Linking,
    ScrollView
} from 'react-native';

import Header from '../Misc/Header/Header';
import Section from '../Misc/Section/Section';

import {connect} from 'react-redux';
import { Icon } from 'react-native-eva-icons';
import NestedScrollView from 'react-native-nested-scroll-view';
import Ripple from 'react-native-material-ripple';
import {store, persistor} from '../Redux/Store';
import Dropdown from '../Misc/DropDown/DropDown';

import urls from '../../settings/urls.json';

import CommonStyle from '../Misc/CommonStyle';
import style from './style';

class Settings extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            selectedTheme:props.selectedTheme,
            selectedWeek:props.selectedWeek,
            progress:new Animated.Value(0.01),
            language:props.languages[props.languages.findIndex(elem=>elem.code === props.selectedLanguage)].menu.settings,
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
        if(props.selectedLanguage !== state.selectedLanguage)
        {
            changes.language = props.languages[props.languages.findIndex(elem=>elem.code === props.selectedLanguage)].menu.settings;
            changes.selectedLanguage = props.selectedLanguage;
        }
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
        if(lang === this.state.selectedLanguage) return;
        
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
                <ScrollView>
                    <Header header={this.state.language.header}>{this.state.language.description}</Header>
                    <Section header={this.state.language.selectedWeek}>
                        <Dropdown border={false} header={this.state.selectedWeek} content={this.state.weeks} select={this.selectWeek} style={style.weekDropdown} textStyle={style.weekDropdownText}/>
                    </Section>
                    <Section header={this.state.language.language}>
                        <NestedScrollView style={{maxHeight:105}}>
                        {
                            this.props.languages.map((elem,index)=>{
                                return <LanguageItem key={`lang#${index}`} name={elem.language} isSelected={this.state.selectedLanguage === elem.code} onPress={()=>this.selectLanguage(elem.code)} />;
                            })
                        }
                        </NestedScrollView>
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
                        <Text style={[style.deleteSavesText,{color:'#6e5494'}]}>{this.state.language.source}</Text>
                    </Ripple>
                </ScrollView>
            </Animated.View >
        );
    }
}

const LanguageItem = props =>{
    return(
        <Ripple style={style.language} onPress={props.onPress}>
            <Text style={[style.languageText,CommonStyle.textLight]}>{props.name}</Text>
            {props.isSelected && <Icon name='checkmark-circle-2-outline' width={18} height={18} fill='rgb(56, 62, 83)'/>}
        </Ripple>
    );
};

AppRegistry.registerComponent("Settings",()=>Settings);

const mapStateToProps = state=>({
    selectedTheme:state.Main.selectedTheme,
    weeks:Object.keys(state.Timetable?.weeks),
    selectedWeek:state.Main.selectedWeek,
    selectedLanguage:state.Main.selectedLanguage,
    languages:state.Language.languages
});

export default connect(mapStateToProps)(Settings);