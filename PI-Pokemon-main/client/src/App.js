import { Route } from 'react-router-dom';
import Detail from './views/Detail/detail';
import Home from './views/Home/home';
import Form from './views/Form/form';
import Landing from './views/Landing/landing';
// import NotFound from "./views/NotFound/notfound"


import './App.css';


function App () {


  return (
    <div className="App">
      
    
      <Route exact path="/" component={ Landing }/>
      <Route path="/detail/:id" component={ Detail } />
      <Route path="/form" component={ Form } />
      <Route path="/home" component={Home }/>
      {/* <Route component={ NotFound } /> */}
    </div>
  );
}

export default App;
