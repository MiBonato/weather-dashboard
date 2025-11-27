export default function Tutorial () {
    return (
        <div className="flex s-col w-100 tutorial">
            <div className="tutorial__title">
              Bienvenue sur Weaver Dashboard
            </div>

            <div className="tutorial__paragraph">
              Pour visualiser les données météorologiques d&apos;un lieu ou de votre
              position, appuyez sur le bouton <strong>+</strong> en haut à droite,
              puis entrez les premières lettres de la localité souhaitée et
              sélectionnez-la.
            </div>
            <div>
              Vous pouvez également utiliser le bouton <strong>« Utiliser ma position »</strong>{' '}
              pour obtenir les informations au plus près de votre position (vous devez
              pour cela accepter d&apos;être localisé par votre appareil).
            </div>

            <div className="tutorial__paragraph">
              Une fois obtenues, les informations seront automatiquement actualisées
              tous les quarts d&apos;heure à partir de l&apos;API Open-Meteo.
            </div>

            <div className="tutorial__paragraph">
              <span>Liste des données affichées :</span>
              <ul>
                <li>Température</li>
                <li>Clarté du ciel, couverture nuageuse, type de précipitation</li>
                <li>Vitesse et direction du vent</li>
                <li>Pluviométrie</li>
                <li>Prévisions heure par heure sur les 24 prochaines heures</li>
              </ul>
            </div>
        </div>
    )
}