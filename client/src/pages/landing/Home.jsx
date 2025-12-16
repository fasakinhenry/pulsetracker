import Header from '../../components/home/Header.jsx';
import Navbar from '../../components/home/Navbar.jsx';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bg_img.png')] bg-cover bg-center">
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;
