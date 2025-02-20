import { useRef } from 'react'
import { trpc } from '../utils/trpc'
import { RouterInputs } from '../utils/trpc'

import Input from './Input'

export const AddSiloForm = () => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const utils = trpc.useUtils()

  const siloAdder = trpc.addSilo.useMutation({
    onSuccess: () => utils.silos.invalidate(),
  })

  const handleAddSilo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { silo, volume, stored, crop, customer } = event.currentTarget
    siloAdder.mutate({
      name: silo.value,
      volume: parseInt(volume.value),
      stored: parseInt(stored.value),
      crop: crop.value,
      customer: customer.value,
    })
    modalRef.current?.close()
  }

  return (
    <SiloForm
      openButtonText="+"
      submitButtonText="Add silo"
      handleFunction={handleAddSilo}
      modalRef={modalRef}
    />
  )
}

export const UpdateSiloForm = ({
  inputValue,
}: {
  inputValue: RouterInputs['updateSilo']
}) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const utils = trpc.useUtils()

  const siloUpdater = trpc.updateSilo.useMutation({
    onSuccess: () => utils.silos.invalidate(),
  })

  const handleUpdateSilo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { silo, volume, stored, crop, customer } = event.currentTarget
    siloUpdater.mutate({
      id: inputValue.id,
      name: silo.value,
      volume: parseInt(volume.value),
      stored: parseInt(stored.value),
      crop: crop.value,
      customer: customer.value,
    })
    modalRef.current?.close()
  }

  return (
    <SiloForm
      openButtonText="Update"
      submitButtonText="Apply changes"
      handleFunction={handleUpdateSilo}
      modalRef={modalRef}
      inputValue={inputValue}
    />
  )
}

const SiloForm = ({
  openButtonText,
  submitButtonText,
  handleFunction,
  modalRef,
  inputValue,
}: {
  openButtonText: string
  submitButtonText: string
  handleFunction: (event: React.FormEvent<HTMLFormElement>) => void
  modalRef: React.RefObject<HTMLDialogElement | null>
  inputValue?: {
    name: string
    volume: string | number
    crop: string
    stored: string | number
    customer: string
  }
}) => {
  if (inputValue === undefined) {
    inputValue = {
      name: '',
      volume: 0,
      crop: '',
      stored: 0,
      customer: '',
    }
  }

  return (
    <>
      <button onClick={() => modalRef.current?.showModal()}>
        {openButtonText}
      </button>

      <dialog ref={modalRef}>
        <form method="dialog">
          <button>X</button>
        </form>

        <form onSubmit={handleFunction}>
          <Input
            id="silo"
            label="Name"
            placeholder="Name of silo"
            defaultValue={inputValue.name}
          />
          <Input
            id="volume"
            label="Volume"
            placeholder="Volume of silo"
            defaultValue={inputValue.volume}
          />
          <Input
            id="crop"
            label="Crop"
            placeholder="Crop in silo"
            defaultValue={inputValue.crop}
          />
          <Input
            id="stored"
            label="Stored"
            placeholder="Stored in silo"
            defaultValue={inputValue.stored}
          />
          <Input
            id="customer"
            label="Customer"
            placeholder="Customer"
            defaultValue={inputValue.customer}
          />

          <button type="submit">{submitButtonText}</button>
        </form>
      </dialog>
    </>
  )
}

export const RemoveSiloForm = ({
  silo,
}: {
  silo: RouterInputs['updateSilo']
}) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const utils = trpc.useUtils()

  const siloRemover = trpc.deleteSilo.useMutation({
    onSuccess: () => utils.silos.invalidate(),
  })

  const handleRemoveSilo = (id: number) => {
    siloRemover.mutate({ id })
    modalRef.current?.close()
  }

  return (
    <>
      <button onClick={() => modalRef.current?.showModal()}>Delete</button>

      <dialog ref={modalRef}>
        <form method="dialog">
          <button>X</button>
        </form>
        <p>Are you sure you want to delete silo:</p>
        <p>{silo.name}</p>
        <p>{silo.crop}</p>
        <p>
          {silo.stored} / {silo.volume}
        </p>
        <p>{silo.customer} ?</p>

        <button onClick={() => handleRemoveSilo(silo.id)}>Delete</button>
      </dialog>
    </>
  )
}
