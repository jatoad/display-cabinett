import React from "react";
import styles from "../../styles/Drawer.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Drawer = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    items_count,
    title,
    description,
    image,
    updated_at,
    drawerPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = (currentUser?.username === owner);
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/drawers/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/drawers/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  console.log('currentUser ', currentUser)
  console.log('drawerPage ', drawerPage)
  console.log('is_owner ', is_owner)

  return (
    <Card className={styles.Drawer}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner &&
                <MoreDropdown
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/drawers/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
        <div className={styles.DrawerBar}>
          <Link to={`/drawers/${id}`}>
            <i className="far fa-clone " />
          </Link>
          Items in drawer {items_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Drawer;
