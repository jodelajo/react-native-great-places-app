import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function MapScreen() {
    return <View><Text>MapScreen</Text></View>
}


export const screenOptionsMap = navData => {
    return {
        headerTitle: 'Map',
        // headerRight: () => (
        //     <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        //         <Item title="All Places"
        //         iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        //         onPress={() => 
        //         navData.navigation.navigate('NewPlace')}
        //         />
        //     </HeaderButtons>
        // )
    }
}

const styles=StyleSheet.create({

})