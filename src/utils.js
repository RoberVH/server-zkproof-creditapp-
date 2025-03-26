

// Convert a string into a BigInt compose of very ascii char in the string
export const convertStrToBigInt = (str) => {
    return BigInt(str.split('').map(char => char.charCodeAt(0)).join(''))
  };