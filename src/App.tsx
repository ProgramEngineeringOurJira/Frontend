import './reset.css';
import './App.css';
import './global-styles/index.scss';

import { Columns } from './components/Columns/Columns';
import { Header } from './components/Header/Header';

function App() {
  return (
    <>
      <Header />
      <Columns />
    </>
  );
}

export default App;
