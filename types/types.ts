export enum InputType {
    EMAIL = 'email',
    PASSWORD = 'password',
    TEXT = 'text',
}

export enum PriorityType {
    HIGH = 'Alta',
    MEDIUM = 'Media',
    LOW = 'Baja',
}

export interface TaskType {
    id: string;
    title: string;
    description: string;
    priority: PriorityType;
    date: string;
    onPress?: () => void;
}

export interface ColumnType {
    id: string;
    name: string;
    tasks: TaskType[];
}

export interface BoardType {
    id: string;
    name: string;
    columns: ColumnType[];
}

export interface UserType {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export interface AuthType {
    email: string;
    password: string;
}

export interface AuthSignUpType extends AuthType {
    name: string;
    lastName: string;
    password2: string;
}