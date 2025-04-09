import React from 'react';
import { View, Text } from 'react-native';
import { Colors, Spacing, Styles } from '@/constants';
import { PriorityType, TaskType } from '@/types'; 
// import { WebView } from 'react-native-webview';


const Task = (task: TaskType) => {
    // const navigation = useNavigation();

    const getDateString = (date: string) => {
        let dateObj = new Date(date);
        const timezone = new Date().getTimezoneOffset() / 60;
        dateObj.setHours(dateObj.getHours() + timezone);

        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return dateObj.toLocaleDateString('es-CO', options);
    }

    return (
        <View key={task.id} style={[Styles.card]}>
            {/* TITLE */}
            <Text 
                ellipsizeMode='tail'
                numberOfLines={2}
                style={[Styles.taskTitle]}
            >
                {task.title}
            </Text>

            {/* DESCRIPTION */}
            {/* <WebView
                originWhitelist={['*']}
                source={{ html: task.description }}
                style={{ height: 100, width: '100%' }}
            /> */}
            <Text 
                style={[Styles.taskDescription]}
                ellipsizeMode='tail'
                numberOfLines={3}
            >
                {task.description}
            </Text>

            {/* PRIORITY AND DATE */}
            <View style={[Styles.row, Spacing.m('t', 'auto')]}>
                {/* PRIORITY */}
                <View style={[Styles.priorityBadge, {backgroundColor: PriorityType.HIGH == task.priority ? Colors.highLight : PriorityType.MEDIUM == task.priority ? Colors.mediumLight : Colors.lowLight}]}>
                    <Text  style={[Styles.taskPriorityText, {color: PriorityType.HIGH == task.priority ? Colors.highText : PriorityType.MEDIUM == task.priority ? Colors.mediumText : Colors.lowText}]}>{task.priority}</Text>
                </View>

                {/* DATE */}
                <Text 
                    style={[Styles.taskDate]}
                >
                    { getDateString(task.date) }
                </Text>
            </View>
        </View>
    );
};

export default Task;