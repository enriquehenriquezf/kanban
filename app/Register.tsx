import React, { useState } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Styles } from '../constants';

const Register = () => {
    const navigation = useNavigation();
    
    const [isSelectionModeEnabled, setIsSelectionModeEnabled] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            if (isSelectionModeEnabled) {
              setIsSelectionModeEnabled(false);
              return true;
            } else {
              return false;
            }
          };
    
          const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
          );
    
          return () => subscription.remove();
        }, [isSelectionModeEnabled])
    );

    return (
        <View style={Styles.container}>
            <Text>Register Screen</Text>
            <Text style={Styles.textLink} onPress={() => navigation.goBack()}>Regresar al Inicio de sesión</Text>
        </View>
    );
};

export default Register;