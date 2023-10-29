import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Upload from "../../assets/upload.png";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";

import styles from "../../styles/ItemCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function ItemCreateForm(props) {
  const { drawer, setDrawer, setItems, profileImage, profile_id } = props;

  const [itemData, setItemData] = useState({
    description: "",
    image: "",
  });
  const {description, image } = itemData;

  // Image save location
  const imageInput = useRef(null);

  const handleChange = (event) => {
    setItemData({
      ...itemData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      // Clear browser reference to prev file  
      URL.revokeObjectURL(image);
      setItemData({
        ...itemData,
        // Create a local path to the file passed in
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/items/", {
        description,
        drawer,
      });
      setItems((prevItems) => ({
        ...prevItems,
        results: [data, ...prevItems.results],
      }));
      setDrawer((prevDrawer) => ({
        results: [
          {
            ...prevDrawer.results[0],
            items_count: prevDrawer.results[0].items_count + 1,
          },
        ],
      }));
      //setDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group className="text-center">
          {/* show preview of users image */}
          {image ? (
            <>
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
            </>
          ) : (
            <Form.Label
              className="d-flex justify-content-center"
              htmlFor="image-upload"
            >
              <Asset
                src={Upload}
                message="Click or tap to upload an image"
              />
            </Form.Label>
          )}

          <Form.File
            id="image-upload"
            accept="image/*"
            onChange={handleChangeImage}
            ref={imageInput}
          />
  
        <InputGroup>
          <Form.Control
            className={styles.Form}
            placeholder="Item description.."
            as="textarea"
            value={description}
            onChange={handleChange}
            rows={4}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!description.trim()}
        type="submit"
      >
        Add Item
      </button>
    </Form>
  );
}

export default ItemCreateForm;
