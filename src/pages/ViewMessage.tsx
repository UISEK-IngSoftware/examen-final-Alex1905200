import { useState } from "react";
import { Item } from "../interfaces/Item";
import axios from "axios";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import "./ViewMessage.css";

const API_URL = import.meta.env.VITE_API_URL;

function ViewMessage() {
  const [personaje, setPersonaje] = useState<Item>();
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    const fetchPersonaje = async () => {
      try {
        const response = await axios.get(`${API_URL}/${params.id}`);
        setPersonaje(response.data);
      } catch (error) {
        console.error("Error al obtener personaje:", error);
      }
    };
    fetchPersonaje();
  });

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text="Personajes"
              defaultHref="/home"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {personaje ? (
          <>
            <IonItem>
              <IonIcon
                aria-hidden="true"
                icon={personCircle}
                color="primary"
              ></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {personaje.name}
                  <span className="date">
                    <IonNote>{personaje.status}</IonNote>
                  </span>
                </h2>
                <h3>
                  Especie: <IonNote>{personaje.species}</IonNote>
                </h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{personaje.name}</h1>
              {personaje.image && (
                <img
                  src={personaje.image}
                  alt={personaje.name}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              )}
              <p>
                <strong>Género:</strong> {personaje.gender}
              </p>
              <p>
                <strong>Estado:</strong> {personaje.status}
              </p>
              <p>
                <strong>Especie:</strong> {personaje.species}
              </p>
              <p>
                <strong>Creado:</strong>{" "}
                {new Date(personaje.createdAt).toLocaleDateString()}
              </p>
            </div>
          </>
        ) : (
          <div>Personaje no encontrado</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewMessage;
