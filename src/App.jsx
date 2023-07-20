import 'regenerator-runtime/runtime';
import { useQuery, gql } from '@apollo/client';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

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

function App() {
  const { loading, error, data } = useQuery(GET_ALL_FILMS);
  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  
  if (!data || !data.allFilms || !data.allFilms.films) return null;
  const films = data.allFilms.films;

  if (!browserSupportsSpeechRecognition) {
    return <div>Does not support</div>;
  }
  return (
    <div className="container">
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening} style={{ marginBottom: '1rem'}}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <p>{transcript}</p>
      <table>
        <tbody>
          <tr><td>Operation A</td></tr>
          <tr><td>Step 1</td><td>Open a box</td></tr>
          <tr><td>Step 2</td><td>Pick a tool</td></tr>
          <tr><td>Step 3</td><td>Close the box</td></tr>
          <tr><td>Operation B</td></tr>
          <tr><td>Step 1</td><td>Fetch first StarWar movie</td></tr>
          <tr><td>Step 2</td><td>{films[0].title}</td></tr>
          <tr><td>Step 3</td><td>{films[0].releaseDate}</td></tr>
          <tr><td>Operation C</td></tr>
          <tr><td>Step 1</td></tr>
          <tr><td>Step 2</td></tr>
          <tr><td>Step 3</td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
