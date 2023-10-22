// @ts-nocheck
import { AuthType, ClaimRequest, SismoConnectButton, SismoConnectConfig, SismoConnectResponse } from '@sismo-core/sismo-connect-react'
// import { sismoConfig } from '@/utils/Config'
import { uploadBackend } from '@/utils/uploadBackend'
import { Box, Button } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { SismoButtonContext, SurvveyCreationContext } from '@/constants/contexts'
import LoadingButton from '@mui/lab/LoadingButton'
import { stringifyObject } from '@/utils/ObjUtils'
import { contractABI } from '@/config/contractABI'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { parseEther, parseGwei } from 'viem'
import { EAnswerType } from '@/enums/Questions'
import { sepolia } from '@wagmi/core/chains'
import { writeContract, waitForTransaction, connect, getAccount } from '@wagmi/core'
import { InjectedConnector } from '@wagmi/core/connectors/injected'
import { contractAdress } from '@/config/globalConfig'
import InputRewardPool from './InputRewardPool'
import SaveIcon from '@mui/icons-material/Save'
import UploadIcon from '@mui/icons-material/Upload'
import { useModal } from 'connectkit'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'

function ConfirmCreation () {
  const { surveyObj: surveyObjData, setSurveyObj } = useContext(SurvveyCreationContext)
  const [isLoadingIPFS, setIsLoadingIPFS] = useState(false)
  const [fileCID, setFileCID] = useState('')
  const [submitedSurveyObj, setSubmitedSurveyObj] = useState({})
  const [isPendingTransact, setIsPendingTransact] = useState(false)
  const [isProcessingTransact, setIsProcessingTransact] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasError, sethasError] = useState(false)
  const [dialogOpened, setDialogOpened] = useState(false)
  const { address, isConnecting, isDisconnected } = useAccount()
  const connectKit = useModal()

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
  const isConnected = address!!

  const onError = (error: any) => {
    console.error(error)
    sethasError(true)
    setTimeout(() => {
      sethasError(false)
    }, 3000)
  }

  const buttonMessage = (() => {
    if (hasError) return 'Error'
    if (isSubmitted) return 'Success'
    if (!isConnected) return 'Connect Wallet'
    if (isLoadingIPFS) return 'Publishing on IPFS'
    if (isPendingTransact) return 'Waiting for confirmation'
    if (isProcessingTransact) return 'Deploying on blockchain'
    return 'Submit'
  })()

  const buttonColor = (() => {
    if (hasError) return 'error'
    if (isSubmitted) return 'success'
    if (!isConnected) return 'primary'
    if (isPendingTransact) return 'warning'
    if (isProcessingTransact) return 'warning'
    return 'primary'
  })()

  const buttonIcon = (() => {
    if (hasError) return <ClearIcon />
    if (isSubmitted) return <DoneIcon />
    if (!isConnected) return <UploadIcon />
    if (isPendingTransact) return <UploadIcon />
    if (isProcessingTransact) return <UploadIcon />
    return <UploadIcon />
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
      parseEther(surveyObj.tokenRewardAmount.toString()),
      surveyObj.endTimestamp || '21474836470',
      zkSources,
      questionsZkSources,
    ]
    console.log('🚀 ~ file: ConfirmCreation.tsx:59 ~ promptTransaction ~ args:', args)

    if (!isConnected) {
      connectKit.setOpen(true)
      return
    }
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
          .then(() => {
            setIsSubmitted(true)
            setTimeout(() => {
              setIsSubmitted(false)
            }, 15000)
          })
          .catch(onError)
          .finally(() => setIsProcessingTransact(false))
        console.log('🚀 ~ file: ConfirmCreation.tsx:59 ~ promptTransaction ~ res:', res)
      })
      .catch(onError)
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
        color={buttonColor}
        startIcon={buttonIcon}
        loadingPosition='start' loading={isLoading} variant='outlined' onClick={submitSurvey}
      >
        {buttonMessage}
      </LoadingButton>
      <InputRewardPool open={dialogOpened} handleClose={handleDialogClose} />
    </Box>
  )
}

export default ConfirmCreation
