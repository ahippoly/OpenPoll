import { Container, Typography } from '@mui/material'

function PossibleAnswer (possibleAnswer: PossibleAnswer<unknown>) {
  return (
    <Container>
      <Typography>
        {possibleAnswer.title}
      </Typography>
    </Container>
  )
}

export default PossibleAnswer
