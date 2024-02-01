import { useQuestionsStore } from "./store/questions";

export function Footer(){
    const questions = useQuestionsStore((state) => state.questions)

    let unansweredQuestions = 0;
    let rightAnswers = 0;
    let wrongAnswers = 0;

    questions.forEach((question) => {
        const {userSelectedAnswer, correctAnswer} = question;
        if(userSelectedAnswer == null){
            unansweredQuestions++;
        }else if (userSelectedAnswer === correctAnswer){
            rightAnswers++;
        }else {
            wrongAnswers++;
        }
    });

    return (
        <footer style={{marginTop:'16px', fontSize:'20px'}}>
            <strong>{`✅ ${rightAnswers} correctas - ❌ ${wrongAnswers} incorrectas - ❔ ${unansweredQuestions} sin responder`}</strong>
        </footer>
    );
}