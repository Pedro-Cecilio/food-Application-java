import { useState } from "react"
import { FoodData } from "../../../interface/FoodData"
import "./modal.css"
import { UseFoodDataUpdate } from "../../../hooks/useFoodDataUpdate"

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

interface CreateModalProps{
    closeModal():void;
    id?: number,
    price: number,
    title: string,
    image: string
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={(e) => updateValue(e.target.value)}></input>
        </>
    )

}

export function UpdateModal({ closeModal, id, price, title, image }:CreateModalProps) {
    const [newTitle, setNewTitle] = useState(title)
    const [newPrice, setNewPrice] = useState(price)
    const [newImage, setNewImage] = useState(image)
    const { mutate } = UseFoodDataUpdate();



    const submit = () => {
        const foodData: FoodData = {
            id,
            title: newTitle,
            price: parseFloat(newPrice.toString().replace(",", ".")),
            image: newImage
        }
        mutate(foodData);
        closeModal();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form action="" className="input-container">
                    <Input label="Title" value={newTitle} updateValue={setNewTitle}></Input>
                    <Input label="Price" value={newPrice} updateValue={setNewPrice}></Input>
                    <Input label="Image" value={newImage} updateValue={setNewImage}></Input>
                </form>
                <button onClick={submit} className="btn-secondary">Atualizar</button>
            </div>
            <div className="modal-close" onClick={closeModal}>X</div>
        </div>

    )
}