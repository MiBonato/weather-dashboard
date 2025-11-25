import React, {  useState } from 'react'
import Header from './features/layout/Header'
import { Modal } from './features/utils/Modal'
import { FormView } from './features/form/WeatherForm'
import { WeatherView } from './features/weather/WeatherList'
import Footer from './features/layout/Footer'
import { ToastContainer } from 'react-toastify';
import './style/App.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main className="mainContent">
        <WeatherView />
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ajouter une localisation" >
        <FormView onClose={() => setIsModalOpen(false)} />
      </Modal>

    </>
  )
}

export default App


