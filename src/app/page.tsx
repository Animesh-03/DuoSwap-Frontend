import Image from 'next/image'
import { EthersProvider } from 'src/Context/ProviderContext'
import { TransactionProvider } from 'src/Context/TransactionsContext'
import { FooterBody } from 'src/components/FooterBody/FooterBody'
import MainBody from 'src/components/MainBody/MainBody'

export default function Home() {

  return (
    <EthersProvider>
      <TransactionProvider>
        <div>
          <MainBody />
          <FooterBody />
        </div>
      </TransactionProvider>
    </EthersProvider>
  )
}
