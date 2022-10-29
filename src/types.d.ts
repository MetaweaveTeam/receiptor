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

export { ArTransaction, ArTag };