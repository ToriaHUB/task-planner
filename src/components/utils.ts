import {IProgress, PhaseSamples, TaskSamples} from "../types";

export const isPhaseCompleted = (tasks: TaskSamples) =>
    Object.values(tasks).every((task) => task.isCompleted);

export const isProgressCompleted = (phases: PhaseSamples) =>
    Object.values(phases).every((phase) => isPhaseCompleted(phase.tasks));

export const getFirstIncompletePhaseOrder = (phases: PhaseSamples): number => {
    const firstUncompletedPhase = Object.values(phases).find(
        (phase) => !isPhaseCompleted(phase.tasks)
    );

    return firstUncompletedPhase ? firstUncompletedPhase.order : -1;
};

export const isPhaseDisabled = (
    currentPhaseOrder: number,
    firstIncompletePhaseOrder: number
): boolean =>
    firstIncompletePhaseOrder === -1
        ? false
        : currentPhaseOrder > firstIncompletePhaseOrder;

export const writeProgressToLocalStorage = (progress: IProgress) =>
    localStorage.setItem(progress.id, JSON.stringify(progress));

export const readFromLocalStorage = <T extends {}>(key: string): T | undefined => {
    const storedValueString = localStorage.getItem(key);
    return storedValueString ? JSON.parse(storedValueString) : undefined;
};

export const initLocalStorage = (progress: IProgress) => {
    if (!localStorage.getItem(progress.id)) {
        writeProgressToLocalStorage(progress);
    }
};