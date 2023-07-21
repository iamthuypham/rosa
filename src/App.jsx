import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { OperationB } from './OperationB';

function App() {
  
  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  

  if (!browserSupportsSpeechRecognition) {
    return <div>Does not support</div>;
  }

  return (
    <div className="container">
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening} style={{ marginBottom: '1rem'}}>Start</button>
      <button onClick={SpeechRecognition.stopListening} style={{ marginBottom: '1rem'}}>Stop</button>
      <button onClick={() => resetTranscript()}>Reset</button>
      <p>Text:{transcript}</p>
      <table>
        <tbody>
          <tr><td>Operation A</td></tr>
          <tr><td>Step 1</td><td>Open a box</td></tr>
          <tr><td>Step 2</td><td>Pick a tool</td></tr>
          <tr><td>Step 3</td><td>Close the box</td></tr>
          <tr><td>Operation B</td></tr>
          {transcript === 'Next Step' && <OperationB />}
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
