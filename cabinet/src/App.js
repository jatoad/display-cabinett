import { Container } from 'react-bootstrap';
import './App.css';
import styles from "./App.module.css"
import NavBar from './components/NavBar';
import {Route, Switch} from "react-router-dom"

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path='/' render={() => <h1>Home</h1>}/>
          <Route exact path='/sign-in' render={() => <h1>Sign In</h1>}/>
          <Route exact path='/sign-up' render={() => <h1>Sign Up</h1>}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
