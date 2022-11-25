import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { notifySuccess } from '../../utils/notify'
import { ButtonVariants, IData, IDataDetails } from '../../utils/types'
import Button from '../common/button'
import Input from '../common/input'
import InputSelect from '../common/input-select'
import Modal from '../layout/modal'

interface EditModalLocationProps {
    data: IData
    onClose(isSaved: boolean): void
}

const EditLocationModal = ({ data, onClose }: EditModalLocationProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IData>()
    const [genres, setGenres] = useState<IDataDetails[]>()
    const [platforms, setPlatforms] = useState<IDataDetails[]>()

    const postData = async (data: IData) => {
        try {
            await fetch('/api/edit-data', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            notifySuccess({ body: 'Data saved successfully' })
            onClose(true)
        } catch (err: any) {

        }
    }

    const onEditLocation = (dataEdit: IData) => {
        const cloneData = {
            ...data,
            ...dataEdit,
            Genres: genres !== undefined ? genres : [...data.Genres],
            Platforms: platforms !== undefined ? platforms : [...data.Platforms],
        }
        postData(cloneData)
    }

    const onChangeGenre = (value: IDataDetails[]) => {
        setGenres(value)
    }

    const onChangePlatforms = (value: IDataDetails[]) => {
        setPlatforms(value)
    }

    return (
        <Modal title="Edit data" show={!!data}>
            <form>
                <div className='form-group flex'>
                    <Input
                        {...register("Price", { required: 'This field is required' })}
                        errorText={errors.Price && errors.Price.message}
                        id='Price'
                        label='Price'
                        type='number'
                        placeholder='Type Price Here...'
                        defaultValue={data.Price.toString()}
                    />
                </div>
                <div className='form-group flex justify-between mt-4'>
                    <InputSelect
                        id='genre-select'
                        label='Genre'
                        placeholder='Genre'
                        onChangeValue={onChangeGenre}
                        defaultValue={data.Genres}
                        className="mr-10"
                        hint='Please Enter to Add Genre'
                        />
                    <InputSelect
                        id='platform-select'
                        label='Platform'
                        placeholder='Platform'
                        onChangeValue={onChangePlatforms}
                        defaultValue={data.Platforms}
                        hint='Please Enter to Add Platform'
                    />
                </div>
                <div className='flex justify-end mt-14'>
                    <Button label='Cancel' onClick={() => onClose(false)} className='!bg-silver' />
                    <Button label='Save' variant={ButtonVariants.PRIMARY} onClick={handleSubmit(onEditLocation)} submit />
                </div>
            </form>
        </Modal>
    )
}

export default EditLocationModal