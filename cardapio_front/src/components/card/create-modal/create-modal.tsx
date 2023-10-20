import { useEffect, useState } from "react"
import { UseFoodDataMutate } from "../../../hooks/userFoodDataMutate"
import { FoodData } from "../../../interface/FoodData"
import "./modal.css"

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

interface CreateModalProps{
    closeModal():void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={(e) => updateValue(e.target.value)}></input>
        </>
    )

}



export function CreateModal({ closeModal }:CreateModalProps) {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const { mutate, isSuccess } = UseFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title,
            price: parseFloat(price.toString().replace(",", ".")),
            image
        }
        mutate(foodData);
    }
    useEffect(()=>{
        if(isSuccess) {
            closeModal();
        }
    }, [isSuccess]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form action="" className="input-container">
                    <Input label="Title" value={title} updateValue={setTitle}></Input>
                    <Input label="Price" value={price} updateValue={setPrice}></Input>
                    <Input label="Image" value={image} updateValue={setImage}></Input>
                </form>
                <button onClick={submit} className="btn-secondary">Criar</button>
            </div>
            <div className="modal-close" onClick={closeModal}>X</div>
        </div>

    )
}