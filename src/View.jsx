import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const MORE_FILMS_QUERY = gql`
  query AllFirms($limit: Int, $offset: Int) {
    allFilms(first: $limit, skip: $offset) {
      id
      director
      title
    }
  }
`;

const FILMS_COUNT_QUERY = gql`
  {
    _allFilmsMeta {
      count
    }
  }
`;

const View = () => {
  const { loading, error, data, fetchMore } = useQuery(MORE_FILMS_QUERY, {
    variables: {
      offset: 0,
      limit: 1,
    },
  });

  const {
    loading: countLoading,
    error: countError,
    data: countData,
  } = useQuery(FILMS_COUNT_QUERY, {
    variables: {
      offset: 0,
      limit: 1,
    },
  });

  const loadMore = () => {
    fetchMore({
      query: MORE_FILMS_QUERY,
      variables: {
        offset: data.allFilms.length,
        limit: 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          allFilms: [...prev.allFilms, ...fetchMoreResult.allFilms],
        });
      },
    });
  };

  if (loading || countLoading) return <p>Loading...</p>;
  if (error || countError) return <p>Error :(</p>;

  return (
    <div>
      Total: {countData._allFilmsMeta.count}
      {data.allFilms.map(({ id, director, title }) => (
        <div key={id}>
          <p>
            {id}: {director} - {title}
          </p>
        </div>
      ))}
      <button
        type="button"
        onClick={loadMore}
        disabled={data.allFilms.length - 1 === countData._allFilmsMeta.count}
      >
        Show More
      </button>
    </div>
  );
};

export default View;
