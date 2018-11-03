import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
// import { Icon } from 'expo';
import Colors from "../constants/Colors";
import { MonoText } from '../components/StyledText';
// import Icon from 'react-native-vector-icons/FontAwesome';

class CustomHeader extends Component {
    constructor (props) {
        super();
      }
    
    render() {
        return (
            <View style={styles.container}> 
            <View style={styles.iconsWrapper}>
            
            <View style={styles.tools}>
            {/* didn't work <Icon.Ionicons name="circle-with-plus" size={32}  style={{ textAlign: 'right' }} color="white" />   */}
            <TouchableOpacity activeOpacity = { .5 }  onPress = {this.props.onNewClicked}>

            <Image  
            
            style={styles.addIcon} source={require( '../../assets/images/icons/plus.png')} />     
            </TouchableOpacity>   
            {/* <Icon.Ionicons style={styles.addIcon}  name="md-checkmark-circle" size={32}  color="white"/>   */}
            <Image  source={require( '../../assets/images/icons/checkmark-circle.png')} />
            </View>

            {/* <Icon.Ionicons name="md-menu" size={32} color="white" onPress={() => this.props.drawerOpen()} />   */}
            <Image source= {require( '../../assets/images/icons/menu.png')}/>
    

            </View>
            <View  />
            {/* style={{ flex: 0.5}} */}
            <Text  style={styles.title}>{this.props.title}</Text>
          </View>
            // <Header style={styles.header}
            // rightComponent={
            //     <View>
            //   <Icon.Ionicons
            //     name="md-menu"
            //             size={26}
            //            style={{ marginBottom: -3 }}
            //            color="white"
            //         //    onPress={() => this.props.drawerOpen()}
            //          />            
            //          <UniversalText>{this.props.title}</UniversalText>
            //          </View>
            //          }>
                
                      
            //         {/* <Ionicons name="md-checkmark-circle" size={32} color="green
            //     " onPress={() => this.props.drawerOpen()} /> */}
         
            // </Header>
        );
    }
}
export default CustomHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.brand,
        height: 116
    },
    title : {
        textAlign: 'right',
        color: Colors.primary,
        fontSize: 30,
        marginRight: 13
      },
iconsWrapper: {
      marginTop: 36,
      marginBottom: 12,
      marginRight: 17,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    tools: {
        flexDirection: 'row',  
    },
    addIcon: {
        marginLeft: 18,
        marginRight: 30
    }
});
  