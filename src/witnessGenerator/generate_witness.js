import path from "path";
import { fileURLToPath } from "url";
import  wc from "./witness_calculator.js"
import { readFile, writeFile } from "fs/promises";
import fs from "fs";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wasmPath = path.join(__dirname, "../witnessGenerator/validWage.wasm");
const wasmFile = await readFile(wasmPath);

async function generateWitness(inputData) {
	try {
		const witnessCalculator = await wc(wasmFile);
		const witnessBuffer = await witnessCalculator.calculateWTNSBin(inputData, 0);
		return {status: true, witnessFile: witnessBuffer}
	} catch (error) {
		console.log('generateWitness.error', error.message)
		return {status: false, msg: error.message}
		}
    }
	export { generateWitness };