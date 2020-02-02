import {StyleSheet} from 'react-native';

const style = StyleSheet.create(
    {
        emptyTaskPanel:{
            display:'flex',flex:1,height:'100%',width:'100%',alignItems:'center',justifyContent:'center',
            opacity:0.25
        },
        emptyTaskText:{
            fontSize:16
        }
    }
);

export default style;