import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export function Contacto() {
    const form = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        emailjs.sendForm(
            'service_hfgcyk8', // Reemplaza con tu Service ID
            'template_xz48h7n', // Reemplaza con tu Template ID
            form.current,
            '3KHFIYuUSG3iRVKum' // Reemplaza con tu Public Key
        )
        .then((result) => {
            console.log(result.text);
            alert('Reporte enviado con éxito!');
            form.current.reset();
        }, (error) => {
            console.log(error.text);
            alert('Hubo un error al enviar el reporte. Por favor intenta nuevamente.');
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <>
            <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 md:py-12">
                <h1 className="mb-4 text-3xl font-bold text-center text-white md:text-4xl">Reportar Problema Bibliográfico</h1>
                <p className="mb-8 text-lg text-center text-white md:text-xl md:mb-12">
                    ¿Tienes problemas para acceder o descargar materiales? Repórtalo aquí.
                </p>

                <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                    <div className="p-6 bg-white shadow-md md:p-8 rounded-xl md:w-2/3">
                        <h2 className="mb-6 text-2xl font-bold text-blue-700">Formulario de Reporte</h2>

                        <form ref={form} className="space-y-6" onSubmit={sendEmail}>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Nombre Completo*</label>
                                    <input
                                        type="text"
                                        name="from_name"
                                        placeholder="Tu nombre completo"
                                        className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Correo Electrónico*</label>
                                    <input
                                        type="email"
                                        name="from_email"
                                        placeholder="Tu correo electrónico"
                                        className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Carrera donde se encuentra el problema</label>
                                    <input
                                        type="text"
                                        name="career"
                                        placeholder="Nombre de la carrera"
                                        className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Año de Curso</label>
                                    <select
                                        name="year"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Seleccionar el año de carrera donde se encuentra el problema</option>
                                        <option value="1">1° Año</option>
                                        <option value="2">2° Año</option>
                                        <option value="3">3° Año</option>
                                        <option value="4">4° Año</option>
                                        <option value="5">5° Año</option>
                                        <option value="posgrado">Posgrado</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Tipo de Problema*</label>
                                <select
                                    name="issue_type"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Seleccione un tipo</option>
                                    <option value="Problema con descarga">No puedo descargar el material</option>
                                    <option value="Material no disponible">El material no está disponible</option>
                                    <option value="Error en contenido">Error en el contenido del material</option>
                                    <option value="Otro problema">Otro problema</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Título del Material*</label>
                                    <input
                                        type="text"
                                        name="material_title"
                                        placeholder="Título exacto del material"
                                        className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Autor(es)*</label>
                                    <input
                                        type="text"
                                        name="material_author"
                                        placeholder="Autor(es) del material"
                                        className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Descripción Detallada*</label>
                                <textarea
                                    rows="5"
                                    name="message"
                                    placeholder="Describe el problema con detalle. Incluye:&#10;- Mensajes de error recibidos&#10;- Pasos para reproducir el problema&#10;- Nombre de la asignatura relacionada"
                                    className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full px-6 py-3 font-bold text-white transition-colors rounded-lg md:w-auto ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar Reporte'}
                            </button>
                        </form>
                    </div>

                    <div className="p-6 shadow-md bg-blue-50 md:p-8 rounded-xl md:w-1/3">
                        <h2 className="mb-6 text-2xl font-bold text-blue-700">Información de Contacto</h2>

                        <div className="flex items-start mb-6">
                            <div className="flex-shrink-0 p-3 mr-4 bg-blue-100 rounded-full">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Correo Electrónico</h3>
                                <p className="text-gray-600">rudysc@estudiantes.uci.cu</p>
                                <p className="text-gray-600">rudydanielcarballo@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start mb-6">
                            <div className="flex-shrink-0 p-3 mr-4 bg-blue-100 rounded-full">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Teléfono</h3>
                                <p className="text-gray-600">+53 53204669</p>
                                <p className="text-gray-600">+53 56498546</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 p-3 mr-4 bg-blue-100 rounded-full">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Horario de Atención</h3>
                                <p className="text-gray-600">Lunes a Viernes: 8:00 - 18:00</p>
                                <p className="text-gray-600">Sábados: 9:00 - 13:00</p>
                            </div>
                        </div>

                        <div className="my-8 border-t border-blue-200"></div>

                        <p className="italic text-gray-700">
                            "Nuestro equipo revisará tu reporte en un plazo máximo de 24 horas hábiles."
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl px-4 py-12 mx-auto text-black sm:px-6">
                <h2 className="mb-8 text-3xl font-bold text-center ">Preguntas Frecuentes</h2>
                <div className="space-y-4 text-black">
                    {[
                        {
                            question: "¿Cuánto tiempo tardan en resolver los problemas reportados?",
                            answer: "La mayoría de los problemas se resuelven en 24-48 horas hábiles."
                        },
                        {
                            question: "¿Puedo reportar materiales que faltan en la biblioteca virtual?",
                            answer: "Sí, utiliza este formulario para solicitar materiales que deberían estar disponibles."
                        },
                        {
                            question: "¿Qué hago si no puedo descargar un material?",
                            answer: "Reporta el problema incluyendo todos los detalles posibles y una captura de pantalla del error."
                        }
                    ].map((item, index) => (
                        <div key={index} className="pb-4 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-black">{item.question}</h3>
                            <p className="mt-2 text-black/90">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}