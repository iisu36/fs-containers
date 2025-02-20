import { trpc } from '../utils/trpc'
import { RemoveSiloForm, UpdateSiloForm } from './Silo-form'

const SiloList = () => {
  const siloQuery = trpc.silos.useQuery()

  return (
    <ul>
      {siloQuery.data?.map((silo) => (
        <li key={silo.id}>
          <span>{silo.name}</span>
          <span> --- </span>
          <span>{silo.crop}</span>
          <span> --- </span>
          <span>
            {silo.stored} / {silo.volume}
          </span>
          <span> --- </span>
          <span>{silo.customer}</span>
          <UpdateSiloForm inputValue={silo} />
          <RemoveSiloForm silo={silo} />
        </li>
      ))}
    </ul>
  )
}

export default SiloList
