import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

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


    const currentUser =  useCurrentUser();
    //const profile_image = currentUser?.profile_image;

    const [items, setItems] = useState({ results: [] });

    console.log('currentUser DP', currentUser)

    console.log('id DP', id)

    useEffect(() => {
        const handleMount = async () => {
            if (process.env.REACT_APP_TEST_MODE === 'false') {
                // Note  that results is the key in the json where the data is set
                setDrawer({ results: [test_drawer] });
                setItems({ results: [test_items] });

            } else {
                try {
                    const [{ data: drawer }, { data: items }] = await Promise.all([
                        // Get drawers for the current owner and items from drawer
                        axiosReq.get(`/drawers/${id}`),
                        axiosReq.get(`/items/?drawer=${id}`),
                    ]);

                    setDrawer(drawer);
                    setItems(items);
                } catch (err) {
                    console.log('get err', err);
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
        <Drawer {...drawer} setDrawers={setDrawer} drawerPage />
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

            {items.results.length ? (
                <InfiniteScroll
                    children={items.results.map((item) => (
                    <Item
                        key={item.id}
                        {...item}
                        setDrawer={setDrawer}
                        setItems={setItems}
                    />
                    ))}
                    dataLength={items.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!items.next}
                    next={() => fetchMoreData(items, setItems)}
                />
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
