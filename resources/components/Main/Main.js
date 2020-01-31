import React from 'react';
import {
    View,
    StyleSheet,
    StatusBar
} from 'react-native';
import { Provider } from 'react-redux'

import Menu from './Menu/Menu';
import Settings from '../Settings/Settings';
import Tasks from '../Tasks/Tasks';
import Timetable from '../Timetable/Timetable';
import ErrorPopup from '../Misc/ErrorPopup/ErrorPopup';

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
            selected:0,
            error:null
        };
        this.unsubscribe = null;
        this.changeWindow = this.changeWindow.bind(this);
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
                <PersistGate loading={null} persistor={persistor}>
                    {this.state.error !== null && <ErrorPopup text={this.state.error.text}/>}
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
                </PersistGate>
            </Provider>
        );
    }
}
