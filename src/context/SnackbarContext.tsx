'use client';

import { Alert } from '@/types/types';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Snackbar from '@/components/snackbar/Snackbar';

type ContextType = {
  addAlert: (content: Alert) => void;
};

type SnackbarProviderProps = {
  children: ReactNode;
};

const SnackbarContext = createContext<ContextType | null>(null);

export const SnackbarProvider = (props: SnackbarProviderProps) => {
  const { children } = props;
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const AUTO_DISMISS = 4500;
  const activeAlertIds = alerts.join(',');

  useEffect(() => {
    if (activeAlertIds.length > 0) {
      const snackbarTimer = setTimeout(
        () => setAlerts((alerts) => alerts.slice(0, alerts.length - 1)),
        AUTO_DISMISS,
      );
      return () => clearTimeout(snackbarTimer);
    }
  }, [activeAlertIds]);

  const addAlert = useCallback(
    (content: Alert) => setAlerts((alerts) => [content, ...alerts]),
    [],
  );

  const value = useMemo(() => ({ addAlert }), [addAlert]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {alerts.map((alert) => (
        <Snackbar key={alert.message} alert={alert} />
      ))}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
