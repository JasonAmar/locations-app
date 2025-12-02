import { PropsWithChildren, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import "./PlaceItem.css";
import { PlaceItemProps } from "../../types";
import { useAuth } from "../../shared/context/auth-context";

const PlaceItem: React.FC<PropsWithChildren<PlaceItemProps>> = ({
  id,
  imageUrl,
  title,
  description,
  address,
  // creatorId,
  coordinates,
}) => {
  const { isLoggedIn } = useAuth();
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <>
      <Modal
        show={showMap}
        onCancel={() => setShowMap(false)}
        header={address}
        content={"place-item__modal-content"}
        footerClass={"place-item__modal-actions"}
        footer={<Button onClick={() => setShowMap(false)}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={() => setShowConfirmModal(false)}>
              CANCEL
            </Button>
            <Button
              danger
              onClick={() => {
                console.log("DELETING...");
                setShowConfirmModal(false);
              }}
            >
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={imageUrl} alt={title}></img>
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={() => setShowMap(true)}>
              VIEW ON MAP
            </Button>
            {isLoggedIn && <Button to={`/places/${id}`}>EDIT</Button>}
            {isLoggedIn && (
              <Button danger onClick={() => setShowConfirmModal(true)}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
