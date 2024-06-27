import { useCallback, useEffect } from 'react';
import { News } from '../../components/News/news';
import { useFetchInfo } from '../../hooks/useFetchInfo';

import styles from './home.module.css';

const filters = ['topstories', 'newstories', 'beststories'];
const ofssetArr = [15, 30, 60];
/**
 * The Home component is the main page of the application.
 * It fetches news data from the API and displays it to the user.
 */
export function Home() {
  const { state, fetchData, filter, setFilter, page, setPage, items, setOffset, offset } =
    useFetchInfo({
      isLoading: false,
      isError: false,
      message: '',
    });

  /**
   * Fetches news data from the API when the filter or page changes.
   */
  useEffect(() => {
    fetchData();
  }, [filter, fetchData, page]);

  /**
   * Updates the page state when the user changes the input value.
   * @param e - The event object with the new page value.
   */
  const handlePageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setPage(Number(e.target.value)),
    [setPage]
  );

  return (
    <>
      <div className={styles['pagination']}>
        <div>
          <h1>News</h1>
        </div>
        <div>
          <button onClick={() => setPage((p) => --p)} disabled={page === 1}>
            back
          </button>
          <input
            value={page}
            onChange={(e) => handlePageChange(e)}
            placeholder='page'
          />
          <button onClick={() => setPage((p) => ++p)}>Next</button>
        </div>
        <select
          defaultValue={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {filters.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select defaultValue={offset} onChange={(e) => setOffset(+e.target.value)}>
          {ofssetArr.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        {state.isLoading && <p className='state'>Loading...</p>}
        {state.isError && <p className='state'>{state.message}</p>}
        {!state.isError && !state.isLoading && (
          <ul role='list'>
            {items.map((item) => (
              <News key={item.id} {...item} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
