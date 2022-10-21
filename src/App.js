import 'bootstrap/dist/css/bootstrap.css';
import AppContext from './contexts/AppContext.jsx';
import { useState } from 'react';
import Navbar from './components/Navbar.jsx'
import Banner from './components/Banner';
import UserRequestSection from './components/UsersRequestSection.jsx';
import FormSection from './components/FormSection.jsx';
import Loader from './components/loader/Loader.jsx';

function App() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const appSettings = { loading, setLoading, users, setUsers };

  return (
    <AppContext.Provider value={appSettings}>
      <div className="mt-2 margin_X_xxl">
        <header>
          <Navbar />
          <Banner />
        </header>
        <main className="main">
          <UserRequestSection />
          <FormSection />
        </main>
      </div>
      <footer className="my-3 margin_X_xxl">
        <p
          className="font-size_16 color_black align-self-start px-3 px-md-0">
          &#169; abz.agency specially for the test task
        </p>
      </footer>
      <Loader />
    </AppContext.Provider>
  );
}

export default App;
