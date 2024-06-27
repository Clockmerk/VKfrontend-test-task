import { Link } from "react-router-dom";
import { ItemT } from "../../types";

export const News = ({ title, url, score, by, id, kids }: ItemT) => {
  return (
    <article>
      <div>
        <a href={url} target='_blank'>
          <h2>{title}</h2>
        </a>
      </div>
      <div>
        <p>score: {score}</p>
        <p>by: {by}</p>
        <Link to={`/item/${id}`}>Read comments({kids?.length})</Link>
      </div>
      <hr />
    </article>
  );
};
