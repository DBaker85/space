import React from "react";
import styles from "./app.module.scss";
import Routing from "./routing";
import { BrowserRouter } from "react-router-dom";
import Loadable from "react-loadable";


const LazyStarfield = Loadable({
  loader: ()=> import("./starfield/starfield"),
  loading: ()=>null
})


const App: React.FC = () => {
  return (
    <React.Fragment>
      <LazyStarfield />
      <div className={styles.content}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
};

export default App;
