import { useCallback, useMemo, useState } from 'react';
import { ItemT } from '../types';
import { ApiInteface } from '../utils/api';

/**
 * Custom hook for fetching and managing comments data from the API.
 * @param itemId - The ID of the item to fetch comments for.
 * @param appState - The initial state of the application.
 * @returns Object containing item, comments, isLoading, error, and fetchComments.
 */
export const useFetchComments = (
  itemId: string,
  appState: {
    isLoading: boolean;
    isError: boolean;
    message: string;
  }
): {
  item: ItemT;
  comments: ItemT[];
  state: typeof appState;
  fetchComments: () => Promise<void>;
} => {
  const [item, setItem] = useState<ItemT>({} as ItemT);
  const [comments, setComments] = useState<ItemT[]>([]);
  const [state, setState] = useState<typeof appState>(appState);

  const apiFetchMemo = useMemo(() => new ApiInteface(), []);

  const fetchComments = useCallback(async () => {
    setState({ isLoading: true, isError: false, message: '' });
    try {
      const { res, ok } = await apiFetchMemo.getItem(itemId);

      if (!ok) {
        throw new Error('Something went wrong');
      }
      setItem(res);
      const kidsData = await Promise.all(
        res.kids.map(async (kid: number) => {
          const { res } = await apiFetchMemo.getItem(kid.toString());
          return res;
        })
      );

      setState({ isLoading: false, isError: false, message: '' });
      setComments(kidsData);
    } catch (error) {
      setState({ isLoading: false, isError: true, message: error as string });
    }
  }, [apiFetchMemo, itemId]);

  return { item, comments, state, fetchComments };
};
