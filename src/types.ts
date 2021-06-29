export type PhaseSamples = {[phaseId: string]: IPhase }

export type TaskSamples = {[taskId: string]: ITask }

export type RandomResource ={
    id: string,
    source: string,
    text: string,
}

export interface ITask  {
    id: string,
    title: string,
    isCompleted: boolean
}

export interface IPhase {
    id: string,
    title:string,
    order : number,
    tasks: TaskSamples,
}
export interface IProgress {
    id: string,
    phases: PhaseSamples
    title: string
}



