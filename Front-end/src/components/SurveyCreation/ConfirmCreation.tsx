import { AuthType, SismoConnectButton, SismoConnectConfig, SismoConnectResponse } from '@sismo-core/sismo-connect-react'
// import { sismoConfig } from '@/utils/Config'
import { uploadBackend } from '@/utils/uploadBackend'
import { Box, Button } from '@mui/material'

const sismoConfig : SismoConnectConfig = {
  // you will need to get an appId from the Factory
  appId: '0xce36ae7bbc3221fdba8b40923b7efd32',
}

function ConfirmCreation () {
  return (
    <Box>

      <SismoConnectButton
        config={sismoConfig}
    // request multiple proofs of account ownership
    // (here Vault ownership and Twitter account ownership)
        auths={[
          { authType: AuthType.VAULT },
          { authType: AuthType.TWITTER },
        ]}
    // request multiple proofs of group membership
    // (here the groups with id 0x42c768bb8ae79e4c5c05d3b51a4ec74a and 0x8b64c959a715c6b10aa8372100071ca7)
        claims={[
          { groupId: '0x42c768bb8ae79e4c5c05d3b51a4ec74a' },
          { groupId: '0x8b64c959a715c6b10aa8372100071ca7' },
        ]}
        signature={{ message: 'Your message' }}
        onResponse={async (response: SismoConnectResponse) => {
          // Send the response to your server to verify it
          // thanks to the @sismo-core/sismo-connect-server package
        }}
        onResponseBytes={async (bytes: string) => {
          // Send the response to your contract to verify it
          // thanks to the @sismo-core/sismo-connect-solidity package
        }}
      />

      <Button onClick={() => uploadBackend({ name: 'super', content: 'test' })}>
        Submit
      </Button>

    </Box>
  )
}

export default ConfirmCreation
