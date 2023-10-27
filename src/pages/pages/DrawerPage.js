import React, { useEffect, useState } from "react";


import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function DrawerPage() {
    const { id } = useParams();
    const [drawer, setDrawer] = useState({ results: [] });


    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: drawer }] = await Promise.all([
              axiosReq.get(`/drawers/${id}/`), {headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            withCredentials: true
          }]);
            setDrawer({ results: [drawer] });
            console.log(drawer);
          } catch (err) {
            console.log(err);
          }
        };
    
        handleMount();
      }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <p>Drawer component</p>
        <Container className={appStyles.Content}>
          Items
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default DrawerPage;