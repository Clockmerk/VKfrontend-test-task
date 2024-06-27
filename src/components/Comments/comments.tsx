import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchComments } from '../../hooks/useFetchComments';
import { ItemT } from '../../types';

import styles from './comments.module.css';

export const Comments = () => {
  const { id } = useParams();

  const { item, comments, fetchComments, state } = useFetchComments(id!, {
    isLoading: false,
    isError: false,
    message: '',
  });

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  console.log(item);
  if (!item) {
    return null;
  }

  return (
    <div>
      <Link to='/'>
        <button>Back</button>
      </Link>{' '}
      {item.id && (
        <>
          <a href={item.url} target='_blank'>
            <h1>{item.title}</h1>
          </a>
          <p>Score: {item.score}</p>
          <p>By: {item.by}</p>
        </>
      )}
      {state.isLoading && <p className='state'>Loading...</p>}
      {state.message && <p className='state'>{state.message}</p>}
      {!state.isLoading && !state.message && comments.length === 0 && (
        <p className='state'>No comments</p>
      )}
      {!state.isLoading && !state.message && (
        <ul role='list'>
          {comments.map((comment: ItemT) => (
            <li key={comment.id} className={styles.comment}>
              <p>{comment.by}</p>
              <p
                dangerouslySetInnerHTML={{ __html: comment.text }}
                style={{ margin: '0' }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
