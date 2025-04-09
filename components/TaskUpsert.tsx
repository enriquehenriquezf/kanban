import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { Colors, Spacing, Styles } from '@/constants';
import { useRoute, useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DynamicInput from './DynamicInput';
import { Picker } from '@react-native-picker/picker';
import { useValidation } from '@/hooks/useValidation';
import { InputType, PriorityType } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@/services/api';

const TaskUpsert = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { task, column } = route.params;

    const { state: Title, valid: validTitle, error: TitleError, handleValidation: handleTitleValidation } = useValidation(InputType.TEXT, task ? task.title : '');
    const { state: Description, valid: validDescription, error: DescriptionError, handleValidation: handleDescriptionValidation } = useValidation(InputType.TEXTAREA, task ? task.description : '');
    const [selectedPriority, setSelectedPriority] = useState<PriorityType | null>(task ? task.priority : null);
    const [selectedColumn, setSelectedColumn] = useState<number>(column);
    const [upsertDisabled, setUpsertDisabled] = useState<boolean>(true);
    const [user, setUser] = useState<any>({});
    const [board, setBoard] = useState<any>({});

    useEffect(() => {
        AsyncStorage.getItem('USER').then((value) => {
            const getUser = value ? JSON.parse(value) : {};
            setUser(getUser)
        });
        AsyncStorage.getItem('BOARD').then((value) => {
            const getBoard = value ? JSON.parse(value) : {};
            setBoard(getBoard)
        });
    }, []);

    useEffect(() => {
        handleUpsertDisabled();
    }, [validTitle, validDescription, selectedPriority]);

    /**
     * Function to handle the Upsert button state
    */
    const handleUpsertDisabled = () => {
        if (validTitle && validDescription && selectedPriority != null) {
            setUpsertDisabled(false);
        } else {
            setUpsertDisabled(true);
        }
    }

    const Upsert = async () => {
        //TODO: Update or insert task in backend
        const upsertTask = {
            id: task ? task.id : null,
            title: Title,
            description: Description,
            priority: selectedPriority,
            column: selectedColumn,
            date: new Date().toISOString(),
        };

        // const response = await api().upsertTask(user.uid, board, upsertTask);
        navigation.popTo('Home', { task: upsertTask });
    }

    const DeleteTask = async () => {
        //TODO: Delete task in backend
        let boardUpdated = {...board};
        const columnIndex = boardUpdated.columns.findIndex((column:any )=> column.id === task.column);
        const taskIndex = boardUpdated.columns[columnIndex].tasks.findIndex((t:any) => t.id === task.id);
        if (taskIndex !== -1) {
            boardUpdated.columns[columnIndex].tasks.splice(taskIndex, 1);
            setBoard({...boardUpdated});
        }
        // const response = await api().deleteTask(user.uid, boardUpdated);
        navigation.popTo('Home', { deleted: task.id, selectedColumn: column });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[Styles.container, Spacing.p('', 4)]}>

                    {/* HEADER AND CLOSE */}
                    <View style={[Styles.row, Spacing.m('b', 'auto'), { width: '100%' }]}>
                        <Text style={[Styles.h1]}>{task ? "Detalles de la tarea" : "Crear tarea"}</Text>

                        <TouchableOpacity onPress={() => navigation.goBack()} style={[]}>
                            <MaterialIcons name="close" size={24} color={Colors.label} />
                        </TouchableOpacity>
                    </View>

                    {/* TASK INPUTS */}
                    <View style={[Spacing.m('t', 4), { width: '100%', alignItems: 'center' }]}>

                        {/* TITLE */}
                        <DynamicInput
                            label="Título"
                            placeholder='Tarea # 1'
                            text={Title}
                            valid={validTitle}
                            error={TitleError}
                            type={InputType.TEXT}
                            onHandleText={handleTitleValidation}
                        />

                        <View style={[Spacing.m('y', 4), { width: '80%' }]}>
                            <Text style={[Styles.label, Spacing.m('t', 2), Spacing.m('b', -4)]}>Prioridad</Text>
                            <Picker
                                selectedValue={selectedPriority}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedPriority(itemValue)
                                }
                            >
                                <Picker.Item enabled={false} label={"Selecciona una prioridad"} value={null} />
                                <Picker.Item label={PriorityType.HIGH} value={PriorityType.HIGH} />
                                <Picker.Item label={PriorityType.MEDIUM} value={PriorityType.MEDIUM} />
                                <Picker.Item label={PriorityType.LOW} value={PriorityType.LOW} />
                            </Picker>

                            <Text style={[Styles.label, Spacing.m('t', 2), Spacing.m('b', -4)]}>Lista</Text>
                            <Picker
                                selectedValue={selectedColumn}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedColumn(itemValue)
                                }
                            >
                                <Picker.Item label={"Por hacer"} value={0} />
                                <Picker.Item label={"En progreso"} value={1} />
                                <Picker.Item label={"Hecho"} value={2} />
                            </Picker>
                        </View>

                        {/* DESCRIPTION */}
                        <DynamicInput
                            label="Descripción"
                            placeholder='Describa la tarea'
                            text={Description}
                            valid={validDescription}
                            error={DescriptionError}
                            type={InputType.TEXTAREA}
                            onHandleText={handleDescriptionValidation}
                        />
                    </View>

                    {/* BUTTONS */}
                    <View style={[{ borderTopWidth: 1, borderTopColor: Colors.border, width: '100%', alignItems: 'center' }, Spacing.m('y', 2)]}>
                        {/* UPDATE OR INSERT BUTTON */}
                        <TouchableOpacity
                            style={[Styles.button, Spacing.m('b', 4), Spacing.m('t', 4), (upsertDisabled && Styles.buttonDisabled)]}
                            onPress={() => Upsert()}
                        >
                            <Text style={Styles.buttonText}>{task ? "Guardar" : "Crear"} tarea</Text>
                        </TouchableOpacity>

                        {/* DELETE TASK BUTTON */}
                        {task && <TouchableOpacity
                            style={[Styles.button, Spacing.m('b', 4), Styles.buttonDanger]}
                            onPress={() => DeleteTask()}
                        >
                            <Text style={[Styles.buttonText, Styles.buttonTextDanger]}>Eliminar tarea</Text>
                        </TouchableOpacity>}
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default TaskUpsert;