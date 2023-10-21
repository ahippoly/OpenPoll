import { EAnswerType } from '@/@types/enums/Questions'
import { contractABI } from '@/config/contractABI'
import { contractAdress } from '@/config/globalConfig'
import { sismoConfig } from '@/utils/Config'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box } from '@mui/material'
import { AuthType, ClaimRequest, ClaimType, SismoConnect, SismoConnectButton, SismoConnectResponse } from '@sismo-core/sismo-connect-react'
import { useState } from 'react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

// function generateSismoParams = () => {}

// const

function SubmitAnswers (props: any) {
  const survey: Survey = props.survey
  // const args = ['bafybeihrlflerpb6cdt6vgwdty3jripx4dlsfy5eyube5ak7voluj3cc34', '0x0000000000000000000000000000000000000000000000000000000000000020ce36ae7bbc3221fdba8b40923b7efd3200000000000000000000000000000000b8e2054f8a912367e38a22ce773328ff000000000000000000000000000000007369736d6f2d636f6e6e6563742d76312e31000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001a068796472612d73332e310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000004a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001066d5a7e52d6027d02c3e1ffc53b50232256d885d7f00a96891907a744ad893c00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002c01c1564cd9afd1c637362790ed36e36f874c44a1ed81fced10aa448eb7da34e8c1a389cd38ecf75db0a0560068f65af9db578a1b719e1443b0477512b1ed689f01ad36392ad88f74d91e95396b3e0851fba83e803b833d989bd509b7127d31a39302a62259c9bebf39704b593a288b5e3b98a110b951a3e9224a616b87bd642e528f7d18f54c74b3c95a4405d045da34b435912cc773a97363e95efc24d876a03181e896353caec7b0c663bded451001e91e2f7275f5bded5b51bd840a457fdf52964b9f8d197cc1680de9ddc052d9f37a3d9ef5b38adee67df5d6bc40069a02d00460c653f30d91efb81905ec639a88c3162443c3239f3efcf1b857bb6d480590000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007f6c5612eb579788478789deccb06cf0eb168e457eea490af754922939ebdb920706798455f90ed993f8dac8075fc1538738a25f0c928da905c0dffd81869fa000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000066d5a7e52d6027d02c3e1ffc53b50232256d885d7f00a96891907a744ad893c0c7f58ea10c3affcac3544de8871e7aaeec1451e3db4b49dd0c5d4ae6dda34cb000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', [1, 2, 3]]

  // const { config } = usePrepareContractWrite({
  //   address: contractAdress,
  //   abi: contractABI,
  //   functionName: 'answerSurvey',
  //   args,
  //   enabled: Boolean(true),
  // })
  // const { data, write } = useContractWrite(config)

  // const { isLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // })

  console.log('meta env ', import.meta.env)

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
        value: 1,
      })
    }
  }

  const submitSurvey = async () => {
    // if (!write) return
    // write()

    const sismoConnect = SismoConnect({ config: sismoConfig })

    sismoConnect.request({
      auth: { authType: AuthType.VAULT },
      claims: [

        {
          // id of the group gitcoin-passport-holders
          // https://factory.sismo.io/groups-explorer?search=gitcoin-passport-holders
          groupId: '0xe90645adb26c2b20632c26f2d183a65f',
          // users should have at least 15 as value in the group to claim the airdrop
          value: 1,
          isSelectableByUser: true,
          claimType: ClaimType.GTE,
        },
      ],
    })
  }

  return (
    <Box>

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
        text='Submit with Sismo'
        onResponse={async (response: SismoConnectResponse) => {
          console.log('🚀 ~ file: SurveyItem.tsx:49 ~ onResponse={ ~ response:', response)
          // Send the response to your server to verify it
          // thanks to the @sismo-core/sismo-connect-server package
        }}
        onResponseBytes={async (bytes: string) => {
          console.log('🚀 ~ file: SurveyItem.tsx:144 ~ bytes', bytes)
          // Send the response to your contract to verify it
          // thanks to the @sismo-core/sismo-connect-solidity package
        }}
        callbackUrl={`${import.meta.env.VITE_BASE_URL}/survey/${survey.cid}`}
      />
      <LoadingButton variant='outlined' onClick={submitSurvey}>
        Submit
      </LoadingButton>

    </Box>
  )
}

export default SubmitAnswers
