import { useSelector } from 'react-redux'

function Header({ onOpenModal, onOpenTutorial }) {
  const { data } = useSelector((state) => state.weather)

  return (
    <header className="header flex s-row jc-between ai-center w-100">
      <img src="clear-day.svg" alt="ajouter" />
      <span>Weaver Dashbord</span>
      <div className='flex s-row'>
        { (data && data.length > 0 ) &&
          <button className='' type="button" onClick={onOpenTutorial} aria-label="Afficher le tutoriel">i</button>
        }
        <button className="flex jc-center ai-center" type="button" onClick={onOpenModal} aria-label="Ajouter une localisation">+</button>
      </div>
    </header>
  );
}

export default Header