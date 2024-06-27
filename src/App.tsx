import { Outlet } from 'react-router';
import { Footer } from './layout/Footer/footer.tsx';
import { Header } from './layout/Header/header.tsx';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
