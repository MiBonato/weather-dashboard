export default function Header({ onOpenModal }) {
  return (
    <header className="header flex s-row jc-between ai-center w-100">
      <img src="clear-day.svg" alt="ajouter" />
      <span>Weaver Dashbord</span>
      <button className="flex jc-center ai-center" type="button" onClick={onOpenModal} aria-label="Ajouter une localisation">+</button>
    </header>
  );
}
