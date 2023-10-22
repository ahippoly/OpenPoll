// @ts-nocheck
import { EAnswerType } from '@/enums/Questions'
import { contractABI } from '@/config/contractABI'
import { contractAdress } from '@/config/globalConfig'
import { sismoConfig } from '@/utils/Config'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Typography } from '@mui/material'
import { AuthType, ClaimRequest, ClaimType, SismoConnect, SismoConnectButton, SismoConnectResponse } from '@sismo-core/sismo-connect-react'
import { useState } from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { writeContract, waitForTransaction } from '@wagmi/core'
import { useParams } from 'react-router'
import DoneIcon from '@mui/icons-material/Done'
import { useModal } from 'connectkit'
import UploadIcon from '@mui/icons-material/Upload'
import ClearIcon from '@mui/icons-material/Clear'

// function generateSismoParams = () => {}

function getAnswerFromLocalStorage (cid: string) {
  const answerStored = window.localStorage.getItem(`answer-${cid}`)
  if (!answerStored) return []
  const answers = JSON.parse(answerStored)
  const answerArrayForTransaction : any[] = []

  Object.entries(answers).forEach(([key, value]) => {
    answerArrayForTransaction.push(value)
  })

  return answerArrayForTransaction
}

const generateClaims = (survey: Survey) => {
  const claims: ClaimRequest[] = []

  for (const zkSource of survey.zkProofs) {
    claims.push({
      groupId: zkSource.dataGroup?.id,
      value: zkSource.minimumCondition,
      isOptional: false,
      isSelectableByUser: false,
      claimType: ClaimType.GTE,

    })
  }

  for (const zkQuestion of survey.questions) {
    if (zkQuestion.answerType === EAnswerType.fromZkProof) {
      claims.push({
        groupId: zkQuestion.zkAnswer?.id,
        isOptional: false,
        isSelectableByUser: true,
        claimType: ClaimType.GTE,
      })
    }
  }

  return claims
}

function SubmitAnswers (props: any) {
  const survey: Survey = props.survey
  const { cid: cidParams } = useParams<{cid: string}>()
  const cid = cidParams || survey.cid

  const [sismoResponseBytes, setsismoResponseBytes] = useState('')
  const [isPendingTransact, setIsPendingTransact] = useState(false)
  const [isProcessingTransact, setIsProcessingTransact] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasError, sethasError] = useState(false)

  const { address, isConnecting, isDisconnected } = useAccount()
  const connectKit = useModal()

  const isConnected = address!!
  const claims: ClaimRequest[] = generateClaims(survey)

  const onError = (error: any) => {
    console.error(error)
    sethasError(true)
    setTimeout(() => {
      sethasError(false)
    }, 3000)
  }

  const promptTransaction = (sismoResponse: string, cid: string) => {
    const args = [cid, sismoResponse, getAnswerFromLocalStorage(cid)]
    console.log('🚀 ~ file: SubmitAnswers.tsx:59 ~ promptTransaction ~ args:', args)

    if (!isConnected) {
      connectKit.setOpen(true)
      return
    }
    setIsPendingTransact(true)
    writeContract({
      address: contractAdress,
      abi: contractABI,
      functionName: 'answerSurvey',
      args,
    }).then((res) => {
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

  const buttonMessage = (() => {
    if (hasError) return 'Error'
    if (isSubmitted) return 'Success'
    if (!isConnected) return 'Connect Wallet'
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

  const isLoading = isPendingTransact || isProcessingTransact

  const submitSurvey = async () => {
    if (!cid) return
    promptTransaction(sismoResponseBytes, cid)
  }

  return (
    <Box>

      {sismoResponseBytes === ''
        ? (
          <SismoConnectButton
            config={sismoConfig}
            // request multiple proofs of account ownership
            // (here Vault ownership and Twitter account ownership)
            auths={[
              { authType: AuthType.VAULT },
            ]}
            // request multiple proofs of group membership
            // (here the groups with id 0x42c768bb8ae79e4c5c05d3b51a4ec74a and 0x8b64c959a715c6b10aa8372100071ca7)
            claims={claims}
            text='Generate ZkProof'
            onResponse={async (response: SismoConnectResponse) => {
            // Send the response to your server to verify it
            // thanks to the @sismo-core/sismo-connect-server package
            }}
            onResponseBytes={async (bytes: string) => {
              setsismoResponseBytes(bytes)

            // Send the response to your contract to verify it
            // thanks to the @sismo-core/sismo-connect-solidity package
            }}
            callbackUrl={`${window.location.origin}/survey/${cid}`}
          />
          )
        : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 2,
                  color: 'green',
                  justifyContent: 'center',
                  border: 'solid 1px green',
                  borderRadius: '35px',
                  alignSelf: 'center',
                  width: 'fit-content',
                  p: 1,
                }}
              >
                ZkProof generated
                <DoneIcon />
              </Typography>
            </Box>

            <LoadingButton
              size='large'
              startIcon={buttonIcon}
              color={buttonColor}
              loadingPosition='start'
              loading={isLoading}
              variant='outlined' onClick={submitSurvey}
            >
              {buttonMessage}
            </LoadingButton>
          </>
          )}

    </Box>
  )
}

export default SubmitAnswers
