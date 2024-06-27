import { useCallback, useMemo, useState } from 'react';
import { ApiInteface } from '../utils/api';
import { ItemT } from '../types';

/**
 * Custom hook for fetching and managing data from the API.
 * @param appState - The initial state of the application.
 * @returns Object containing state, items, filter, page, setFilter, setPage, setOffset and fetchData.
 */
export const useFetchInfo = (appState: {
  isLoading: boolean;
  isError: boolean;
  message: string;
}): {
  state: typeof appState;
  items: ItemT[];
  filter: string;
  page: number;
  offset: number;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  fetchData: () => Promise<void>;
} => {
  const [state, setState] = useState<typeof appState>(appState);
  const [filter, setFilter] = useState('topstories');
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(15);
  const [items, setItems] = useState<ItemT[]>([]);

  const apiFetchMemo = useMemo(() => new ApiInteface(), []);

  /**
   * Fetches data from the API based on the current filter and page.
   * @returns Promise that resolves when the data is fetched and set in state.
   */
  const fetchData = useCallback(async () => {
    try {
      setState((prevState: typeof appState) => ({
        ...prevState,
        isLoading: true,
      }));

      const { res, ok } = await apiFetchMemo.getList(filter);

      if (!ok) {
        throw new Error('Something went wrong');
      }

      const itemsData = await Promise.all(
        res
          .slice((page - 1) * offset, page * offset)
          .map(async (id: string) => (await apiFetchMemo.getItem(id)).res)
      ).then((arrays) => arrays.flat());

      setItems(itemsData);
      setState((prevState: typeof appState) => ({
        ...prevState,
        isLoading: false,
      }));
    } catch (error) {
      setState({ isLoading: false, isError: true, message: error as string });
    }
  }, [apiFetchMemo, filter, offset, page]);

  return {
    state,
    items,
    filter,
    page,
    offset,
    setFilter,
    setPage,
    setOffset,
    fetchData,
  };
};

