interface ArTransaction {
  format: number;
  id: string;
  last_tx: string;
  owner: string;
  tags: ArTag[];
  target: string;
  quantity: string;
  data_root: string;
  data: string;
  data_size: string;
  reward: string;
  signature: string;
}

interface ArTag {
  name: string;
  value: string;
}

interface PoR {
  txid: `0x${string}`;
  notes: string;
  vat: number;
}

interface Receipt {
  txid: `0x${string}`;
  timestamp?: number;
  erc20: {
    id: `0x${string}`,
    ticker: string,
    name: string
  };
  amount: number;
  from: `0x${string}`;
  to: `0x${string}`;
}

export { ArTransaction, ArTag, PoR, Receipt };
