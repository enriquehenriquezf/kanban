import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Spacing, Styles } from '@/constants';
import { useNavigation } from '@react-navigation/native';
// import { WebView } from 'react-native-webview';
// <WebView
//     originWhitelist={['*']}
//     source={{ html: task.description }}
//     style={{ height: 100, width: '100%' }}
// />

const Board = () => {
    const navigation = useNavigation();

    const BOARD = {
        id: 1,
        name: 'Mi Tablero',
        columns: [
            {
                id: 1,
                name: 'Por hacer',
                tasks: [
                    { id: 1, title: 'Tarea 1', description: 'Esta es la tarea 1', status: 'high', date: '09/04/2025' },
                    { id: 2, title: 'Tarea 2', description: 'Esta es la tarea 2', status: 'medium', date: '09/04/2025' },
                    { id: 3, title: 'Tarea 3', description: 'Esta es la tarea 3', status: 'low', date: '09/04/2025' },
                ]
            },
            {
                id: 2,
                name: 'En progreso',
                tasks: [
                    { id: 4, title: 'Tarea 4', description: 'Esta es la tarea 4', status: 'high', date: '09/04/2025' },
                    { id: 5, title: 'Tarea 5', description: 'Esta es la tarea 5', status: 'low', date: '09/04/2025' },
                ]
            },
            {
                id: 3,
                name: 'Hecho',
                tasks: [
                    { id: 6, title: 'Inicio de sesión', 
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
                        status: 'medium', date: '09/04/2025' 
                    },
                ]
            },
        ],
    }
    
    return (
        <View style={[Styles.container, Spacing.p('x', 3)]}>
            {/* LISTS */}
            <FlatList
                data={BOARD.columns}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    /* COLUMN */
                    <View style={[Spacing.m('x', 3), Styles.boardColumn]}>
                        <Text style={[Styles.h1, Spacing.m('b', 4)]}>{item.name}</Text>

                        {/* TASKS */}
                        {item.tasks.map(task => (
                            <View key={task.id} style={[Styles.card]}>
                                <Text>{task.title}</Text>
                                <Text ellipsizeMode='tail' numberOfLines={3}>{task.description}</Text>
                                <Text>{task.status}</Text>
                                <Text>{task.date}</Text>
                            </View>
                        ))}
                    </View>
                )} 
            />
        </View>
    );
};

export default Board;