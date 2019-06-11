import React from 'react';
import styles from "./app.module.scss";

const App: React.FC = () => {
  return (
    <div className={styles.content}>
     
        <h1>H1 - Welcome one and all!</h1>
        <h2>H2 - Welcome one and all!</h2>
        <h3>H3 - Welcome one and all!</h3>
        <h4>H4 - Welcome one and all!</h4>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
    </div>
  );
}

export default App;
