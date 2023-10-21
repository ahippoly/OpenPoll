import { AuthType, ClaimRequest, SismoConnectButton, SismoConnectConfig, SismoConnectResponse } from '@sismo-core/sismo-connect-react'
// import { sismoConfig } from '@/utils/Config'
import { uploadBackend } from '@/utils/uploadBackend'
import { Box, Button } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { SismoButtonContext, SurvveyCreationContext } from '@/constants/contexts'
import LoadingButton from '@mui/lab/LoadingButton'
import { stringifyObject } from '@/utils/ObjUtils'
import { contractABI } from '@/config/contractABI'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { parseEther, parseGwei } from 'viem'
import { EAnswerType } from '@/@types/enums/Questions'
import { writeContract, waitForTransaction } from '@wagmi/core'
import { contractAdress } from '@/config/globalConfig'
import InputRewardPool from './InputRewardPool'
import SaveIcon from '@mui/icons-material/Save'
import UploadIcon from '@mui/icons-material/Upload'

function ConfirmCreation () {
  const { surveyObj: surveyObjData, setSurveyObj } = useContext(SurvveyCreationContext)
  const [isLoadingIPFS, setIsLoadingIPFS] = useState(false)
  const [fileCID, setFileCID] = useState('')
  const [submitedSurveyObj, setSubmitedSurveyObj] = useState({})
  const [isPendingTransact, setIsPendingTransact] = useState(false)
  const [isProcessingTransact, setIsProcessingTransact] = useState(false)
  const [dialogOpened, setDialogOpened] = useState(false)
  // const

  const surveyObj = surveyObjData as Survey

  // const args = [
  //   'surveyObj.title',
  //   'bafybeihrlflerpb6cdt6vgwdty3jripx4dlsfy5eyube5ak7voluj3cc34',
  //   1,
  //   surveyObj.tokenRewardAmount,
  //   surveyObj.endTimestamp,
  //   [],
  //   [],
  // ]

  const buttonMessage = (() => {
    if (isLoadingIPFS) return 'Publishing on IPFS'
    if (isPendingTransact) return 'Waiting for confirmation'
    if (isProcessingTransact) return 'Deploying on blockchain'
    return 'Submit'
  })()

  const isLoading = isLoadingIPFS || isPendingTransact || isProcessingTransact

  // const { config } = usePrepareContractWrite({
  //   address: contractAdress,
  //   abi: contractABI,
  //   functionName: 'publishSurvey',
  //   args,
  //   enabled: Boolean(true),
  //   // value: parseGwei('1'),

  // })
  // const { data, write } = useContractWrite(config)
  // console.log('🚀 ~ file: ConfirmCreation.tsx:53 ~ ConfirmCreation ~ data:', data)

  // const { isLoadingIPFS: isPendingTransact, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // })

  const handleDialogClose = (isCancel: boolean, rewardPool: number) => {
    setDialogOpened(false)
    if (isCancel) return
    uploadThenPrompt(rewardPool)
  }

  const promptTransaction = async (fileCID: string, rewardPool: number) => {
    const numberOfClassiQuestions = surveyObj.questions.filter((question) => question.answerType !== EAnswerType.fromZkProof).length
    const zkSources = surveyObj.zkProofs.map((zkProof) => ({ minimumRequired: zkProof.minimumCondition, groupId: zkProof.dataGroup?.id }))
    const questionsZkSources = surveyObj.questions.filter((question) => question.answerType === EAnswerType.fromZkProof).map((question) => question.zkAnswer?.id)

    const args = [
      surveyObj.title,
      fileCID,
      numberOfClassiQuestions,
      surveyObj.tokenRewardAmount,
      surveyObj.endTimestamp,
      zkSources,
      questionsZkSources,
    ]
    // console.log('🚀 ~ file: ConfirmCreation.tsx:59 ~ promptTransaction ~ args:', args)

    setIsPendingTransact(true)
    writeContract({
      address: contractAdress,
      abi: contractABI,
      functionName: 'publishSurvey',
      args,
      value: parseEther(rewardPool.toString()),
    })
      .then((res) => {
        const hash: any = res.hash
        setIsProcessingTransact(true)
        waitForTransaction({ hash })
          .finally(() => setIsProcessingTransact(false))
        console.log('🚀 ~ file: ConfirmCreation.tsx:59 ~ promptTransaction ~ res:', res)
      })
      .finally(() => setIsPendingTransact(false))
  }

  const uploadThenPrompt = async (rewardPool: number) => {
    setIsLoadingIPFS(true)
    const res = await uploadBackend(surveyObj)
      .finally(() => setIsLoadingIPFS(false))
    console.log('File CID = ', res.cid)
    promptTransaction(res.cid, rewardPool)
  }

  const submitSurvey = async () => {
    if (isLoading) return
    if (surveyObj.tokenRewardAmount !== 0) {
      setDialogOpened(true)
      return
    }
    uploadThenPrompt(0)
  }

  return (
    <Box>
      {/* {stringifyObject(surveyObj)} */}
      <LoadingButton
        size='large'
        startIcon={<UploadIcon />}
        loadingPosition='start' loading={isLoading} variant='outlined' onClick={submitSurvey}
      >
        {buttonMessage}
      </LoadingButton>
      <InputRewardPool open={dialogOpened} handleClose={handleDialogClose} />
    </Box>
  )
}

export default ConfirmCreation
