import React from 'react';
import {
    View, 
    Text,
    AppRegistry
} from 'react-native';

import style from './style';

import Activity from '../Activity/Activity';

AppRegistry.registerComponent('Day',()=>Day)

export default class Day extends React.Component
{
    
    render()
    {
        return(
            <View style={style.container}>
                <Text style={style.dayText}>{this.props.day}</Text>
                <View>
                    {
                        this.props.content.map((elem,index)=>{
                            return( 
                                <Activity
                                    key={`${elem.lessonName}${elem.finishTime}`} 
                                    header={elem.lessonName} 
                                    room={elem.classRoom} 
                                    teacher={elem.teacherName} 
                                    startTime={elem.startTime} 
                                    finishTime={elem.finishTime}
                                    /* param_1 = Show|Hide, param_2 = data */
                                    /* + `day` and `index`*/
                                    openWindow={()=>this.props.openWindow(true,{...elem,day:this.props.day,index})}
                                    remove={()=>this.props.remove({day:this.props.day,index})}
                                />
                            )
                        })
                    }
                </View>         
            </View>
        );
    }
}