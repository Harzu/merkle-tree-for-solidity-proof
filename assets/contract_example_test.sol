// SPDX-License-Identifier: GPL-3.0
    
pragma solidity >=0.4.22 <0.8.0;
import "remix_tests.sol";
import "./contract_example.sol";

contract testSuite {
  V testContract;
  
  function beforeAll() public {
    testContract = new V();
  }

  function validateProof() public {
    bytes32 leaf = 0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6;
    bytes32 root = 0xde63bd589648010fd22507a07ad4bf900c4fdb8fc25f667942c9f0bb47337929;
    bytes32[4] memory proof;
    proof[0] = 0xa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c688;
    proof[1] = 0x785d900e31f9d29b552270f302c6894512fbbc393336960b5d4194d93a7814b5;
    proof[2] = 0x3d047c7dea9ed1e56c771d799e2b5e7880df6107c422809d419b3e7cbce3bba3;
    proof[3] = 0x599b5b3e642afe03df05b36f7fdb145cc4ae8958fec6884cafe44f9e32e41f28;

    bool valid = testContract.verifyProof(proof, root, leaf);
    Assert.equal(valid, true, 'not valid');
  }

  function validateProofOrdered() public {
    bytes32 leaf = 0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6;
    bytes32 root = 0x9ee9ef6bba1b8f4cadfa87b4b91d9eafb79b884a4e7339d1e6bbef524eb22257;
    bytes32[4] memory proof;
    proof[0] = 0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace;
    proof[1] = 0x4a008209643838d588e1e3949a8a49c2dc4dfb50ee6aab985a7cf6eccba95084;
    proof[2] = 0x93a9286c067f82c8666b4d8a4fcd402e8a5992c77f801d840b6bacce9ce19dc9;
    proof[3] = 0x896c110cc2cc875ec7c07aa1050a02520362818caed64e3c44388bb9776d7478;

    bool valid = testContract.verifyProofOrdered(proof, root, leaf, 0);
    Assert.equal(valid, true, 'not valid');
  }
}
