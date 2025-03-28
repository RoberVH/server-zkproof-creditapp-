pragma circom 2.2.1;

include "circomlib/circuits/poseidon.circom";
include "circomlib/circuits/comparators.circom";

template getvalidWagehashes() {
    // Private inputs
    signal input EmployeeWage;    // Employee's wage
    signal input RFPEmployee;     // Employee's RFP (numeric hash)
    signal input salt;            // Salt for the hash

    component poseidon = Poseidon(3);
    poseidon.inputs[0] <== EmployeeWage;
    poseidon.inputs[1] <== RFPEmployee;
    poseidon.inputs[2] <== salt;
    signal computedHash;
    computedHash <== poseidon.out;
    log(computedHash);
}

component main = getvalidWagehashes();