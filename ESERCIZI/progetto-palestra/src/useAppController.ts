import { useState, useEffect } from 'react';
import GetEquipments from './services/GetEquipments.api'; // funzione con promise per la richiesta HTTP GET di tutti gli equipments
import { type Equipment } from './models/Equipment.model';



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
function useAppController() {

    //* prendiamo tramite fetch GET, gli equipments della palestra da passare al Route <Home></Home>
    const [equipments, setEquipments] = useState<Equipment[]>([]);

    //* in caso la fetch GET degli equipments non va a buon fine, verrà settato un errore da mostrare nella Route <Home></Home>
    const [error, setError] = useState<string | null>(null);


    /* 
    al montaggio dell'App.tsx sarà avviato l'useEffect che fa una richiesta HTTP fetch per ricevere gli equipments per poi passarli al Route <Home></Home>
    richiamiamo la chiamata fetch che risolve la Promise che è stata restituita, con i dati equipments / errori
    01. i dati ricevuti con successo saranno settati tramite il setEquipments cambiano lo stato dell'App.tsx
    02. gli errori ricevuti dal fallimento della fetch o stato di errore, gestiti tramite lo stato apposito di App.tsx setError 
    */
    useEffect(() => {
        GetEquipments("https://d3660g9kardf5b.cloudfront.net/api/equipment")
            .then(res => { setEquipments(res); console.log(equipments) })  // successo, salviamo i dati 
            .catch(() => setError("Errore nel caricamento degli equipments! Riprova più tardi.")) // gestiamo errori da mostrare all'utente
            .finally(() => console.warn("Chiamata equipments chiusa."));
    }, []);



    // restituiamo gli state e le funzioni evocate dal form all'iterno del file Login.tsx
    return {
        equipments,
        error,
    }
}

export default useAppController;