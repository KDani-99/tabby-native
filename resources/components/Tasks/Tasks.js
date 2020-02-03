import React from 'react';
import {
    AppRegistry,
    View,
    Animated,
    ScrollView
} from 'react-native';
import {store} from '../Redux/Store';
import Header from '../Misc/Header/Header';
import {connect} from 'react-redux';
import { Icon } from 'react-native-eva-icons';
import TaskItem from './TaskItem/TaskItem';
import AddTaskPanel from './AddTaskPanel/AddTaskPanel';
import style from './style';
import Ripple from 'react-native-material-ripple';
import EmptyPage from '../Misc/EmptyPage/EmptyPage';

class Tasks extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            selectedTheme:props.selectedTheme,
            selectedLanguage:props.selectedLanguage,
            tasks:props.tasks,
            taskCache:[],
            showAddTaskPanel:false,
            progress:new Animated.Value(0.01),
            language:props.language
        };
        this.removeTask = this.removeTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.toggleAddTaskPanel = this.toggleAddTaskPanel.bind(this);
    }
    componentDidMount()
    {
        Animated.spring(this.state.progress, {toValue: 1,useNativeDriver: true}).start();
    }
    static getDerivedStateFromProps(props, state) 
    {
        let changes = {};

        if(props.selectedTheme !== state.selectedTheme) 
            changes.selectedTheme = props.selectedTheme;
        if(props.selectedLanguage !== state.selectedLanguage)
        {
            changes.selectedLanguage = props.selectedLanguage;
            changes.language = props.language;
        }
        changes.tasks = props.tasks;

        return changes;
    }
    removeTask(index)
    {
        /*let tasks = this.state.tasks;       
        taskCache.push(tasks[index]);*/
        store.dispatch({
            type:'task::remove',
            index
        })
    }
    addTask(header,description)
    {
        store.dispatch({
            type:'task::save',
            task:{
                header,
                description,
                completed:false
            }
        })
    }
    toggleAddTaskPanel(show = true)
    {
        this.setState({showAddTaskPanel:show});
    }
    render()
    {
        return(
            <Animated.View style={[style.container,{transform:[{scale:this.state.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                })
            }]}]}>
                <View style={style.innerContainer}>
                    <Header header={this.state.language.header}>{this.state.language.description}</Header>
                    {
                        this.state.tasks.length === 0 
                        ?
                        <EmptyPage text={this.state.language.notask} selectedTheme={this.state.selectedTheme}/>
                        :                  
                        <ScrollView style={style.tasks}>
                            <View style={{padding:1}}>
                                {
                                    this.state.tasks.map((elem,index)=>{
                                        return <TaskItem selectedTheme={this.state.selectedTheme} key={`${elem.header}${typeof elem.description !== 'undefined' ? elem.description[0]: ''}`} index={index} header={elem.header} text={elem.description} completed={elem.completed} remove={this.removeTask}/>;
                                    })
                                }
                            </View>
                        </ScrollView>
                     }
                    {
                    // ! Will be made later
                    /*<Progress.Circle size={50} indeterminate={false} progress={0.85} style={style.undoTaskOuter} color={this.state.selectedTheme} borderColor={'white'} >
                        <Ripple rippleCentered={true} rippleColor={'white'} style={[style.undoTaskInner,{backgroundColor:this.state.selectedTheme}]}>
                            <Icon name='undo-outline' width={28} height={28} fill={'white'}/>
                        </Ripple>
                    </Progress.Circle>*/}
                    <Ripple rippleCentered={true} rippleColor={'white'}  style={[style.taskBtn,{backgroundColor:this.state.selectedTheme}]} onPress={this.toggleAddTaskPanel}>
                        <Icon name='plus-outline' width={28} height={28} fill={'white'}/>
                    </Ripple>
                </View>
                {this.state.showAddTaskPanel && <AddTaskPanel selectedTheme={this.state.selectedTheme} close={this.toggleAddTaskPanel} addTask={this.addTask}/>}
            </Animated.View>
        );
    }
}

AppRegistry.registerComponent("Tasks",()=>Tasks);

const mapStateToProps = state=>({
    selectedTheme:state.Main.selectedTheme,
    selectedLanguage:state.Main.selectedLanguage,
    language:state.Language.languages[state.Language.languages.findIndex(elem=>elem.code === state.Main.selectedLanguage)].menu.tasks,
    tasks:state.Tasks.tasks
});

export default connect(mapStateToProps)(Tasks);