import { EthersProvider } from 'src/Context/ProviderContext'
import MainBody from 'src/components/MainBody/MainBody'

export default function Home() {

  return (
    <EthersProvider>
      <div>
        <MainBody />
      </div>
    </EthersProvider>
  )
}
