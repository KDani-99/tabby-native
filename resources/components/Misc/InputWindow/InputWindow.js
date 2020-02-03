import React from 'react';
import {
    View,
    Text,
    Animated,
    AppRegistry
} from 'react-native';
import {
    OutlinedTextField
} from 'react-native-material-textfield';
import style from './style';
import Header from '../../Misc/Header/Header';
import Ripple from 'react-native-material-ripple';
import DropDown from '../DropDown/DropDown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { store } from '../../Redux/Store';
import { connect } from 'react-redux';

/* Input character restriction */
const limit = {
    lessonName:45,
    classRoom:125,
    teacher:125
};

class InputWindow extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            progress:new Animated.Value(0.01),
            startHour:'',
            finishHour:'',
            language:props.language
        };

        this.days = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];
        this.weeks = 'ABCDEFGHIJKLMNOPQRSTUVWXZY'.split('');

        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.close = this.close.bind(this);
        this.saveStartHourText = this.saveStartHourText.bind(this);
        this.saveStartMinutesText = this.saveStartMinutesText.bind(this);
        this.saveFinishHourText = this.saveFinishHourText.bind(this);
        this.saveFinishMinutesText = this.saveFinishMinutesText.bind(this);
        this.saveLessonName = this.saveLessonName.bind(this);
        this.saveClassRoom = this.saveClassRoom.bind(this);
        this.saveTeacherName = this.saveTeacherName.bind(this);
        this.showError = this.showError.bind(this);
        this.validate = this.validate.bind(this);
        this.closeAnimation = this.closeAnimation.bind(this);
    }
    componentDidMount()
    {
        if(this.props.editData !== null)
        {
            // Load actual activity data
            if(this.props.editData.startTime !== null && typeof this.props.editData.startTime !== 'undefined')
            {
                let startTime = this.props.editData.startTime.split(':');
                this.refs._startH.setState({text:startTime[0]});
                this.refs._startM.setState({text:startTime[1]})
            }
            if(this.props.editData.finishTime !== null && typeof this.props.editData.finishTime !== 'undefined')
            {
                let finishTime = this.props.editData.finishTime.split(':');
                this.refs._finishH.setState({text:finishTime[0]});
                this.refs._finishM.setState({text:finishTime[1]});
            }
            if(this.props.editData.lessonName !== null)
            {
                this.refs._lessonName.setState({text:this.props.editData.lessonName});
            }
            if(this.props.editData.classRoom !== null)
            {
                this.refs._classRoom.setState({text:this.props.editData.classRoom});
            }
            if(this.props.editData.teacherName !== null)
            {
                this.refs._teacherName.setState({text:this.props.editData.teacherName});
            }
            if(this.props.editData.day !== null)
            {
                this.refs._day.setState({value:this.props.editData.day});
            }
            if(this.props.selectedWeek !== null)
            {
                this.refs._week.setState({value:this.props.selectedWeek})
            }
        }
        Animated.spring(this.state.progress, {toValue: 1,useNativeDriver: true}).start();
    }
    validate()
    {
        let startHours = this.refs._startH.value();
        if(isNaN(startHours) || startHours < 0 || startHours > 23)
        {
            this.showError('Invalid number for start hour (0-23)');
            return null;
        }

        let startMinutes = this.refs._startM.value();
        if(isNaN(startMinutes) || startMinutes < 0 || startMinutes > 59)
        {
            this.showError('Invalid number for start minutes (0-59)');
            return null;
        }

        let finishHours = this.refs._finishH.value();
        if(isNaN(finishHours) || finishHours < 0 || finishHours > 23)
        {
            this.showError('Invalid number for finish hour (0-23)');
            return null;
        }

        let finishMinutes = this.refs._finishM.value();
        if(isNaN(finishMinutes) || finishMinutes < 0 || finishMinutes > 59)
        {
            this.showError('Invalid number for finish minutes (0-59)');
            return null;
        }

        startHours = parseInt(startHours);
        startMinutes = parseInt(startMinutes);
        finishHours = parseInt(finishHours);
        finishMinutes = parseInt(finishMinutes);

        /*
        ! DEPRECATED
        if(startHours > finishHours || (startHours === finishHours && startMinutes > finishMinutes) )
        {
            this.showError('Starting time needs to be less than finish time');
            return null;
        }
        */
        let lessonName = this.refs._lessonName.value();
        if(lessonName.length > limit.lessonName)
        {
            this.showError(`Lesson name is too long (limit: ${limit.lessonName})`);
            return null;
        }

        let week = this.refs._week.state.value;
        if(this.weeks.indexOf(week) === -1)
        {
            this.showError(`Invalid week`);
            return null;
        }

        let day = this.refs._day.state.value;
        if(this.days.indexOf(day) === -1)
        {
            this.showError(`Invalid day`);
            return null;
        }

        let classRoom = this.refs._classRoom.value();
        if(classRoom.length > limit.classRoom)
        {
            this.showError(`Classroom is too long (limit: ${limit.classRoom})`);
            return null;
        }
            
        let teacherName = this.refs._teacherName.value();
        if(teacherName.length > limit.teacher)
        {
            this.showError(`Teacher name is too long (limit: ${limit.teacher})`);
            return null;
        }

        /* If every field is valid, return the values */
        return {
            startHours,
            startMinutes,
            finishHours,
            finishMinutes,
            day,
            week,
            lessonName,
            classRoom,
            teacherName
        };

    }
    add()
    {
        /* Validated data */
        let validated = this.validate();
        if(validated === null)
            return;

        /* Format object for the store */
        let lesson = {
            week:validated.week,
            day:validated.day,
            data:{
                startTime:`${validated.startHours < 10 ? `0${validated.startHours}` : validated.startHours}:${validated.startMinutes < 10 ? `0${validated.startMinutes}` : validated.startMinutes}`,
                finishTime:`${validated.finishHours < 10 ? `0${validated.finishHours}` : validated.finishHours}:${validated.finishMinutes < 10 ? `0${validated.finishMinutes}` : validated.finishMinutes}`,
                lessonName:validated.lessonName,
                classRoom:validated.classRoom,
                teacherName:validated.teacherName
            } 
        };
        /**
         * TODO: Add logic here instead of having it in parent object
         */
        this.props.add(lesson);

        this.closeAnimation();
    }
    edit()
    {
        /* Validated data */
        let validated = this.validate();
        if(validated === null)
            return;
        /* Format object for the store */
        if(validated.day === this.props.editData.day && validated.week === this.props.editData.week)
            store.dispatch({
                type:'lesson::edit',
                week:validated.week,
                day:validated.day,
                index:this.props.editData.index,
                data:{
                    startTime:`${validated.startHours < 10 ? `0${validated.startHours}` : validated.startHours}:${validated.startMinutes < 10 ? `0${validated.startMinutes}` : validated.startMinutes}`,
                    finishTime:`${validated.finishHours < 10 ? `0${validated.finishHours}` : validated.finishHours}:${validated.finishMinutes < 10 ? `0${validated.finishMinutes}` : validated.finishMinutes}`,
                    lessonName:validated.lessonName,
                    classRoom:validated.classRoom,
                    teacherName:validated.teacherName
                } 
            });
        else
        {
            store.dispatch({
                type:'lesson::delete',
                week:this.props.selectedWeek,
                day:this.props.editData.day,
                index:this.props.editData.index
            });
            store.dispatch({
                type:'lesson::save',
                week:validated.week,
                day:validated.day,
                data:{
                    startTime:`${validated.startHours < 10 ? `0${validated.startHours}` : validated.startHours}:${validated.startMinutes < 10 ? `0${validated.startMinutes}` : validated.startMinutes}`,
                    finishTime:`${validated.finishHours < 10 ? `0${validated.finishHours}` : validated.finishHours}:${validated.finishMinutes < 10 ? `0${validated.finishMinutes}` : validated.finishMinutes}`,
                    lessonName:validated.lessonName,
                    classRoom:validated.classRoom,
                    teacherName:validated.teacherName
                } 
            });
        }
        this.closeAnimation();
    }
    closeAnimation()
    {
        Animated.timing(this.state.progress, {toValue: 0.01,duration:250,useNativeDriver: true}).start((e)=>{
            if(e.finished === true)       
                this.props.close(false);
        });    
    }
    showError(text = '')
    {
        store.dispatch({
            type:'error::show',
            error:{
                text
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
    saveStartHourText(value)
    {
        let oldValue = this.refs._startH.value();

        if(isNaN(value) || value < 0 || value > 23 || value.length > 2)
        {
            this.refs._startH.setState({text:oldValue});
            return;
        }
        this.setState({startHour:value});
    }
    saveStartMinutesText(value)
    {
        let oldValue = this.refs._startM.value();

        if(isNaN(value) || value < 0 || value > 59 || value.length > 2)
        {
            this.refs._startM.setState({text:oldValue});
            return;
        }
    }
    saveFinishHourText(value)
    {
        let oldValue = this.refs._finishH.value();

        if(isNaN(value) || value < 0 || value > 23 || value.length > 2)
        {
            this.refs._finishH.setState({text:oldValue});
            return;
        }
        this.setState({finishHour:value});
    }
    saveFinishMinutesText(value)
    {
        let oldValue = this.refs._finishM.value();

        if(isNaN(value) || value < 0 || value > 59 || value.length > 2)
        {
            this.refs._finishM.setState({text:oldValue});
            return;
        }
    }
    saveLessonName(value)
    {
        let oldValue = this.refs._lessonName.value();

        if(value.length > limit.lessonName)
        {
            this.refs._lessonName.setState({text:oldValue});
            return;
        }
    }
    saveClassRoom(value)
    {
        let oldValue = this.refs._classRoom.value();

        if(value.length > limit.classRoom)
        {
            this.refs._classRoom.setState({text:oldValue});
            return;
        }
    }
    saveTeacherName(value)
    {
        let oldValue = this.refs._teacherName.value();

        if(value.length > limit.teacher)
        {
            this.refs._teacherName.setState({text:oldValue});
            return;
        }
    }
    render()
    {
        return(
            <Animated.View style={[style.container,{transform:[{scale:this.state.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                })
            }]}]} >
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} extraScrollHeight={50}>
                <Header header={this.props.editData === null ? this.state.language.headerAdd : this.state.language.headerEdit}>{this.state.language.description}</Header>
                <View style={style.inputInline}>
                    <OutlinedTextField
                        label={this.state.language.startHour}
                        keyboardType='phone-pad'
                        tintColor={this.props.selectedTheme}
                        ref='_startH'
                        suffix={this.state.startHour <= 12 ? 'AM' : 'PM'}
                        onChangeText={this.saveStartHourText}
                        containerStyle={style.startTimeInput2}
                    />
                    <OutlinedTextField
                        label={this.state.language.startMinute}
                        keyboardType='phone-pad'
                        tintColor={this.props.selectedTheme}
                        ref='_startM'
                        onChangeText={this.saveStartMinutesText}
                        containerStyle={style.startTimeInput2}
                    />
                </View>               
                <View style={style.inputInline}>
                    <OutlinedTextField
                        label={this.state.language.finishHour}
                        keyboardType='phone-pad'
                        tintColor={this.props.selectedTheme}
                        ref='_finishH'
                        suffix={this.state.finishHour <= 12 ? 'AM' : 'PM'}
                        onChangeText={this.saveFinishHourText}
                        containerStyle={style.startTimeInput2}
                    />
                     <OutlinedTextField
                        label={this.state.language.finishMinute}
                        keyboardType='phone-pad'
                        tintColor={this.props.selectedTheme}
                        ref='_finishM'
                        onChangeText={this.saveFinishMinutesText}
                        containerStyle={style.startTimeInput2}
                    />
                </View>
                <OutlinedTextField
                    multiline={true}
                    label={this.state.language.lessonName}
                    keyboardType='default'
                    tintColor={this.props.selectedTheme}
                    ref='_lessonName'
                    onChangeText={this.saveLessonName}
                    characterRestriction={limit.lessonName}
                />
                <DropDown header={this.state.language.week} content={this.weeks} ref='_week'/>
                <DropDown header={this.state.language.day} content={this.days} ref='_day'/>
                <OutlinedTextField
                    multiline={true}
                    label={this.state.language.classRoom}
                    keyboardType='default'
                    tintColor={this.props.selectedTheme}
                    ref='_classRoom'
                    characterRestriction={limit.classRoom}
                    onChangeText={this.saveClassRoom}
                />
                <OutlinedTextField
                    multiline={true}
                    label={this.state.language.teacherName}
                    keyboardType='default'
                    tintColor={this.props.selectedTheme}
                    ref='_teacherName'
                    characterRestriction={limit.teacher}
                    nChangeText={this.saveTeacherName}
                />
                <View style={style.buttonContainer}>
                    <Ripple style={style.button} onPress={this.close}>
                        <Text style={[style.buttonText,{color:'red'}]}>{this.state.language.cancel}</Text>
                    </Ripple>
                    <Ripple style={[style.button,{backgroundColor:this.props.selectedTheme}]} onPress={this.props.editData === null ? this.add : this.edit}>
                        <Text style={style.buttonText}>{this.props.editData === null ? this.state.language.add : this.state.language.edit}</Text>
                    </Ripple>
                </View>        
                </KeyboardAwareScrollView>
            </Animated.View>
        );
    }
}

AppRegistry.registerComponent("InputWindow",()=>InputWindow);

const mapStateToProps = state => ({
    language:state.Language.languages[state.Language.languages.findIndex(elem=>elem.code === state.Main.selectedLanguage)].menu.inputWindow
});

export default connect(mapStateToProps)(InputWindow)