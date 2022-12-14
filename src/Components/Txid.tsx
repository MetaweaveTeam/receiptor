import { Link } from '@nextui-org/react';
// import useWindowSize from './../hooks/useWindowSize'

export default function Txid({hash}: {hash: `0x${string}`}) {
  // const [width] = useWindowSize();

  return(
    <Link
      color="secondary"
      block
      isExternal
      href={`https://etherscan.io/tx/${hash}`}
      style={style}
      target='_blank'
      rel="noreferrer"
    >
      {`${hash.slice(0,6)}...${hash.slice(-4,hash.length)}`}
    </Link>
  )
}

const style = {
  display: 'inline-flex',
  fontFamily: 'monospace'
}