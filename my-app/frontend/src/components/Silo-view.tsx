import SiloList from './Silo-list'
import { AddSiloForm } from './Silo-form'

const Siloview = () => {
  return (
    <div>
      <h1>Silos</h1>
      <AddSiloForm />
      <SiloList />
    </div>
  )
}

export default Siloview
