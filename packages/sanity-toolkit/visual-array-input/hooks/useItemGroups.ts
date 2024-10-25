import { useClient } from 'sanity';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PERSPECTIVE } from '../../studio/constants/perspectives';
import { formatConfigItemGroups } from '../utilities/formatConfigItemGroups';
import type {
  ConfigItemGroupCallable,
  ConfigItemGroups,
  ConfigItemGroupStatic,
} from '../types';

// @todo show loading state and use error state
export function useItemGroups(
  configItemGroups: ConfigItemGroups,
  {
    apiVersion = '2024-03-12',
  }: {
    apiVersion?: string;
  },
) {
  const [workingItemGroups, setWorkingItemGroups] = useState(() => configItemGroups);

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const clientWithoutConfig = useClient({ apiVersion });

  const client = useMemo(
    () => clientWithoutConfig.withConfig({ perspective: PERSPECTIVE.PUBLISHED }),
    [clientWithoutConfig],
  );

  const getAsyncGroupItems = useCallback(
    async (configItemGroups: ConfigItemGroups) => {
      try {
        setLoading(true);

        // Separate async groups from static ones
        const asyncGroups = configItemGroups.filter(
          (group): group is ConfigItemGroupCallable => typeof group.items === 'function',
        );
        const staticGroups = configItemGroups.filter(
          (group): group is ConfigItemGroupStatic => typeof group.items !== 'function',
        );

        const promises = asyncGroups.map(async (itemGroup) => {
          try {
            const result = await itemGroup.items({ client });
            return { name: itemGroup.name, result };
          } catch (error) {
            return { name: itemGroup.name, error }; // Handle error per promise
          }
        });

        const resolvedItems = await Promise.allSettled(promises);

        const updatedGroups = asyncGroups.map((itemGroup) => {
          const resolvedGroup = resolvedItems.find(
            (item): item is PromiseFulfilledResult<{ name: string; result: Array<any> }> =>
              item.status === 'fulfilled' && item.value.name === itemGroup.name,
          );

          return {
            ...itemGroup,
            items: resolvedGroup ? resolvedGroup.value.result : [],
          };
        });

        setWorkingItemGroups([...staticGroups, ...updatedGroups]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [configItemGroups],
  );

  useEffect(() => {
    void getAsyncGroupItems(configItemGroups);
  }, [getAsyncGroupItems, configItemGroups]);

  const itemGroups = useMemo(
    () => formatConfigItemGroups(workingItemGroups),
    [workingItemGroups],
  );

  return {
    itemGroups,
  };
}

function doSomething() {
  return [];
}
