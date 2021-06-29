import {IProgress} from "../types";

export const mockProgress: IProgress = {
    id: "progressId",
    title: "My startup progress",
    phases: {
        id1: {
            title: "Foundation",
            order: 1,
            id: "id1",
            tasks: {
                "11": { id: "11", isCompleted: false, title: "Setup virtual office" },
                "12": { id: "12", isCompleted: false, title: "Set mission" },
                "13": { id: "13", isCompleted: false, title: "Buy domains" },
            },
        },
        id2: {
            title: "Discovery",
            order: 2,
            id: "id2",
            tasks: {
                "21": { id: "21", isCompleted: false, title: "Create roadmap" },
                "22": { id: "22", isCompleted: false, title: "Competitor analysis" },
            },
        },
        id3: {
            title: "Delivery",
            order: 3,
            id: "id3",
            tasks: {
                "31": {
                    id: "31",
                    isCompleted: false,
                    title: "Release marketing website",
                },
                "32": { id: "32", isCompleted: false, title: "Release MVP" },
            },
        },
    },
};