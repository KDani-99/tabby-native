import {StyleSheet} from 'react-native';

const style = StyleSheet.create(
    {
        container:{
            position:'absolute',
            backgroundColor:'white',
            width:'100%',
            height:'100%',
            display:'flex',
            padding:15,
            elevation:5
        },
        buttonContainer:{
            display:'flex',
            flexDirection:'row',
            alignSelf:'flex-end',
            marginBottom:10,
            marginRight:1
        },
        button:{
            padding:10,
            borderRadius:4,
            backgroundColor:'white',
            marginLeft:10,
            elevation:1,
            overflow:'hidden'
        },
        buttonText:{
            color:'white'
        },
        input:{
            backgroundColor:'red'
        },
        startTimeInput:{
            
        },
        startTimeInput2:{
            width:'48.5%',
            
        },
        inputInline:{
            width:'100%',
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'
        }
    }
);

export default style;