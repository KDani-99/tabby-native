import React from 'react';
import {
    AppRegistry,
    View, 
    Text
} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { connect } from 'react-redux';
import Ripple from 'react-native-material-ripple';
import Button from '../../Misc/Buttons/Button';

import CommonStyle from '../../Misc/CommonStyle';
import style from './style';

class Activity extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            showActivity:false
        };

        this.toggleActivity = this.toggleActivity.bind(this);
    }
    toggleActivity()
    {
        this.setState({
            showActivity:!this.state.showActivity
        });
    }
    render()
    {
        return(
            <View style={style.outerContainer}>
                <Ripple style={style.container} rippleColor={this.props.selectedTheme} onPress={this.toggleActivity}>
                    <View style={style.headerContainer}>
                        <Text style={[CommonStyle.textHeader,style.header,{color:this.props.selectedTheme}]}>{this.props.header}</Text>
                        <View style={[style.mark,{backgroundColor:this.props.selectedTheme}]}>
                        
                        </View>
                    </View>
                    <Text style={[style.text,style.space]}>{this.props.startTime} {this.props.startTime <= 12 ? 'AM' : 'PM'} - {this.props.finishTime} {this.props.finishTime <= 12 ? 'AM' : 'PM'}</Text>
                    <View style={style.room}>
                        <Text style={style.text}>{this.props.room} - </Text><Text style={style.text}>{this.props.teacher}</Text>
                    </View>
                </Ripple>
                {
                    this.state.showActivity &&
                    <View style={style.activityButtonContainer}>
                        <Button color={this.props.selectedTheme} text={'Edit'} iconName={'edit-outline'} onPress={this.props.openWindow}/>
                        <Button color={'#e74c3c'} text={'Delete'} iconName={'trash-2-outline'} onPress={this.props.remove}/>
                    </View>
                }
            </View>
        );
    }
}

AppRegistry.registerComponent("Activity",()=>Activity);

const mapStateToProps = state =>({
    selectedTheme:state?.Main?.selectedTheme,
});

export default connect(mapStateToProps)(Activity);