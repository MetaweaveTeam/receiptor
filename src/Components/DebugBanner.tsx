import { Text } from "@nextui-org/react";

export default function DebugBanner() {
  return (<Text css={{overflow: 'scroll'}} blockquote color='error'>
    [DEBUG MODE]
    0xcc933e6b093754a592a35b24d70a7f2322f0819ff4b64bf88b2f71078bce0169
  </Text>)
}
