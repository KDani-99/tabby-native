import {StyleSheet} from 'react-native';

const style = StyleSheet.create(
    {
        container:{
            position:'absolute',
            padding:15,
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
            position:'absolute',
            right:15,
            bottom:15
        },
        button:{
            padding:10,
            borderRadius:100,
            backgroundColor:'white',
            marginLeft:10,
            elevation:5,
            overflow:'hidden'
        },
        buttonText:{

        },
        input:{
            backgroundColor:'red'
        }
    }
);

export default style;