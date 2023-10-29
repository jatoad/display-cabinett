import React from "react";
import { Media, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Item.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

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
            setItems,
        } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    console.log('is_owner = ', is_owner)

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
          <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own item!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
            
            // should be like_id  but use test_like_id
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
      </Media>
    </div>
  );
};

export default Item;