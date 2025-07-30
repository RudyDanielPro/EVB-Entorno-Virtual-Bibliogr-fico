import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Contabilidad from '../assets/Contabilidad.jpg';
import Agronomia from '../assets/Agronomia.jpg';
import Primario from '../assets/Primario.jpg';
import Trab_social from '../assets/Trab-Social.jpg';

export function Hero() {
  // Precarga las imágenes al montar el componente
  useEffect(() => {
    const imagesToPreload = [
      Contabilidad,
      Agronomia,
      Primario,
      Trab_social
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const carreras = [
    {
      id: 'contabilidad',
      categoria: "Licenciatura",
      especialidad: "Contabilidad y Finanzas",
      imagen: Contabilidad,
      descripcion: "Formación en gestión financiera y contable."
    },
    {
      id: 'educacionPrimaria5',
      categoria: "Licenciatura",
      especialidad: "Educación Primaria",
      imagen: Primario,
      descripcion: "Enfoque en educación infantil y pedagogía."
    },
    {
      id: 'trabajoSocial',
      categoria: "Licenciatura",
      especialidad: "Trabajo Social",
      imagen: Trab_social,
      descripcion: "Promoción del bienestar social y comunitario."
    },
    {
      id: 'agronoma',
      categoria: "Ingenieria",
      especialidad: "Agronomia",
      imagen: Agronomia,
      descripcion: "Desarrollo agrícola y sostenibilidad."
    }
  ];

  return (
    <>
      <section id="carreras-section" className="m-2">
        <div className="p-6 bg-white">
          <h1 className="mb-10 text-3xl font-bold text-center text-black">Centro Universitario Municipal Panchito Gómez Toro</h1>
        </div>

        <div className="font-sans bg-white">
          <h1 className="mb-10 text-3xl font-bold text-center text-black">Carreras</h1>

          <div className="flex flex-wrap justify-center max-w-5xl gap-6 mx-auto mb-10">
            {carreras.map((carrera, index) => (
              <Link
                to={`/courses?carrera=${carrera.id}`}
                key={index}
                className="text-center group block w-[calc(25%-20px)] min-w-[200px]"
              >
                <div className="relative w-full h-40 mb-2 overflow-hidden rounded">
                  <img
                    src={carrera.imagen}
                    alt={carrera.especialidad}
                    loading="lazy"  // Carga perezosa
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-300 bg-black opacity-0 bg-opacity-70 group-hover:opacity-100">
                    <p className="text-sm text-white">{carrera.descripcion}</p>
                  </div>
                </div>
                <p className="text-sm">{carrera.categoria}</p>
                <p className="text-base font-bold">{carrera.especialidad}</p>
              </Link>
            ))}
          </div>

          <div className="space-y-4 text-center">
            <Link to="/courses">
              <button className="block px-8 py-2 mx-auto font-bold text-black transition-colors bg-yellow-400 rounded hover:bg-yellow-500">
                VER TODOS LOS CURSOS
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className='bg-[#00135a] text-white py-12 px-6 mt-8'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 gap-8 text-center md:grid-cols-3'>
            <div className='p-6 rounded-lg bg-white/10'>
              <div className='mb-2 text-4xl font-bold'>470</div>
              <div className='text-lg text-yellow-500'>Usuarios de la plataforma</div>
              <p className='mt-2 text-sm text-white/80'>Total de usuarios que usan la plataforma.</p>
            </div>
            <div className='p-6 rounded-lg bg-white/10'>
              <div className='mb-2 text-4xl font-bold'>410</div>
              <div className='text-lg text-yellow-500'>Estudiantes</div>
              <p className='mt-2 text-sm text-white/80'>Estudiantes matriculados en al menos un curso.</p>
            </div>
            <div className='p-6 rounded-lg bg-white/10'>
              <div className='mb-2 text-4xl font-bold'>280</div>
              <div className='text-lg text-yellow-500'>Cursos</div>
              <p className='mt-2 text-sm text-white/80'>Total de cursos de la plataforma.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#00135a] text-white mt-10">
        <div className='p-6'>
          <h2 className='text-2xl font-bold text-center'>Otras categorías de apoyo al proceso de enseñanza aprendizaje</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 p-6 bg-white">
          <div className="w-full p-4 text-black bg-gray-100 rounded-lg sm:w-[45%] lg:w-[22%]">
            <h2 className="mb-2 text-xl font-bold">Idiomas</h2>
            <p className="mb-4 text-sm">Cursos de preparación en idiomas extranjeros. Inglés según los niveles del marco común europeo.</p>
            <Link to="/courses" className="text-blue-600 hover:underline">IR A →</Link>
          </div>

          <div className="w-full p-4 text-black bg-gray-100 rounded-lg sm:w-[45%] lg:w-[22%]">
            <h2 className="mb-2 text-xl font-bold">Eventos</h2>
            <p className="mb-4 text-sm">Jornadas y eventos estudiantiles</p>
            <Link to="/courses" className="text-blue-600 hover:underline">IR A →</Link>
          </div>

          <div className="w-full p-4 text-black bg-gray-100 rounded-lg sm:w-[45%] lg:w-[22%]">
            <h2 className="mb-2 text-xl font-bold">Preparación Metodológica</h2>
            <p className="mb-4 text-sm">Preparación metodológica para profesores.</p>
            <Link to="/courses" className="text-blue-600 hover:underline">IR A →</Link>
          </div>
        </div>
      </section>
    </>
  );
}