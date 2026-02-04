import PersonajeItem from "../components/PersonajeItem";
import { useState } from "react";
import { Item } from "../interfaces/Item";
import axios from "axios";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonSpinner,
  IonText,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";

const API_URL = import.meta.env.VITE_API_URL;

const Home: React.FC = () => {
  const [personajes, setPersonajes] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPersonajes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setPersonajes(response.data.items);
    } catch (error) {
      console.error("Error al obtener personajes:", error);
      setError("Error al cargar los personajes. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    fetchPersonajes();
  });

  const refresh = async (e: CustomEvent) => {
    await fetchPersonajes();
    e.detail.complete();
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Personajes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Personajes</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Estado de carga */}
        {loading && (
          <div className="ion-text-center ion-padding">
            <IonSpinner name="crescent" />
            <p>Cargando personajes...</p>
          </div>
        )}

        {/* Estado de error */}
        {error && !loading && (
          <div className="ion-text-center ion-padding">
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          </div>
        )}

        {/* Estado vacío */}
        {!loading && !error && personajes.length === 0 && (
          <div className="ion-text-center ion-padding">
            <IonText color="medium">
              <p>No hay personajes disponibles.</p>
            </IonText>
          </div>
        )}

        {/* Lista de personajes */}
        {!loading && !error && personajes.length > 0 && (
          <IonList>
            {personajes.map((p) => (
              <PersonajeItem key={p.id} personaje={p} />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
