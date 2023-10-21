import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slider, Stack, TextField } from '@mui/material'
import { useState } from 'react'

function InputRewardPool (props: any) {
  const open = props.open
  const handleClose = props.handleClose
  const [rewardPool, setRewardPool] = useState(0)

  return (

    <Dialog open={open} onClose={() => handleClose(true, rewardPool)}>
      <DialogTitle id='alert-dialog-title'>
        Set a base reward pool for your survey (in ether) <br />
        you can refill later

      </DialogTitle>
      <DialogContent>
        <Stack direction='row' spacing={2}>
          <Slider
            valueLabelDisplay='auto'
            value={rewardPool}
            onChange={(event, newValue) => {
              setRewardPool(newValue as number)
            }}
          />
          <TextField
          // onChange={handleInputChange}
          // onBlur={handleBlur}
            onChange={(event) => {
              setRewardPool(Number(event.target.value))
            }}
            sx={{ width: 200 }}
            variant='outlined'
            value={rewardPool}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              inputMode: 'numeric',
              pattern: '[0-9]*',
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Stack>
        {/* <DialogContentText id='alert-dialog-description'>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false, rewardPool)} autoFocus>
          Submit
        </Button>
        <Button onClick={() => handleClose(true, rewardPool)} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InputRewardPool
