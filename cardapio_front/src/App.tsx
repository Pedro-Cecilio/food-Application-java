
import { useState } from 'react';
import './App.css'
import { Card } from './components/card/card'
import { UseFoodData } from './hooks/useFoodData'
import { CreateModal } from './components/card/create-modal/create-modal';

function App() {
  const { data } = UseFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  }
  return (
    <div className='container'>
      <h1>Cardápio</h1>
      <div className='card-grid'>
        {data?.map((foodData) => <Card
          id={foodData.id}
          price={foodData.price}
          title={foodData.title}
          image={foodData.image} />
        )}
        {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
        <button onClick={handleOpenModal}>Create Food</button>
      </div>

    </div>
  )
}

export default App
