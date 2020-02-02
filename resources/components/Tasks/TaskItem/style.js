import {StyleSheet} from 'react-native';

const style = StyleSheet.create(
    {
        container:{
            position:'relative',
            zIndex:0,
            display:'flex',
            flexDirection:'column',
            width:'100%',
            paddingTop:10,
            paddingBottom:10,
            borderRadius:4,
            justifyContent:'center',
            borderBottomColor:'rgba(200,200,200,0.85)',
            borderBottomWidth:1,
            marginBottom:-1,
            overflow:'hidden'
        },
        containerAnimated:{
            position: 'absolute',
            top: 0,
            left: 0
        },
        header:{

        },
        description:{

            marginRight:42.5
        },
        done:{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            width:25,
            height:25,
            borderRadius:100,
            elevation:10,
            backgroundColor:'white',
            position: 'absolute',
            margin: 'auto',
            right:15
        },
        deleteProgress:{
            position:'absolute',
            width:'100%',
            left:0,
            bottom:0,
            height:5,
            backgroundColor:'rgba(231,76,60 ,1)'
        }
    }
);

export default style;