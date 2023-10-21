
import { SismoConnectConfig } from '@sismo-core/sismo-connect-react'

export const sismoConfig : SismoConnectConfig = {
  // you will need to get an appId from the Factory
  vault: {
    impersonate: [
      '0x1022794e8fcd336359ff3c681836638d51fa8234',
      '0x000000000dfde7deaf24138722987c9a6991e2d4',
      '0x4873178bea2dcd7022f0ef6c70048b0e05bf9017',
    ],
  },
  appId: '0xce36ae7bbc3221fdba8b40923b7efd32',
}
