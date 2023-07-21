import { useQuery, gql } from '@apollo/client';

const GET_ALL_FILMS = gql`
query Query {
  allFilms {
    films {
      title
      director
      releaseDate
      speciesConnection {
        species {
          name
          classification
          homeworld {
            name
          }
        }
      }
    }
  }
}`

export const OperationB = () => {
    const { loading, error, data } = useQuery(GET_ALL_FILMS);
  if (loading) return <tr><td>Loading...</td></tr>;
  if (error) return <tr><td>Error : {error.message}</td></tr>;
  
  if (!data || !data.allFilms || !data.allFilms.films) return null;
  const films = data.allFilms.films || [];
    return <>
    <tr><td>Step 1</td><td>Fetch first StarWar movie</td></tr>
            <tr><td>Step 2</td><td>{films[0]?.title || ''}</td></tr>
            <tr><td>Step 3</td><td>{films[0]?.releaseDate || ''}</td></tr>
    
    </>
}