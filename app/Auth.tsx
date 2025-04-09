import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView, Text, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Styles, Images, Spacing, Colors } from '../constants';

const Auth = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState<string>('');
    const [validEmail, setValidEmail] = useState<boolean | null>(null);
    const [password, setPassword] = useState<string>('');
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
    const [validPassword, setValidPassword] = useState<boolean | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [loginDisabled, setLoginDisabled] = useState<boolean>(true);

    /**
     * Function to handle the validation of the password input
     * @param text - Email input value
     * @returns - Validates the email format and updates the state accordingly
     */
    const handleEmailValidation = (text: string) => {
        setEmail(text);

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setValidEmail(false);
        }
        else {
            setValidEmail(true);
        }
    }

    /**
     * Function to handle the validation of the password input
     * @param text - Password input value
     * @returns - Validates the password format and updates the state accordingly
     */
    const handlePasswordValidation = (text: string) => {
        setPassword(text);

        const regLetter = /[a-zA-Z]/i;
        const regNumber = /[0-9]/i;

        if (text.length < 6) {
            setValidPassword(false);
            setPasswordError('La contraseña debe tener al menos 6 caracteres');
        }
        else if (regLetter.test(text) === false) {
            setValidPassword(false);
            setPasswordError('La contraseña debe contener al menos una letra');
        }
        else if (regNumber.test(text) === false) {
            setValidPassword(false);
            setPasswordError('La contraseña debe contener al menos un número');
        }
        else {
            setValidPassword(true);
        }
    }

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
    const Login = () => {
        if (!loginDisabled) {
            //TODO: validate credentials with backend
            console.log(email, password);
            //TODO: Save credentials in Redux
            navigation.navigate('Home');
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={Styles.container}>

            {/* LOGO, TITLE AND SLOGAN */}
            <Image source={Images.logo} style={[Spacing.m('b', 4), {width: 92, height: 92}]} />
            <Text style={[Styles.text, Styles.h1, Spacing.m('b', 2)]}>Bienvenido a KanBan App</Text>
            <Text style={[Styles.label, Spacing.m('b', 8)]}>Gestiona tus tareas de manera eficiente</Text>

            {/* CREDENTIALS INPUTS */}
            <TextInput
                placeholder="Correo electrónico"
                keyboardType='email-address'
                onChangeText={handleEmailValidation}
                onEndEditing={() => handleEmailValidation(email)}
                defaultValue={email}
                style={[Styles.input, Spacing.m('b', 4), (validEmail == null ? '' : validEmail ? Styles.inputSuccess : Styles.inputError)]}
            />

            <TextInput
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={handlePasswordValidation}
                onEndEditing={() => handlePasswordValidation(password)}
                defaultValue={password}
                style={[Styles.input, Spacing.m('b', validPassword == false ? 1 : 6), (validPassword == null ? '' : validPassword ? Styles.inputSuccess : Styles.inputError)]}
            />
            {!validPassword && <Text style={[Styles.errorMessage, Spacing.m('b', 6)]}>{passwordError}</Text>}

            {/* LOGIN BUTTON */}
            <TouchableOpacity
                disabled={loginDisabled}
                style={[Styles.button, Spacing.m('b', 4), (loginDisabled && Styles.buttonDisabled)]}
                onPress={() => Login()}
            >
                <Text style={Styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            {/* SIGN UP LINK */}
            <Text style={[Styles.label, Spacing.m('b', 8)]}>¿No tienes cuenta? <Text style={Styles.textLink} onPress={() => navigation.navigate('Register')}>Regístrate</Text></Text>

        </KeyboardAvoidingView>
    );
};

export default Auth;