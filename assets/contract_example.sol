pragma solidity >=0.7.0;

contract V {
  function verifyProof(
    bytes32[2] memory proof,
    bytes32 root,
    bytes32 leaf,
    uint index
  )
    public pure returns (bool)
  {
    bytes32 hash = leaf;

    for (uint i = 0; i < proof.length; i++) {
      bytes32 proofElement = proof[i];

      if (index % 2 == 0) {
        hash = keccak256(abi.encodePacked(hash, proofElement));
      } else {
        hash = keccak256(abi.encodePacked(proofElement, hash));
      }

      index = index / 2;
    }

    return hash == root;
  }

  function verifyProof(
    bytes32[4] memory proof,
    bytes32 root,
    bytes32 leaf
  )
    public pure returns (bool)
  {
    bytes32 hash = leaf;

    for (uint i = 0; i < proof.length; i++) {
      bytes32 el = proof[i];

      if (hash < el) {
        hash = keccak256(abi.encodePacked(hash, el));
      } else {
        hash = keccak256(abi.encodePacked(el, hash));
      }
    }

    return hash == root;
  }
}