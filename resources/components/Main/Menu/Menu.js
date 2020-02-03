import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import {AppRegistry} from 'react-native';
import style from './MenuStyle';
import { connect } from 'react-redux';
import { Icon } from 'react-native-eva-icons';
import Ripple from 'react-native-material-ripple';

class Menu extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            selected:0,
            language:props.language,
            selectedTheme:props.selectedTheme
        };
        this.selectPage = this.selectPage.bind(this);
    }
    static getDerivedStateFromProps(props,state)
    {
        let changes = {};

        if(state.language !== props.language)
            changes.language = props.language;
        if(state.selectedTheme !== props.selectedTheme)
            changes.selectedTheme = props.selectedTheme;

        return changes;
    }
    selectPage(index)
    {
        if(index === this.state.selected) return;
        this.setState({selected:index});
        this.props.changeWindow(index);
    }
    render()
    {
        return(
            <View>
                <View style={style.menu}>
                    <Ripple style={style.menuButton} onPress={()=>this.selectPage(0)} rippleColor={this.state.selectedTheme}>      
                        {
                            this.state.selected === 0 
                            ?
                            <Icon name='calendar' width={28} height={28} fill={this.state.selectedTheme}/>
                            :
                            <Icon name='calendar-outline' width={28} height={28} fill={'rgb(56, 62, 83)'}/>
                        }                 
                        <Text style={[style.menuText,{color:this.state.selected === 0 ? this.state.selectedTheme : 'rgb(56, 62, 83)'}]}>{this.state.language.timetable}</Text>
                    </Ripple>
                    <Ripple style={style.menuButton} onPress={()=>this.selectPage(1)} rippleColor={this.state.selectedTheme}> 
                        {
                            this.state.selected === 1
                            ?
                            <Icon name='checkmark-circle-2' width={28} height={28} fill={this.state.selectedTheme}/>
                            :
                            <Icon name='checkmark-circle-2-outline' width={28} height={28} fill={'rgb(56, 62, 83)'}/>
                        }     
                        <Text style={[style.menuText,{color:this.state.selected === 1 ? this.state.selectedTheme : 'rgb(56, 62, 83)'}]}>{this.state.language.tasks}</Text>
                    </Ripple>
                    <Ripple style={style.menuButton} onPress={()=>this.selectPage(2)} rippleColor={this.state.selectedTheme}> 
                        {
                            this.state.selected === 2
                            ?
                            <Icon name='settings' width={28} height={28} fill={this.state.selectedTheme}/>
                            :
                            <Icon name='settings-outline' width={28} height={28} fill={'rgb(56, 62, 83)'}/>
                        }    
                        <Text style={[style.menuText,{color:this.state.selected === 2 ? this.state.selectedTheme : 'rgb(56, 62, 83)'}]}>{this.state.language.settings}</Text>
                    </Ripple>
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent("Menu",()=>Menu);

const mapStateToProps = state=>({
    language:state.Language.languages[state.Language.languages.findIndex(elem=>elem.code === state.Main.selectedLanguage)].navigation,
    selectedTheme:state.Main.selectedTheme
});

export default connect(mapStateToProps)(Menu);