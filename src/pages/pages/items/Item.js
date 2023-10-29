import React, { useState } from "react";
import { Media, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Item.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import ItemEditForm from "./ItemEditForm";

const Item = (props) => {
    const { id,
            profile_id, 
            profile_image,     
            likes_count,
            like_id,
            owner, 
            updated_at, 
            description, 
            image,
            setDrawer,
            setItems,
        } = props;

    const [showEditForm, setShowEditForm] = useState(false);
    const currentUser = useCurrentUser();
    // Should be username. NEED to sort this out
    //const is_owner = currentUser?.username === owner;
    const is_owner = currentUser?.owner === owner;

    // console.log('is_owner = ', is_owner)
    // console.log('id = ', id)
    // console.log('owner = ', owner)
    console.log('currentUser = ', currentUser)

    const handleLike = async () => {
        try {
            console.log('handleLike')
            const { data } = await axiosRes.post("/likes/", { item: id });
            setItems((prevItems) => ({
                ...prevItems,
                results: prevItems.results.map((item) => {
                return item.id === id
                    ? { ...item, likes_count: item.likes_count + 1, like_id: data.id }
                    : item;
                }),
            }));
        } catch (err) {
        console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            console.log('handleUnlike')
            await axiosRes.delete(`/likes/${like_id}/`);
            setItems((prevItems) => ({
                ...prevItems,
                results: prevItems.results.map((item) => {
                return item.id === id
                    ? { ...item, likes_count: item.likes_count - 1, like_id: null }
                    : item;
                }),
            }));
        } catch (err) {
        console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
          await axiosRes.delete(`/items/${id}/`);
          setDrawer((prevDrawer) => ({
            results: [
              {
                ...prevDrawer.results[0],
                items_count: prevDrawer.results[0].items_count - 1,
              },
            ],
          }));
    
          setItems((prevItems) => ({
            ...prevItems,
            results: prevItems.results.filter((item) => item.id !== id),
          }));
        } catch (err) {}
      };

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
          {showEditForm ? (
            <ItemEditForm
              id={id}
              profile_id={profile_id}
              description={description}
              image={image}
              profileImage={profile_image}
              setItems={setItems}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{description}</p>
          )}
          <div className={styles.PostBar}>
            {is_owner ? (
                <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't like your own item!</Tooltip>}
                >
                <i className="far fa-heart" />
                </OverlayTrigger>
            ) : like_id ? (
                <span onClick={handleUnlike}>
                <i className={`fas fa-heart ${styles.Heart}`} />
                </span>
            ) : currentUser ? (
                <span onClick={handleLike}>
                <i className={`far fa-heart ${styles.HeartOutline}`} />
                </span>
            ) : (
                <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to like items!</Tooltip>}
                >
                <i className="far fa-heart" />
                </OverlayTrigger>
            )}
            {likes_count}
          </div>

        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </div>
  );
};

export default Item;