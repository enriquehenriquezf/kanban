import React from 'react';
import { View, Text } from 'react-native';
import { Styles } from '../constants';
import { useNavigation } from '@react-navigation/native';

const Table = () => {
    const navigation = useNavigation();
    
    return (
        <View style={Styles.container}>
            <Text>Table Screen</Text>
        </View>
    );
};

export default Table;