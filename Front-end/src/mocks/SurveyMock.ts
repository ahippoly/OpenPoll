import { EAnswerType } from '@/@types/enums/Questions'
import { clone } from '@/utils/ObjUtils'

export const defaultSismoGroup1: SismoGroup = {
  description: 'Data Group of users of Gitcoin Passport, Proof of Humanity, Quadrata Passport, Masa Green, PoE &more',
  id: '0x349d8bd135bd903a633464f9b303c902',
  name: 'verified-human',
  specs: 'A massive collection of addresses that have verified their identity via either:\n- Gitcoin Passport \n- Proof of Humanity \n- Binance (BABT holders) @ BSC \n- World ID users that have verified their Lens profile through HumanCheck on Polygon (0x8f9b3A2Eb1dfa6D90dEE7C6373f9C0088FeEebAB) \n-  Quadrata Passport holders @ Polygon (0x2e779749c40cc4ba1cab4c57ef84d90755cc017d) or Ethereum Mainnet (0x2e779749c40CC4Ba1cAB4c57eF84d90755CC017d) \n- Anima “proof of personhood“ NFT holders (Anima Fairdrop) on Polygon (0x58267503ed6a12F263b90CeA42014BAdb6eC15DD) \n- Humanbound verified users on Optimism, Arbitrum, Polygon, Ethereum \n- Masa Green 2FA (aka Bot killer) Polygon (0xeb05dca1a7e0e37e364b938d989fc0273ff3bfca) contract interactors; taken from https://github.com/masa-finance/analytics/blob/main/src/csv/addresses.csv \n- Proof of Existence (PoE by GovernorDao) minters on Polygon (0x15a84e83e039a63a230ba786231dfb99544f7acb)',
  numberOfAccounts: 820126,
}

export const defaultSismoGroup0: SismoGroup = {
  description: 'Data Group of all addresses that own a Gitcoin Passport',
  id: '0x1cde61966decb8600dfd0749bd371f12',
  name: 'gitcoin-passport-holders',
  specs: 'Contains all addresses that own a Gitcoin Passport. The value of each group member corresponds to their Gitcoin Passport score.',
  numberOfAccounts: 730373,
}

export const defaultSismoGroup2: SismoGroup = {
  description: 'Data Group of all rAAVE attendee',
  id: '0xcde5892370aeb8f486b5d85a519aaa1a',
  name: 'early-raave-attendee',
  specs: 'Created by the POAP Data Provider. Contains owners of the following POAPs: • 3532 (Paris, July 2021) • 8507 (Lisbon, October 2021) • 14048 (Helsinki, December 2021) • 32225 (Amsterdam, April 2022) • 47553 (Paris, July 2022) • 63182 (Bogota, October 2022)',
  numberOfAccounts: 1658,
}

export const defaultQuestion1: Question = {
  title: 'What is your name?',
  order: 1,
  answerType: EAnswerType.multipleAnswer,
  possibleAnswers: ['A', 'B', 'C'],
}

export const defaultQuestion2: Question = {
  title: 'Your Age?',
  order: 1,
  answerType: EAnswerType.number,
  rangeAnswer: [10, 100],
}

export const defaultQuestion3: Question = {
  title: 'Your money account',
  order: 1,
  answerType: EAnswerType.fromZkProof,
  zkAnswer: defaultSismoGroup1,
}

export const defaultZkSource1: ZkSource = {
  minimumCondition: 10,
  dataGroup: defaultSismoGroup1,
}

export const defaultZkSource0: ZkSource = {
  minimumCondition: 10,
  dataGroup: defaultSismoGroup0,
}

export const defaultZkSource2: ZkSource = {
  minimumCondition: 20,
  dataGroup: defaultSismoGroup2,
}

export const defaultSurvey: Survey = {
  title: 'Test Survey',
  questions: [clone(defaultQuestion1), clone(defaultQuestion2), clone(defaultQuestion3)],
  zkProofs: [clone(defaultZkSource1), clone(defaultZkSource2)],
  endTimestamp: 0,
  tokenRewardAmount: 0,
}
