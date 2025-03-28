#!/usr/bin/env node

if (process.argv.length < 3) {
    console.error("Uso: node miprograma.js [RFP]")
    process.exit(1)
  }
  
//   const rfp = process.argv[2]
  
//   function base36ToBigInt(str) {
//     let result = BigInt(0)
//     const base = BigInt(36)
//     for (let i = 0; i < str.length; i++) {
//       const c = str[i].toUpperCase()
//       let value
//       if (c >= '0' && c <= '9') {
//         value = BigInt(c.charCodeAt(0) - '0'.charCodeAt(0))
//       } else if (c >= 'A' && c <= 'Z') {
//         value = BigInt(c.charCodeAt(0) - 'A'.charCodeAt(0) + 10)
//       } else {
//         throw new Error(`Caracter inválido: ${c}`)
//       }
//       result = result * base + value
//     }
//     return result
//   }
  
//   const rfpNumber = base36ToBigInt(rfp)

const rfp = process.argv[2]
console.log('Convert ', rfp, 'to number')
const rfpNumber = parseInt(rfp, 36)
console.log(rfpNumber.toString())
console.log('Convert back to RFP')
const rfpOriginal = rfp.toString(36).toUpperCase()

console.log('Original RFP', rfpOriginal)

  