import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Spacing, Styles } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import Task from '@/components/Task';
import {BoardType, PriorityType} from '@/types';

const BOARD: BoardType = {
    id: "1",
    name: 'Mi Tablero',
    columns: [
        {
            id: "1",
            name: 'Por hacer',
            tasks: [
                { id: "1", title: 'Tarea 1', description: 'Esta es la tarea 1', priority: PriorityType.HIGH, date: '2025-09-04' },
                { id: "2", title: 'Tarea 2', description: 'Esta es la tarea 2', priority: PriorityType.MEDIUM, date: '2025-09-04' },
                { id: "3", title: 'Tarea 3', description: 'Esta es la tarea 3', priority: PriorityType.LOW, date: '2025-09-04' },
            ]
        },
        {
            id: "2",
            name: 'En progreso',
            tasks: [
                { id: "4", title: 'Tarea 4', description: 'Esta es la tarea 4', priority: PriorityType.HIGH, date: '2025-09-04' },
                { id: "5", title: 'Tarea 5', description: 'Esta es la tarea 5', priority: PriorityType.LOW, date: '2025-09-04' },
            ]
        },
        {
            id: "3",
            name: 'Hecho',
            tasks: [
                { id: "6", title: 'Inicio de sesión', 
                    description: `Implementar la funcionalidad de inicio de sesión para usuarios mediante correo electrónico y contraseña, incluyendo validaciones específicas para cada campo.

Criterios de aceptación:

[ ] El usuario puede ingresar su correo y contraseña para iniciar sesión.

[ ] El correo electrónico debe ser validado usando una expresión regular (Regex).

[ ] La contraseña debe cumplir con los siguientes requisitos:

    * Tener 6 o más caracteres.

    * Contener al menos una letra.

    * Incluir mínimo un número.

[ ] Mostrar mensajes de error específicos si alguna validación falla.

[ ] Solo permitir el inicio de sesión si ambos campos son válidos.

Notas técnicas:

Utilizar una función de Regex para validar el formato del correo electrónico.

Validar la contraseña mediante lógica condicional o expresión regular.`,
                    priority: PriorityType.MEDIUM, date: '2025-09-04' 
                },
            ]
        },
    ],
}

const BOARD_EMPTY: BoardType = {
    id: "1",
    name: 'Mi Tablero',
    columns: [
        {
            id: "1",
            name: 'Por hacer',
            tasks: [
            ]
        },
        {
            id: "2",
            name: 'En progreso',
            tasks: [
            ]
        },
        {
            id: "3",
            name: 'Hecho',
            tasks: [
            ]
        },
    ],
}

const Board = () => {
    const navigation = useNavigation();

    const [board, setBoard] = useState<BoardType>({...BOARD_EMPTY});
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        getBoardData();
    }, []);

    const getBoardData = () => {
        //TODO: get board data from backend
        setBoard({...BOARD});
    }
    
    
    return (
        <View style={[Styles.container, Spacing.p('x', 3), Spacing.m('t', 12)]}>
            <ScrollView showsHorizontalScrollIndicator={false}>
            {/* LISTS */}
            <FlatList
                data={board.columns}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    /* COLUMN */
                    <View style={[Spacing.m('x', 3), Styles.boardColumn]}>
                        <Text style={[Styles.h1, Spacing.m('b', 4)]}>{item.name}</Text>

                        {/* TASKS */}
                        {item.tasks.map(task => (
                            <Task
                                key={task.id}
                                id={task.id.toString()}
                                title={task.title}
                                description={task.description}
                                priority={task.priority}
                                date={task.date}
                                // onPress={() => navigation.navigate('Task', { task })} //TODO: implement task modal
                            />
                        ))}
                    </View>
                )} 
            />
            </ScrollView>
            {/* ADD TASK BUTTON */}
            <TouchableOpacity 
                style={[Styles.button, Styles.taskButton]}
                onPress={() => navigation.navigate('TaskUpsert', { task: null })}
            >
                <Text style={[Styles.taskButtonText]}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Board;