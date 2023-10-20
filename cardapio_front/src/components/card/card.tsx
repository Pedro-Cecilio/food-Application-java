import { useState } from 'react';
import { UseFoodDataDelete } from '../../hooks/useFoodDataDelete'
import './card.css'
import { UpdateModal } from './update-modal/update-modal';

interface CardUpdateProps {
    id?: number,
    price: number,
    title: string,
    image: string

}


export function Card({ id, price, image, title }: CardUpdateProps) {
    const { mutate: deleteMutate } = UseFoodDataDelete();
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(prev => !prev);
    }

    const onDelete = () => {
        deleteMutate(id);
    }

    return (
        <div className="card">
            <div className='card-content'>
                <img src={image} />
                <h2>{title}</h2>
                <p><b>Valor: {price}</b></p>
            </div>
            <div className='card-functions'>
                <div className='btn-delete' onClick={onDelete}>Delete</div>
                <div className='btn-update' onClick={handleOpenModal}>Update</div>
            </div>
            {isModalOpen && <UpdateModal closeModal={handleOpenModal} id={id} price={price} image={image} title={title} />}
        </div>
    )
}