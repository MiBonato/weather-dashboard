import React, {  useState } from 'react'
import { useSelector } from 'react-redux'
import Header from './features/layout/Header'
import { Modal } from './features/utils/Modal'
import Tutorial from './features/layout/Tutorial'
import { FormView } from './features/form/WeatherForm'
import { WeatherView } from './features/weather/WeatherList'
import Footer from './features/layout/Footer'
import { ToastContainer } from 'react-toastify';
import './style/App.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const { data } = useSelector((state) => state.weather)

  const [modalType, setModalType] = useState(null); 

  const openLocationModal = () => setModalType('location');
  const openTutorialModal = () => setModalType('tutorial');
  const closeModal = () => setModalType(null);

  
  return (
    <>
      <Header onOpenModal={openLocationModal} onOpenTutorial={openTutorialModal} />
      <main className="mainContent">
        {(!data || data.length === 0 ) && <Tutorial /> }
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

      <Modal
        isOpen={modalType !== null}
        onClose={closeModal}
        title={
          modalType === 'location'
            ? 'Ajouter une localisation'
            : modalType === 'tutorial'
              ? 'Utilisation'
              : ''
        }
      >
        {modalType === 'location' && (
          <FormView onClose={closeModal} />
        )}

        {modalType === 'tutorial' && (
          <Tutorial />
        )}
      </Modal>

    </>
  )
}

export default App


