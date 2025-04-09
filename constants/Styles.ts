import { StyleSheet } from 'react-native';
import { Colors } from './Colors';
import { Spacing } from './Spacing';

export const Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: Colors.text,
      fontSize: 16,
    },
    label: {
      color: Colors.label,
      fontSize: 16,
    },
    textLink: {
        color: Colors.link,
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    errorMessage: {
        color: Colors.error,
        fontSize: 14,
        // textAlign: 'center',
        fontStyle: 'italic',
    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: Colors.primary,
        height: 52,
        width: '80%',
        ...Spacing.p('', 3),
        borderRadius: 8,
    },
    buttonDisabled: {
        backgroundColor: Colors.primaryLight,
    },
    buttonOutline: {
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    buttonText: {
        color: Colors.textLight,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'medium',
        ...Spacing.m('y','auto'),
    },
    buttonTextOutline: {
        color: Colors.primary,
    },
    input: {
        height: 52,
        width: '80%',
        borderColor: Colors.border,
        borderWidth: 1,
        ...Spacing.p('', 3),
        borderRadius: 8,
    },
    dynamicInput: {
        width: '80%',
    },
    inputError: {
        borderColor: Colors.error,
    },
    inputSuccess: {
        borderColor: Colors.success,
    },
    card: {
        backgroundColor: Colors.cardBackground,
        borderColor: Colors.cardBorder,
        borderWidth: 1,
        shadowColor: Colors.cardShadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
});