import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material'
import { Fragment, cloneElement } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

function generate (element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    cloneElement(element, {
      key: value,
    }),
  )
}

function AnswerTypeMultiple () {
  return (
    <Box>
      <List>
        {generate(
          <ListItem
            secondaryAction={
              <IconButton edge='end' aria-label='delete'>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <DeleteIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary='Single-line item'
              secondary='Secondary text'
            />
          </ListItem>,
        )}
      </List>
      <TextField label='Add answer' variant='standard' />
    </Box>

  )
}

export default AnswerTypeMultiple
