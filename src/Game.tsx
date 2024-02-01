import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useQuestionsStore } from "./store/questions";
import { type Question as QuestionType} from "./types";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Footer } from "./Footer";

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  if (userSelectedAnswer == null) return 'transparent'
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
  if (index === correctAnswer) return 'green'
  if (index === userSelectedAnswer) return 'red'
  return 'transparent'
}

const Question = ({info} : {info : QuestionType}) => {

    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const createHandleClick = (answerIndex : number) => () =>{
        selectAnswer(info.id, answerIndex);
    }

    return (
        <Card variant="outlined" sx={{bgcolor: '#222', p:2, textAlign:'left'}}>
            <Typography variant="h5">
                {info.question}
            </Typography>

            <Typography variant="body1">
                <SyntaxHighlighter language="javascript" style={gradientDark}>
                    {info.code}
                </SyntaxHighlighter>
            </Typography>

            <List sx={{bgcolor: '#333', textAlign:'left'}} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton
                        disabled={info.userSelectedAnswer != null}
                        onClick={createHandleClick(index)}
                        sx={{backgroundColor:getBackgroundColor(info,index)}} >
                            <ListItemText primary={answer} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export function Game() {
    const questions = useQuestionsStore((state) => state.questions)
    const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
    const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
    const goPrevQuestion = useQuestionsStore((state) => state.goPrevQuestion)

    const questionInfo = questions[currentQuestion]
    return (
        <div>
            <Stack direction="row" spacing={2} justifyContent="center">
                <IconButton onClick={goPrevQuestion} disabled={currentQuestion === 0}>
                    <ArrowBackIosNew />
                </IconButton>
                <Typography margin={'0px'}>
                    {currentQuestion + 1} / {questions.length}
                </Typography>
                <IconButton onClick={goNextQuestion} disabled={currentQuestion === questions.length - 1}>
                    <ArrowBackIosNew sx={{transform: 'rotate(180deg)'}} />
                </IconButton>
            </Stack>
            <Question info={questionInfo} />
            <Footer />
        </div>
    )
}