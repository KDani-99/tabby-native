import React from 'react';
import {
    AppRegistry,
    View, 
    Text
} from 'react-native';
import style from './style';
import { Icon } from 'react-native-eva-icons';
import { connect } from 'react-redux';
import Ripple from 'react-native-material-ripple';

class Day extends React.Component
{
    constructor(props)
    {
        super();
        this.state = {
            selectedTheme:props.selectedTheme,
            showActivity:false
        };

        this.toggleActivity = this.toggleActivity.bind(this);
    }
    componentWillReceiveProps(props)
    {
        this.setState({selectedTheme:props.selectedTheme});
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
                <Ripple style={style.container} rippleColor={this.state.selectedTheme} onPress={this.toggleActivity}>
                    <View style={style.headerContainer}>
                        <Text style={[style.header,{color:this.state.selectedTheme}]}>{this.props.header}</Text>
                        <View style={[style.mark,{backgroundColor:this.state.selectedTheme}]}>
                        
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
                        <ActivityButton color={this.state.selectedTheme} text={'Edit'} iconName={'edit-outline'} onPress={this.props.openWindow}/>
                        <ActivityButton color={'#e74c3c'} text={'Delete'} iconName={'trash-2-outline'} onPress={this.props.remove}/>
                    </View>
                }
            </View>
        );
    }
}

const ActivityButton = props => {
    return(
        <Ripple style={style.row} rippleColor={props.color} onPress={props.onPress}>
            <View style={[style.rowBg,{backgroundColor:props.color}]}></View>
            <View style={style.iconContainer}>
                <View style={[style.innerBg,{
                backgroundColor:props.color
            }]}></View>
                <Icon name={props.iconName} width={28} height={28} fill={props.color}/>
            </View>
            <Text style={[style.rowText,{color:props.color}]}>{props.text}</Text>
        </Ripple>
    );
};

AppRegistry.registerComponent("Day",()=>Day);

const mapStateToProps = state =>({
    selectedTheme:state?.Main?.selectedTheme,
});

export default connect(mapStateToProps)(Day);