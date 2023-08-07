import React, { useEffect, useMemo, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "../styles/pulser.css"
import { NodeProgress } from "./NodeProgress";

export const OperationExecution = ({ operations, handleHome }) => {
    const [operationPosition, setOperationPosition] = useState(0);
    const [stepPosition, setStepPosition] = useState(1);
    const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

    const steps = operations[operationPosition].steps
    const step = useMemo(() => steps[stepPosition -1],[stepPosition]);

    const handlePrevious = () => {
        if (operationPosition === 0) return;
        if (stepPosition === 1) {
            setOperationPosition(current => current -1);
            setStepPosition(steps.length - 1);
            return;
        };
        setStepPosition(current => current -1);
    };

    const handleNext = () => {
        if (operationPosition === operations.length - 1) {
            handleHome();
            setOperationPosition(0);
            setStepPosition(1);
            return;
        }
        if (stepPosition === steps.length) {
            setOperationPosition(current => current + 1);
            setStepPosition(1);
            return;
        };
        setStepPosition(stepPosition + 1);
    };

    useEffect(() => {
        const voiceInput = transcript.toLowerCase()
        if ( voiceInput.includes('home')) {
            handleHome();
            resetTranscript();
            return;
        }
        if ( voiceInput.includes('next')) {
            handleNext();
            resetTranscript();
            return;
        }
        if (voiceInput.includes('previous') || voiceInput.includes('back')) {
            handlePrevious();
            resetTranscript();
            return;
        }
        if (voiceInput.includes('operation')) {
            setOperationPosition(voiceInput.match(/operation (\d+)/g));
        }
        if (voiceInput.includes('step')) {
            setStepPosition(voiceInput.match(/step (\d+)/g));
        }
        return;
    }, [transcript])


    if (!browserSupportsSpeechRecognition) {
        return <div>Does not support</div>;
      }
    
    return (
        <div>
            <NodeProgress name='operation' total={operations.length} currentPosition={operationPosition} />
            <NodeProgress name='step' total={4} currentPosition={stepPosition} />
            <div className="step-execution" dangerouslySetInnerHTML={{ __html: step.instructions }} />
            <div className="main-action-execution">
                {transcript && <span className="transcript">"{transcript}"</span>}
                <button 
                    class="pulser" 
                    onMouseDown={SpeechRecognition.startListening} 
                    onMouseUp={SpeechRecognition.stopListening}>
                    <div class="listening" style={{ display: listening ? 'block' : 'none'}}></div>
                </button>
            </div>
        </div>
        )
}
