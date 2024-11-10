export interface Task {
    taskId: number
    taskName: string
    taskDescription: string
    taskCompletionDate: Date
    isTaskCompleted: boolean
    isMissedTask?: 'Y' | 'N'; // Optional to allow for processing
    isPendingTask?: 'Y' | 'N'; // Optional
    isCompletedTask?: 'Y' | 'N'; // Optional
}