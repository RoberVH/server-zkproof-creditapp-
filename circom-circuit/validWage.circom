pragma circom 2.2.1;

include "circomlib/circuits/poseidon.circom";
include "circomlib/circuits/comparators.circom";

template validateWage() {
    // Private inputs
    signal input EmployeeWage;    // Employee's wage
    signal input RFPEmployee;     // Employee's RFP (numeric hash)
    signal input salt;            // Salt for the hash

    // Public inputs
    signal input RFP;             // RFP supplied by prover/verifier
    signal input suppliedHash;    // Hash supplied for comparison

    // Public output
    signal output isEligible;

    // Fixed limit for a MXN 7,000 monthly payment
    var LimitWage = 28000;         // Fixed wage limit. Because making it an public input would make easy to guess employee wage through brute force

    // Constraints
    // 1. EmployeeWage >= LimitWage
     component wageCheck = GreaterEqThan(32); // 32 bits de precisión
    wageCheck.in[0] <== EmployeeWage;
    wageCheck.in[1] <== LimitWage;
    wageCheck.out === 1;                     // Must be 1 (true)

    // 2. RFPEmployee == RFP
    RFPEmployee === RFP;                     // Strict equality

    // 3. Hash matches Poseidon(EmployeeWage, RFPEmployee, salt)
    component poseidon = Poseidon(3);
    poseidon.inputs[0] <== EmployeeWage;
    poseidon.inputs[1] <== RFPEmployee;
    poseidon.inputs[2] <== salt;
    signal computedHash;
    computedHash <== poseidon.out;
    computedHash === suppliedHash;            // Must match

    // Output: isEligible = 1 if all pass, 0 if any fails
    // (In reality, if any fails, the witness is not generated)
    isEligible <== 1;                        // Only assigned if all pass
}

component main {public [RFP, suppliedHash]} = validateWage();