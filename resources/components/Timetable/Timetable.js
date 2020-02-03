import React from 'react';
import {
    AppRegistry,
    Animated,
    View,
    ScrollView
} from 'react-native';

import Header from '../Misc/Header/Header';

import {connect} from 'react-redux';

import Ripple from 'react-native-material-ripple';
import Day from './Day/Day';
import { Icon } from 'react-native-eva-icons';
import {store} from '../Redux/Store';
import InputWindow from '../Misc/InputWindow/InputWindow';
import EmptyPage from '../Misc/EmptyPage/EmptyPage';

import style from './style';

class Timetable extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            selectedTheme:props.selectedTheme,
            selectedLanguage:props.selectedLanguage,
            showAdd:false,
            progress:new Animated.Value(0.01),
            data:props.data,
            editData:null,
            showEdit:true,
            selectedWeek:props.selectedWeek,
            language:props.language
        };
        this.showAddWindow = this.showAddWindow.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }
    componentDidMount()
    {
        Animated.spring(this.state.progress, {toValue: 1,useNativeDriver: true}).start();
    }
    static getDerivedStateFromProps(props,state)
    {
        let changes = {};

        if(state.selectedLanguage !== props.selectedLanguage)
            changes.selectedLanguage = props.selectedLanguage;
        if(state.selectedTheme !== props.selectedTheme)
            changes.selectedTheme = props.selectedTheme;
        if(state.selectedWeek !== props.selectedWeek)
            changes.selectedWeek = props.selectedWeek;
        
        changes.data = props.data;

        return changes;
    }
    showAddWindow(show = true,data = null)
    {
        this.setState({showAdd:show,editData:data});
    }
    add(lesson = {})
    {
        store.dispatch({
            type:'lesson::save',
            week:lesson.week,
            day:lesson.day,
            data:lesson.data
        });
    }
    remove(data = {})
    {
        store.dispatch({
            type:'lesson::delete',
            week:this.state.selectedWeek,
            day:data.day,
            index:data.index
        });
    }
    render()
    {
        let data = Object.keys(this.state.data);
        return(
            <Animated.View style={[style.container,{transform:[{scale:this.state.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                })
            }]}]}>
                <View style={style.wrapper}>
                <Header header={`${this.state.language.header} ${this.state.selectedWeek}`}>{this.state.language.description}</Header>
                </View>
                {
                    data.length === 0 
                    ?
                    <EmptyPage text={`${this.state.language.notables} ${this.state.selectedWeek}`} selectedTheme={this.state.selectedTheme}/>
                    :
                    <ScrollView style={style.containerInner}>
                        {
                            data.map((elem,index)=>{
                                return <Day key={`day#${index}`} day={elem} content={this.state.data[elem]} openWindow={this.showAddWindow} remove={this.remove}/>
                            })
                        }
                    </ScrollView>
                }
                <Ripple rippleCentered={true} rippleColor={'white'}  style={[style.taskBtn,{backgroundColor:this.state.selectedTheme}]} onPress={this.showAddWindow}>
                    <Icon name='plus-outline' width={28} height={28} fill={'white'}/>
                </Ripple>
                {this.state.showAdd && <InputWindow selectedTheme={this.state.selectedTheme} editData={this.state.editData} close={this.showAddWindow} add={this.add} selectedWeek={this.state.selectedWeek}/>}
            </Animated.View>
        );
    }
}

AppRegistry.registerComponent("Timetable",()=>Timetable);

const mapStateToProps = state=>({
    selectedTheme:state.Main.selectedTheme,
    selectedLanguage:state.Main.selectedLanguage,
    language:state.Language.languages[state.Language.languages.findIndex(elem=>elem.code === state.Main.selectedLanguage)].menu.timetable,
    selectedWeek:state.Main.selectedWeek,
    data:typeof state.Timetable.weeks[state.Main.selectedWeek] !== 'object' ? [] : state.Timetable.weeks[state.Main.selectedWeek]
});

export default connect(mapStateToProps)(Timetable);