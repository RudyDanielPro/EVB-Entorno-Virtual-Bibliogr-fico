import imgCum from '../assets/CUM.png';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();

  const handleCarrerasClick = () => {
    if (window.location.pathname === '/') {
      // Si ya estamos en la página principal
      const carrerasSection = document.getElementById('carreras-section');
      if (carrerasSection) {
        window.scrollTo({
          top: carrerasSection.offsetTop - 20, // 20px de margen superior
          behavior: 'smooth'
        });
      }
    } else {
      // Si estamos en otra página, navegamos a la principal
      navigate('/');
      // Esperamos a que la página se cargue
      const checkSection = () => {
        const carrerasSection = document.getElementById('carreras-section');
        if (carrerasSection) {
          window.scrollTo({
            top: carrerasSection.offsetTop - 20,
            behavior: 'smooth'
          });
        } else {
          setTimeout(checkSection, 50);
        }
      };
      setTimeout(checkSection, 100);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      {/* Imagen de fondo */}
      <img 
        src={imgCum} 
        alt="Fondo CUM" 
        className="absolute object-cover w-full h-full"
        style={{
          minWidth: '100%',
          minHeight: '100%',
          objectPosition: 'center'
        }}
      />
      
      {/* Overlay para mejor legibilidad */}
      <div className="absolute w-full h-full bg-black bg-opacity-30"></div>
      
      {/* Contenido superpuesto */}
      <div className="relative z-10 px-4 text-center text-white">        
        <div className="my-8 space-y-2">
          <h2 className="text-3xl font-medium md:text-5xl">ENTORNO VIRTUAL <br />BIBLIOGRÁFICO</h2>
        </div>
        
        <p className="mb-12 text-xl font-light md:text-2xl">CUM Panchito Gómez Toro</p>
        
        <button 
          onClick={handleCarrerasClick}
          className="px-12 py-4 text-xl font-semibold transition-colors duration-300 bg-yellow-400 rounded-lg shadow-lg hover:bg-yellow-500 md:text-2xl"
        >
          CARRERAS
        </button>
      </div>
    </div>
  );
}