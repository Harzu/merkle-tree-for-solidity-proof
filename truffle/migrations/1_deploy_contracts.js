const MerkleProofValidator = artifacts.require("MerkleProofValidator");

module.exports = function(deployer) {
  deployer.deploy(MerkleProofValidator);
};