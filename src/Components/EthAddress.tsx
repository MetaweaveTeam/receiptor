import { Link } from "@nextui-org/react"

export default function EthAddress({hash}: {hash: `0x${string}`}) {

  return(
    <Link
      block
      color="secondary"
      isExternal
      href={`https://etherscan.io/address/${hash}`}
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