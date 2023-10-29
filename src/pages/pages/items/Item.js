import React from "react";
import { Media, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Item.module.css";

const Item = (props) => {
  const { profile_id, profile_image, owner, updated_at, description, image } = props;

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <Card.Img src={image}/>
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <p>{description}</p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Item;
