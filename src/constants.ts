import { ethers } from "ethers";

const provider = new ethers.providers.InfuraProvider()
const nodeURL = "http://localhost:3001/"

export { provider, nodeURL }