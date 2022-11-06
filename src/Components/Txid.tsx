import useWindowSize from './../hooks/useWindowSize'

export default function Txid({hash}: {hash: `0x${string}`}) {
  const [width] = useWindowSize();

  return(
    <a
      href={`https://etherscan.io/tx/${hash}`}
      style={style}
      target='_blank'
      rel="noreferrer"
    >
      {width}
      {`${hash.slice(0,15)}...${hash.slice(-15,hash.length)}`}
    </a>
  )
}

const style = {
  display: 'contents',
  fontFamily: 'monospace'
}