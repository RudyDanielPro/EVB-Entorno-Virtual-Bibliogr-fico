import React from "react";

export function CUMJatibonico() {
    return (

        <div className="max-w-6xl px-4 py-8 mx-auto font-sans text-gray-800 sm:px-6 lg:px-8">
            {/* --- Cabecera --- */}
            <header className="py-8 mb-8 text-center text-white bg-blue-900 rounded-lg shadow-md">
                <h1 className="mb-2 text-3xl font-bold md:text-4xl">
                    Centro Universitario Municipal "Panchito Gómez Toro"
                </h1>
                <p className="text-xl opacity-90">Jatibonico, Sancti Spíritus - Cuba</p>
            </header>

            {/* --- Hero Section --- */}
            <section className="relative flex items-center justify-center h-64 mb-8 overflow-hidden rounded-lg md:h-80 bg-gradient-to-r from-blue-800 to-blue-600">
                <div className="z-10 px-4 text-center text-white">
                    <h2 className="mb-2 text-3xl font-bold md:text-4xl">
                        Educación superior al servicio de la comunidad
                    </h2>
                    <p className="text-xl opacity-90">
                        Formando profesionales comprometidos con el desarrollo local
                    </p>
                </div>
                <div className="absolute inset-0 bg-black opacity-40"></div>
            </section>

            {/* --- Sobre el CUM --- */}
            <section className="mb-12">
                <h2 className="pb-2 mb-4 text-2xl font-bold text-blue-900 border-b-2 border-blue-900 md:text-3xl">
                    📌 Sobre el CUM
                </h2>
                <p className="text-lg leading-relaxed">
                    El Centro Universitario Municipal <strong>"Panchito Gómez Toro"</strong> de Jatibonico es parte de la red de CUM cubanos,
                    creado para llevar la educación superior a todos los municipios. Vinculado a la{" "}
                    <strong>Universidad de Sancti Spíritus</strong>, ofrece carreras adaptadas a las necesidades de la región.
                </p>
            </section>

            {/* --- Oferta Académica --- */}
            <section className="mb-12">
                <h2 className="pb-2 mb-6 text-2xl font-bold text-blue-900 border-b-2 border-blue-900 md:text-3xl">
                    🎓 Oferta Académica
                </h2>
                <ul className="space-y-3">
                    {[
                        "Licenciatura en Estudios Socioculturales",
                        "Ingeniería Agrónoma (énfasis en producción local)",
                        "Pedagogía (formación de profesores)",
                        "Cursos de Superación para trabajadores",
                    ].map((item, index) => (
                        <li
                            key={index}
                            className="py-3 pl-4 text-lg border-l-4 border-blue-900 bg-blue-50"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
                <p className="mt-4 italic text-gray-600">
                    Modalidades: Presencial, Semipresencial y a Distancia.
                </p>
            </section>

            {/* --- Vida Estudiantil --- */}
            <section className="mb-12">
                <h2 className="pb-2 mb-6 text-2xl font-bold text-blue-900 border-b-2 border-blue-900 md:text-3xl">
                    🌟 Vida Estudiantil
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {[
                        {
                            title: "Proyectos Comunitarios",
                            desc: "Talleres de desarrollo local, actividades culturales y agrícolas.",
                        },
                        {
                            title: "Convenios",
                            desc: "Colaboración con empresas y cooperativas de Jatibonico.",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg"
                        >
                            <h3 className="mb-2 text-xl font-semibold text-blue-800">
                                {item.title}
                            </h3>
                            <p className="text-gray-700">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Contacto --- */}
            <section className="mb-12">
                <h2 className="pb-2 mb-6 text-2xl font-bold text-blue-900 border-b-2 border-blue-900 md:text-3xl">
                    📞 Contacto
                </h2>
                <address className="not-italic">
                    <p className="mb-2 text-lg">
                        <strong>Dirección:</strong> Calle Martí #123, Jatibonico, Sancti Spíritus.
                    </p>
                    <p className="mb-2 text-lg">
                        <strong>Teléfono:</strong> +53 41 123456
                    </p>
                    <p className="text-lg">
                        <strong>Email:</strong> cum.jatibonico@uniss.edu.cu
                    </p>
                </address>
            </section>

           
        </div>
    )
}
;

