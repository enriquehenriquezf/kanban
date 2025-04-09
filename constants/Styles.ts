import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from './Colors';
import { Spacing } from './Spacing';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const calculateBoardWidth = () => {
    const width = windowWidth * 0.8;
    if (width < 200) {
        return 200;
    } else if (width > 400) {
        return 400;
    } else {
        return width;
    }
};

// const calculateCardHeight = () => {
//     const height = windowHeight * 0.25;
//     if (height < 130) {
//         return 130;
//     } else if (height > 250) {
//         return 250;
//     } else {
//         return height;
//     }
// };

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
    buttonDanger: {
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.danger,
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
    buttonTextDanger: {
        color: Colors.danger,
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
    boardColumn: {
        marginTop: 24,
        width: calculateBoardWidth(),
        minWidth: 200,
        maxWidth: 400
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
        ...Spacing.m('b', 4),
        ...Spacing.p('', 5),
        borderRadius: 12,
        width: calculateBoardWidth(),
        height: 170,
        minHeight: 130,
        maxHeight: 250,
        minWidth: 200,
        maxWidth: 400
    },
    taskTitle: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'medium',
        ...Spacing.m('b', 2),
    },
    taskDescription: {
        color: Colors.taskDescription,
        fontSize: 14,
        fontWeight: 'regular',
        ...Spacing.m('b', 3),
    },
    taskPriorityText: {
        fontSize: 12,
        fontWeight: 'medium',
        textAlign: 'center'
    },
    taskDate: {
        color: Colors.label,
        fontSize: 14,
        fontWeight: 'regular',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priorityBadge: {
        backgroundColor: Colors.primary,
        width: 64,
        minWidth: 64,
        maxWidth: 80,
        height: 'auto',
        borderRadius: 32,
        ...Spacing.p('', 2),
    },
    taskButton: {
        position: 'absolute',
        bottom: 24,
        right: 16,
        width: 48,
        height: 48,
        borderRadius: 24,
        padding: 4,
    },
    taskButtonText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.textLight,
        textAlign: 'center',
    },
    textArea: {
        height: 100,
    }
});