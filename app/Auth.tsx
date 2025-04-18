import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text, Image, TextInput, TouchableOpacity, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Styles, Images, Spacing } from '@/constants';
import { useValidation } from '@/hooks/useValidation';
import { AuthType, InputType } from '@/types';
import DynamicInput from '@/components/DynamicInput';
import { api } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Auth = () => {
    const navigation = useNavigation();

    const { state: email, valid: validEmail, error: emailError, handleValidation: handleEmailValidation } = useValidation(InputType.EMAIL);
    const { state: password, valid: validPassword, error: passwordError, handleValidation: handlePasswordValidation } = useValidation(InputType.PASSWORD);

    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
    const [loginDisabled, setLoginDisabled] = useState<boolean>(true);

    useEffect(() => {
        AsyncStorage.getItem('EMAIL').then((value) => {
            value && handleEmailValidation(value || '')
        });
    }, [])

    useEffect(() => {
        handleLoginDisabled();
    }, [validEmail, validPassword]);

    /**
     * Function to handle the login button state
    */
    const handleLoginDisabled = () => {
        if (validEmail && validPassword) {
            setLoginDisabled(false);
        } else {
            setLoginDisabled(true);
        }
    }

    /**
     * Function to handle the login button action
     * @returns - Navigates to the home screen if the login is successful
     */
    const Login = async () => {
        if (!loginDisabled) {
            const credentials: AuthType = {
                email: email,
                password: password,
            };
            // console.log(credentials);
            const response = await api().signIn(credentials);
            // console.log(response)
            //TODO: Save credentials in Redux
            AsyncStorage.setItem('USER', JSON.stringify(response.user));
            AsyncStorage.setItem('EMAIL', email);
            response.success && navigation.reset({index: 0, routes: [{name: 'Home', params: response.user}]});
            !response.success && Alert.alert('Credenciales inválidas', 'por favor intente con otras')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={Styles.container}>

                {/* LOGO, TITLE AND SLOGAN */}
                <Image source={Images.logo} style={[Spacing.m('b', 4), { width: 92, height: 92 }]} />
                <Text style={[Styles.text, Styles.h1, Spacing.m('b', 2)]}>Bienvenido a KanBan App</Text>
                <Text style={[Styles.label, Spacing.m('b', 8)]}>Gestiona tus tareas de manera eficiente</Text>

                {/* CREDENTIALS INPUTS */}
                <DynamicInput
                    label="Correo electrónico"
                    placeholder='john-doe@example.com'
                    text={email}
                    valid={validEmail}
                    error={emailError}
                    type={InputType.EMAIL}
                    onHandleText={handleEmailValidation}
                />

                <DynamicInput
                    key={"Login_pass"}
                    id={"Login_pass"}
                    label="Contraseña"
                    placeholder='Escriba su contraseña'
                    text={password}
                    valid={validPassword}
                    error={passwordError}
                    type={InputType.PASSWORD}
                    onHandleText={handlePasswordValidation}
                />

                {/* LOGIN BUTTON */}
                <TouchableOpacity
                    disabled={loginDisabled}
                    style={[Styles.button, Spacing.m('b', 4), (loginDisabled && Styles.buttonDisabled)]}
                    onPress={() => Login()}
                >
                    <Text style={Styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>

                {/* SIGN UP LINK */}
                <Text style={[Styles.label, Spacing.m('b', 8)]}>¿No tienes cuenta? {" "}
                    <Text style={Styles.textLink} onPress={() => navigation.navigate('SignUp')}>Regístrate</Text>
                </Text>

            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default Auth;