import React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    AppRegistry
} from 'react-native';
import { Provider } from 'react-redux'
import LanguageLoader from 'react-native-language-loader';
import Menu from './Menu/Menu';
import Settings from '../Settings/Settings';
import Tasks from '../Tasks/Tasks';
import Timetable from '../Timetable/Timetable';
import ErrorPopup from '../Misc/ErrorPopup/ErrorPopup';
import Loader from './Loader/Loader';
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from '../Redux/Store';

const style = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column-reverse',
        justifyContent:'space-between',
        backgroundColor:'white'
    }
});

export default class Main extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            loaded:false,
            selected:0,
            error:null
        };
        this.unsubscribe = null;
        this.changeWindow = this.changeWindow.bind(this);

    }
    UNSAFE_componentWillMount = async()=>
    {
        await LanguageLoader.loadLanguagesAsync()
        .then(languages=>{
            store.dispatch({
                type:'language::load',
                languages
            });
        })
        .catch(exception=>{
            store.dispatch({
                type:'error::show',
                error:{
                    text:'Could not load any language'
                }
            })
        });
        this.setState({loaded:true});
    }
    componentDidMount()
    {
        this.unsubscribe = store.subscribe(()=>{
            this.setState({error:store.getState().Main.error});
        });
    }
    componentWillUnmount()
    {
        this.unsubscribe();
    }
    changeWindow(index)
    {
        this.setState({selected:index});
    }
    render()
    {
        return(
            <Provider store={store}>
                    <PersistGate loading={<Loader />} persistor={persistor}>
                        {this.state.error !== null && <ErrorPopup text={this.state.error.text}/>}
                        {
                            this.state.loaded ?
                            <View>
                                <StatusBar backgroundColor="white" barStyle="dark-content" />
                                <View style={style.container}>
                                    <Menu changeWindow={this.changeWindow}/>
                                    {
                                        this.state.selected === 0 &&
                                        <Timetable />
                                    }   
                                    {
                                        this.state.selected === 1 &&
                                        <Tasks />
                                    }    
                                    {
                                        this.state.selected === 2 &&
                                        <Settings />
                                    }    
                                </View>    
                            </View>
                            :
                            <Loader />
                        }            
                    </PersistGate>
            </Provider>
        );
    }
}

AppRegistry.registerComponent("Main",()=>Main);