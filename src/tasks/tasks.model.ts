export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
}


export const taskStatuses = ['OPEN' ,'IN_PROGRESS' ,'DONE'] as const
export type TaskStatus = typeof taskStatuses[number]
