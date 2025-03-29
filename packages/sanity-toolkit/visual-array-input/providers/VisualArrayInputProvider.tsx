import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { VisualArrayInputContext } from '../context/VisualArrayInputContext';
import type { VisualArrayInputContextProps } from '../context/VisualArrayInputContext';

interface Props extends VisualArrayInputContextProps {
  children: ReactNode;
}

export const VisualArrayInputProvider = (props: Props) => {
  const { children, openVisualArrayInput } = props;

  const contextValue: VisualArrayInputContextProps = useMemo(
    () => ({ openVisualArrayInput }),
    [openVisualArrayInput],
  );

  return <VisualArrayInputContext value={contextValue}>{children}</VisualArrayInputContext>;
};
