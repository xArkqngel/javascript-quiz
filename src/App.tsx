import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import { JavascriptLogo } from './JavascriptLogo'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './Game'

function App() {
  const questions = useQuestionsStore((state) => state.questions)
  console.log(questions)

  return (
    <main>
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1">
          <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
            <JavascriptLogo />
            Javascript Quiz
          </Stack>

          {questions.length === 0 && <Start />}
          {questions.length > 0 && <Game/>}
        </Typography>
      </Container>
    </main>
  )
}

export default App
