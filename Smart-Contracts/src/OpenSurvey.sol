// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "sismo-connect-solidity/SismoConnectLib.sol"; 

contract OpenSurvey is SismoConnect {
    uint256 public cid;

    constructor(bytes16 appId) SismoConnect(buildConfig(appId)) {}

    struct Answer {
        uint256 id;
        string answer;
    }

    function answerSurvey(bytes memory sismoConnectResponse) public {   

    ClaimRequest[] memory claims = new ClaimRequest[](2);
    claims[0] = buildClaim({groupId: 0x42c768bb8ae79e4c5c05d3b51a4ec74a});
    claims[1] = buildClaim({groupId: 0x8b64c959a715c6b10aa8372100071ca7}); 

    SismoConnectVerifiedResult memory result = verify({
        responseBytes: sismoConnectResponse,
        // we want users to prove that they own a Sismo Vault
        // and that they are members of the group with the id 0x42c768bb8ae79e4c5c05d3b51a4ec74a
        // we are recreating the auth and claim requests made in the frontend to be sure that 
        // the proofs provided in the response are valid with respect to this auth request
        claims: claims
        // we also want to check if the signed message provided in the response is the signature of the user's address
        // signature:  buildSignature({message: abi.encode(msg.sender)})
    });

    // if the proofs and signed message are valid, we can take the userId from the verified result
    // in this case the userId is the vaultId (since we used AuthType.VAULT in the auth request) 
    // it is the anonymous identifier of a user's vault for a specific app 
    // --> vaultId = hash(userVaultSecret, appId)
    uint256 vaultId = SismoConnectHelper.getUserId(result, AuthType.VAULT);
    
    // do something with this vaultId for example
}

}
