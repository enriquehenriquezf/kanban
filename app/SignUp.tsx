import React, { useEffect, useState } from 'react';
import { View, Text, BackHandler, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Spacing, Styles } from '@/constants';
import { useValidation } from '@/hooks/useValidation';
import { AuthSignUpType, InputType } from '@/types';
import DynamicInput from '@/components/DynamicInput';
import { api } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
    const navigation = useNavigation();

    const [isSelectionModeEnabled, setIsSelectionModeEnabled] = useState(false);
    const { state: name, valid: validName, error: nameError, handleValidation: handleNameValidation } = useValidation(InputType.TEXT);
    const { state: lastName, valid: validLastName, error: lastNameError, handleValidation: handleLastNameValidation } = useValidation(InputType.TEXT);
    const { state: email, valid: validEmail, error: emailError, handleValidation: handleEmailValidation } = useValidation(InputType.EMAIL);
    const { state: password, valid: validPassword, error: passwordError, handleValidation: handlePasswordValidation } = useValidation(InputType.PASSWORD);
    const { state: password2, valid: validPassword2, error: password2Error, handleValidation: handlePassword2Validation } = useValidation(InputType.PASSWORD);

    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
    const [signUpDisabled, setSignUpDisabled] = useState<boolean>(true);

    useEffect(() => {
        handleSignUpDisabled();
    }, [validName, validLastName, validEmail, validPassword, validPassword2]);

    /**
     * Function to handle the SignUp button state
    */
    const handleSignUpDisabled = () => {
        if (validName && validLastName && validEmail && validPassword && validPassword2 && password == password2) {
            setSignUpDisabled(false);
        } else {
            setSignUpDisabled(true);
        }
    }

    /**
     * Function to handle the singUp button action
     * @returns - Navigates to the home screen if the singUp is successful
     */
    const SignUp = async () => {
        if (!signUpDisabled) {
            //TODO: validate credentials with backend
            const body: AuthSignUpType = {
                name: name,
                lastName: lastName,
                email: email,
                password: password,
                password2: password2,
            };
            // console.log(body);
            //TODO: Save credentials in Redux
            const response = await api().signUp(body);
            // console.log(response)
            AsyncStorage.setItem('USER', JSON.stringify(response.user));
            response.success && navigation.reset({index: 0, routes: [{name: 'Home', params: response.user}]});
            !response.success && Alert.alert('Datos inválidos', 'No fue posible registrar el usuario')
        }
    }

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled
                style={[Styles.container, Spacing.m('t', 15), { justifyContent: 'flex-start' }]}
            >
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
                    {/* TITLE */}
                    <Text style={[Styles.text, Styles.h1, Spacing.m('b', 2)]}>Registra tus datos:</Text>

                    {/* NAME */}
                    <DynamicInput
                        label="Nombres"
                        placeholder='John'
                        text={name}
                        valid={validName}
                        error={nameError}
                        type={InputType.TEXT}
                        onHandleText={handleNameValidation}
                    />

                    {/* LAST NAME */}
                    <DynamicInput
                        label="Apellidos"
                        placeholder='Doe'
                        text={lastName}
                        valid={validLastName}
                        error={lastNameError}
                        type={InputType.TEXT}
                        onHandleText={handleLastNameValidation}
                    />

                    {/* EMAIL */}
                    <DynamicInput
                        label="Correo electrónico"
                        placeholder='john-doe@example.com'
                        text={email}
                        valid={validEmail}
                        error={emailError}
                        type={InputType.EMAIL}
                        onHandleText={handleEmailValidation}
                    />

                    {/* PASSWORD */}
                    <DynamicInput
                        key={"pass"}
                        id={"pass"}
                        label="Contraseña"
                        placeholder='Escriba su contraseña'
                        text={password}
                        valid={validPassword}
                        error={passwordError}
                        type={InputType.PASSWORD}
                        onHandleText={handlePasswordValidation}
                    />

                    {/* CONFIRM PASSWORD */}

                    <DynamicInput
                        key={"pass2"}
                        id={"pass2"}
                        label="Confirmar contraseña"
                        placeholder='Vuelva a escribir su contraseña'
                        text={password2}
                        valid={validPassword2}
                        error={password2Error}
                        type={InputType.PASSWORD}
                        onHandleText={handlePassword2Validation}
                    />

                    {/* SIGN UP BUTTON */}
                    <TouchableOpacity
                        disabled={signUpDisabled}
                        style={[Styles.button, Spacing.m('b', 4), Spacing.m('t', 2), (signUpDisabled && Styles.buttonDisabled)]}
                        onPress={() => SignUp()}
                    >
                        <Text style={Styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>

                    {/* BACK TO LOGIN BUTTON */}
                    <TouchableOpacity
                        style={[Styles.button, Spacing.m('b', 4), Styles.buttonOutline]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[Styles.buttonText, Styles.buttonTextOutline]}>Regresar al inicio de sesión</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default SignUp;