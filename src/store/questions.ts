import {create} from 'zustand';
import {type Question} from '../types';
import confetti from 'canvas-confetti';

interface State{
    questions: Question[];
    currentQuestion: number;
    fetchQuestions: (limitNumber:number) => Promise<void>;
    selectAnswer: (questionId:number, answerIndex:number) => void;
    goNextQuestion: () => void;
    goPrevQuestion: () => void;
}

export const useQuestionsStore = create<State>((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limitNumber:number) => {
            const res = await fetch('http://localhost:5173/data.json');
            const data = await res.json();

            const questions = data.sort(() => Math.random() - 0.5).slice(0, limitNumber);
            set({questions});
        },
        selectAnswer: (questionId:number, answerIndex:number) => {
            const {questions} = get();
            const newQuestions = structuredClone(questions);
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            const questionInfo = newQuestions[questionIndex];
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
            if(isCorrectUserAnswer){
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: {
                        y: 0.6
                    }
                })
            }

            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }
            set({
                questions: newQuestions,
            })
        },
        goNextQuestion: () => {
            const {currentQuestion, questions} = get();
            const nextQuestion = currentQuestion + 1;
            if(nextQuestion < questions.length){
                set({currentQuestion: nextQuestion});
            }
        },
        goPrevQuestion: () => {
            const {currentQuestion} = get();
            const prevQuestion = currentQuestion - 1;
            if(prevQuestion >= 0){
                set({currentQuestion: prevQuestion});
            }
        },
    }
});