import { buildPoseidon } from 'circomlibjs';



let poseidonHasher; // Instancia de Poseidon

(async () => {
  try {
    poseidonHasher = await buildPoseidon(); // Inicializa Poseidon al inicio
  } catch (error) {
    console.error("Error loading Poseidon Library at startup:", error);
    process.exit(1);
  }
})();


// async function getPoseidonHasherForLength(n) {
//   // n es el número de entradas, por lo que t debe ser n+1
//   return await buildPoseidon({ t: n + 1 })
// }

/**
 * 
 * @param {*} inputToHash Must be a number Array 
 * @returns 
 */
export const poseidonHash = async (inputToHash) => {
    try {
      // const poseidonHasher = await getPoseidonHasherForLength();
      const hash = poseidonHasher(inputToHash); // Genera el hash como bigint

      return {
        status: true,
        hash: poseidonHasher.F.toString(hash) // Convierte a string numérica
      };
    } catch (error) {
      console.log('error en poseidon', error)
      return { status: false, msg: error.message };
    }
  };

