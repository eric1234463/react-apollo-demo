import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const MORE_FILMS_QUERY = gql`
  query AllFirms($offset: Int) {
    allFilms(first: $offset) {
      id
      director
    }
  }
`;

const View = () => {
  const { loading, error, data, fetchMore } = useQuery(MORE_FILMS_QUERY, {
    variables: {
      offset: 10,
    },
  });

  const loadMore = () => {
    fetchMore({
      query: MORE_FILMS_QUERY,
      variables: {
        offset: data.allFilms.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          allFilms: [...prev.allFilms, ...fetchMoreResult.allFilms],
        });
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.allFilms.map(({ id, director }) => (
        <div key={id}>
          <p>
            {id}: {director}
          </p>
        </div>
      ))}
      <button type="button" onClick={loadMore}>
        Show More
      </button>
    </div>
  );
};

export default View;
