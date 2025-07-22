import { Link } from 'react-router-dom';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import LOGO from '../assets/LOGO.png';
import { FaHeadset } from 'react-icons/fa'; // Ícono de soporte

export function Footer() {
    return (
        <footer >
            
        <section className="bg-[#00135a] text-white mt-5 flex items-center w-full">
                
                {/* Sección 1: Logo (conservado igual) */}
                <div className="flex justify-center w-1/3">
                    <img 
                        src={LOGO} 
                        alt="Logo EVB" 
                        className="object-contain w-48 h-auto"
                    />
                </div>
                
                {/* Sección 2: Redes sociales (conservada con íconos) */}
                <div className="w-1/3  md:border-l md:border-[#002288] md:pl-6 flex flex-col items-center">
                    <h2 className="mb-2 text-lg font-semibold">Síguenos</h2>
                    <p className="mb-4 text-sm text-gray-300">
                        Mantente informado, síguenos a través de nuestras redes sociales
                    </p>
                    <div className="flex gap-4">
                        <Link to="https://www.facebook.com/con.jatibonico" target="_blank">
                            <img src={facebook} alt="Facebook" className="w-8 h-8 transition-opacity hover:opacity-80" />
                        </Link>
                        <Link to="https://www.instagram.com/cum_jatibonico" target="_blank">
                            <img src={instagram} alt="Instagram" className="w-8 h-8 transition-opacity hover:opacity-80" />
                        </Link>
                    </div>
                </div>
                
                {/* Sección 3: Nueva área de soporte (añadida) */}
                <div className="w-1/3  md:border-l md:border-[#002288] md:pl-6 justify-center items-center flex flex-col">
                    <div className="flex items-center mb-2">
                        <FaHeadset className="mr-2 text-xl text-blue-300" />
                        <h2 className="text-lg font-semibold">Soporte Técnico</h2>
                    </div>
                    <p className="mb-3 text-sm text-gray-300">
                        ¿Problemas con la plataforma?<br />
                        <span className="block mt-1">¡Estamos aquí para ayudarte!</span>
                    </p>
                    <Link 
                        to="/soporte" 
                        className="inline-block px-4 py-2 text-sm text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Contactar ahora
                    </Link>
                </div>

        </section>
        
            {/* Línea de créditos (conservada) */}
            <div className="border-t border-[#002288] py-4 text-center bg-[#00135a]">
                <p className="text-sm text-gray-100">
                    Desarrollado por: Un estudiante de la universidad de las Ciencias Informáticas
                </p>
            </div>
        </footer>
    )
}