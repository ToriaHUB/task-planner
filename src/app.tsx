import React, { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/globalStyles";
import { IProgress } from "./types";
import { Progress } from "./components/progress";
import {
  initLocalStorage,
  readFromLocalStorage,
  writeProgressToLocalStorage,
} from "./components/utils";
import { mockProgress } from "./mock-data";

interface ILayoutActions {
  refresh: () => void;
  updateStore: (taskId: string, phaseId: string, isCompleted: boolean) => void;
}

export const LayoutActionsContext = React.createContext<ILayoutActions>({
  refresh: () => {},
  updateStore: () => {},
});

export const App: React.FC = () => {
  const [progress, setProgress] = useState<IProgress>();

  // When uiIsUpToDate === false wil be rerender
  const [uiIsUpToDate, setUiIsUpToDate] = useState(true);

  useEffect(() => {
    initLocalStorage(mockProgress);
  }, []);

  useEffect(() => {
    const progress = readFromLocalStorage<IProgress>(mockProgress.id);
    setProgress(progress);
  }, []);

  //
  useEffect(() => {
    if (!uiIsUpToDate) {
      const storedProgress = readFromLocalStorage<IProgress>(mockProgress.id);
      setProgress(storedProgress);
      setUiIsUpToDate(true);
    }
  }, [uiIsUpToDate]);

  //
  const layoutActions = useMemo<ILayoutActions>(
    () => ({
      refresh: () => setUiIsUpToDate(false),
      updateStore: (taskId, phaseId, isCompleted) => {
        if (progress) {
          const nextProgress = progress;
          nextProgress.phases[phaseId].tasks[taskId].isCompleted = isCompleted;
          writeProgressToLocalStorage(nextProgress);
        }
      },
    }),
    [progress]
  );

  return (
    <ThemeProvider theme={theme}>
      <LayoutActionsContext.Provider value={layoutActions}>
        {progress && (
          <Progress title={progress.title} phases={progress.phases} />
        )}
      </LayoutActionsContext.Provider>
      <GlobalStyle />
    </ThemeProvider>
  );
};
