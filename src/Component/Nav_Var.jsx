import { Link } from 'react-router-dom';

export function Nav_Var({ variante }) { 
  return (
    <nav className="fixed top-0 left-0 w-full flex gap-4 bg-[#00135a] p-3 text-white z-50">
     
      <div className='flex flex-grow'>
        <Link to="/" className='text-2xl'>EVB</Link>
      </div>

      
      <div className='flex gap-4'>
        {variante === "P" ? (
          <Link to="/acerca_de" className='text-2xl hover:text-yellow-300'>Acerca_de</Link>
        ) : (
          <Link to="/" className='text-2xl hover:text-yellow-300'>Inicio</Link>
        )}
      </div>
    </nav>
  );
}