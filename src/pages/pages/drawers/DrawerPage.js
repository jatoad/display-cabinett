import React, { useEffect, useState } from "react";


import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";


import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import Drawer from "./Drawer";
import Item from "../items/Item";

import ItemCreateForm from "../items/ItemCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import test_drawer from '../../test/test_drawer.json'
import test_items from '../../test/test_items.json'

function DrawerPage() {
    const { id } = useParams();
    const [drawer, setDrawer] = useState({ results: [] });

    let testMode = true

    const currentUser =  useCurrentUser();
    //const profile_image = currentUser?.profile_image;

    const [items, setItems] = useState({ results: [] });

    console.log('currentUser DP', currentUser)

    console.log('id DP', id)

    useEffect(() => {
        const handleMount = async () => {
            if (testMode) {
                // Note  that results is the key in the json where the data is set
                setDrawer({ results: [test_drawer] });
                setItems({ results: [test_items] });

                console.log('HM TM')
            } else {
                try {
                    const [{ data: drawer }, { data: items }] = await Promise.all([
                        // Get drawers for the current owner and items from drawer
                        axiosReq.get(`/posts/${id}`),
                        axiosReq.get(`/items/?drawer=${id}`),
                    ]);
                    setDrawer({ results: [drawer] });
                    setItems({ results: [items] });
                } catch (err) {
                    console.log(err);
                }
            } 
            console.log('drawer = ', drawer);
            console.log('items = ', items);
        };
    
        console.log('HM');
        handleMount();

      }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* <p>Popular profiles for mobile</p>
        <p>Drawer component</p> */}
        {/* Do we need the owner image here? */}
        {/* <Drawer {...drawer.results[0]} setDrawers={setDrawer} drawerPagePage /> */}
        <Drawer {...test_drawer} setDrawers={setDrawer} drawerPage />
        <Container className={appStyles.Content}>
            {currentUser ? (
                <ItemCreateForm
                    profile_id={currentUser.profile_id}
                    // profileImage={profile_image}
                    drawer={id}
                    setDrawer={setDrawer}
                    setitems={setItems}
                    />
            ) : items.results.length ? (
                "items"
            ) : null}

            {test_items.results.length ? (
                test_items.results.map((item) => (
                    <Item key={item.id} {...item} setDrawer={setDrawer} setitems={setItems}/>
                ))
            // is User logged in?
            ) : currentUser ? (
                <span>No items yet, be the first to add an item!</span>
            ) : (
                <span>No items... yet</span>
          )}
        
        </Container>
      </Col>
      {/* <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col> */}
    </Row>
  );
}

export default DrawerPage;
