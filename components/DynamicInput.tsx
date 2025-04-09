import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Spacing, Styles } from '@/constants';
import { InputType } from '@/types';

type DynamicInputProps = {
    id?: string;
    label?: string;
    placeholder?: string;
    type: InputType;
    text: string;
    valid: boolean | null;
    error?: string | null;
    onHandleText: (text: string) => void;
}

const DynamicInput = ({id, label, placeholder, type, text, valid, error, onHandleText}: DynamicInputProps) => {
    
    return (
        <View key={id} style={[Styles.dynamicInput, Spacing.m('b', 4)]}>
            {label && <Text style={[Styles.label, Spacing.m('b', 1)]}>{label}</Text>}
            <TextInput
                placeholder={placeholder || label || ''}
                secureTextEntry={type == InputType.PASSWORD ? true : false}
                keyboardType={type == InputType.EMAIL ? 'email-address' : 'default'}
                onChangeText={onHandleText}
                onEndEditing={() => onHandleText(text)}
                textContentType={'oneTimeCode'}
                // onSubmitEditing={() => onHandleText(text)}
                defaultValue={text}
                style={[Styles.input, Spacing.m('b', !valid && error ? 1 : 0), (valid == null ? '' : valid ? Styles.inputSuccess : Styles.inputError), {width: '100%'}]}
            />
            {!valid && error && <Text style={[Styles.errorMessage]}>{error}</Text>}
        </View>
    );
};

export default DynamicInput;