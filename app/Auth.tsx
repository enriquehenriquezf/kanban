import React, {useState} from 'react';
import { KeyboardAvoidingView, Text, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Styles, Images, Spacing } from '../constants';

const Auth = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                onChangeText={text => setEmail(text)}
                defaultValue={email}
                style={[Styles.input, Spacing.m('b', 4)]}
            />

            <TextInput
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                defaultValue={password}
                style={[Styles.input, Spacing.m('b', 6)]}
            />

            {/* LOGIN BUTTON */}
            <TouchableOpacity
                style={[Styles.button, Spacing.m('b', 4)]}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={Styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            {/* SIGN UP LINK */}
            <Text style={[Styles.label, Spacing.m('b', 8)]}>¿No tienes cuenta? <Text style={Styles.textLink} onPress={() => navigation.navigate('Register')}>Regístrate</Text></Text>

        </KeyboardAvoidingView>
    );
};

export default Auth;