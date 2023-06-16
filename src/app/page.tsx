import Image from 'next/image'
import { EthersProvider } from 'src/Context/ProviderContext'
import { FooterBody } from 'src/components/FooterBody/FooterBody'
import MainBody from 'src/components/MainBody/MainBody'

export default function Home() {
  return (
    <EthersProvider>
      <div>
        <MainBody />
        <FooterBody />
      </div>
    </EthersProvider>
  )
}
