import React, { useEffect, useState } from "react";


import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Drawer from "./Drawer";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import test_drawer from '../../test/test_drawer.json'


function DrawerPage() {
    const { id } = useParams();
    const [drawer, setDrawer] = useState({ results: [] });

    let testMode = true

    useEffect(() => {
        const handleMount = async () => {
            if (testMode) {
                setDrawer({ results: [test_drawer] });
            } else {
                try {
                    const [{ data: drawer }] = await Promise.all([
                    axiosReq.get(`/drawers/${id}/`), {headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }]);
                    setDrawer({ results: [drawer] });
                } catch (err) {
                    console.log(err);
                }
            } 
            console.log(drawer);
        };
    
        handleMount();
      }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <p>Drawer component</p>
        {/* <Drawer {...drawer.results[0]} setPosts={setPost} postPage /> */}
        <Drawer {...test_drawer} setDrawers={setDrawer} drawerPage />
        <Container className={appStyles.Content}>Items</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default DrawerPage;
