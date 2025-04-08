import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Styles } from '../constants';

const Auth = () => {
  const navigation = useNavigation();

    return (
        <View style={Styles.container}>
            <Text>Auth Screen</Text>
        </View>
    );
};

export default Auth;