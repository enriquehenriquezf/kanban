import React from 'react';
import { View, Text } from 'react-native';
import { Styles } from '../constants';
import { useNavigation } from '@react-navigation/native';

const Board = () => {
    const navigation = useNavigation();
    
    return (
        <View style={Styles.container}>
            <Text>Board Screen</Text>
        </View>
    );
};

export default Board;