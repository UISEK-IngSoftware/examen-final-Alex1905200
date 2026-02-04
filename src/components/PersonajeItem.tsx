import React from "react";
import { IonCard, IonCardContent } from "@ionic/react";
import { Item } from "../interfaces/Item";

import "./PersonajeItem.css";

interface PersonajeItemProps {
  personaje: Item;
}

const PersonajeItem: React.FC<PersonajeItemProps> = ({ personaje }) => {
  const defaultImage = "https://ionicframework.com/docs/img/demos/avatar.svg";

  return (
    <IonCard>
      <IonCardContent>
        <div className="personaje-container">
          <img
            className="personaje-image"
            alt={personaje.name}
            src={personaje.image || defaultImage}
          />
          <div className="personaje-info">
            <h2 className="personaje-name">{personaje.name}</h2>
            <p>
              <strong>Especie:</strong> {personaje.species}
            </p>
            <p>
              <strong>Estado:</strong> {personaje.status}
            </p>
            <p>
              <strong>Género:</strong> {personaje.gender}
            </p>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default PersonajeItem;
