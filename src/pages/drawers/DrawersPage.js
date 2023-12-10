import React, { useEffect, useState } from "react";

//import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Drawer from "./Drawer";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
//import styles from "../../styles/DrawersPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";

import test_drawers from '../../test/test_drawers.json'

function DrawersPage({ message, filter = "" }) {
  const [drawers, setDrawers] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchDrawers = async () => {
      try {
        if (process.env.REACT_APP_TEST_MODE === 'false') {
            setDrawers(test_drawers);
        } else {
            const { data } = await axiosReq.get(`/drawers/?${filter}`);
            setDrawers(data);
        }
        // Stop spinner
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    // Start spinner
    setHasLoaded(false);
    fetchDrawers();
    //setHasLoaded(true);
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>


        {hasLoaded ? (
          <>
            {drawers.results.length ? (
              drawers.results.map((drawer) => (
                <Drawer key={drawer.id} {...drawer} setDrawers={setDrawers} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default DrawersPage;
