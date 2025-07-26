import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

// Función para inicializar la estructura de una carrera (fuera del componente)
function inicializarCarrera(años) {
    const estructura = {
        expandido: false,
        años: {}
    };

    for (let año = 1; año <= años; año++) {
        estructura.años[año] = {
            expandido: false,  // Inicialmente no expandido
            periodos: {
                1: { expandido: false, asignaturas: {} },
                2: { expandido: false, asignaturas: {} }
            }
        };
    }

    return estructura;
}

export function Cursos() {
    const location = useLocation();
    const [carreraSeleccionada, setCarreraSeleccionada] = useState(null);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const [expanded, setExpanded] = useState({
        carreras: {
            contabilidad: inicializarCarrera(5),
            culturaFisica: inicializarCarrera(5),
            educacionPrimaria5: inicializarCarrera(5),
            educacionPrimaria3: inicializarCarrera(3),
            educacionPreescolar5: inicializarCarrera(5),
            educacionPreescolar3: inicializarCarrera(3),
            agronoma: inicializarCarrera(5),
            trabajoSocial: inicializarCarrera(3),
            tecnicoTrabajoSocial: inicializarCarrera(3)
        },
        seccionesEspeciales: {
            trabajoMetodologico: {
                expandido: false,
                asignaturas: {
                    "Metodología de la Investigación": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Metodología de la Investigación - Hernández", enlace: "#" },
                            { nombre: "Cómo hacer investigación - Sampieri", enlace: "#" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Técnicas de investigación - Tamayo", enlace: "#" },
                            { nombre: "El proceso de investigación - Sabino", enlace: "#" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Introducción a la investigación", enlace: "#" },
                            { nombre: "Clase 2: Diseños metodológicos", enlace: "#" }
                        ]
                    }
                }
            },
            idiomas: {
                expandido: false,
                asignaturas: {
                    "Inglés Básico": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Essential Grammar in Use - Murphy", enlace: "#" },
                            { nombre: "English for Everyone - DK", enlace: "#" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Practical English Usage - Swan", enlace: "#" },
                            { nombre: "Oxford Picture Dictionary", enlace: "#" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Presentaciones", enlace: "#" },
                            { nombre: "Clase 2: Verbos básicos", enlace: "#" }
                        ]
                    },
                    "Francés Elemental": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Le Nouveau Taxi - Hachette", enlace: "#" },
                            { nombre: "Grammaire Progressive - CLE", enlace: "#" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Bescherelle - La conjugaison", enlace: "#" },
                            { nombre: "Dictionnaire Larousse", enlace: "#" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Saludos", enlace: "#" },
                            { nombre: "Clase 2: Artículos", enlace: "#" }
                        ]
                    }
                }
            },
            eventos: {
                expandido: false,
                asignaturas: {
                    "Seminarios Científicos": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Cómo presentar trabajos científicos - Booth", enlace: "#" },
                            { nombre: "El arte de hablar en público - Carnegie", enlace: "#" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Comunicación científica - Day", enlace: "#" },
                            { nombre: "Redacción de abstracts - Swales", enlace: "#" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Estructura de ponencias", enlace: "#" },
                            { nombre: "Clase 2: Presentaciones efectivas", enlace: "#" }
                        ]
                    },
                    "Talleres Prácticos": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Aprendizaje experiencial - Kolb", enlace: "#" },
                            { nombre: "Dinámicas grupales - Rogers", enlace: "#" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Juegos para talleres - Brandes", enlace: "#" },
                            { nombre: "Facilitación gráfica - Sibbet", enlace: "#" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Diseño de talleres", enlace: "#" },
                            { nombre: "Clase 2: Técnicas participativas", enlace: "#" }
                        ]
                    }
                }
            }
        },
        bibliografias: {},
        clases: {}
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const carreraParam = queryParams.get('carrera');

        if (carreraParam) {
            // Verificar si es una carrera regular
            if (expanded.carreras[carreraParam]) {
                setCarreraSeleccionada(carreraParam);
                setExpanded(prev => ({
                    ...prev,
                    carreras: {
                        ...prev.carreras,
                        [carreraParam]: {
                            ...prev.carreras[carreraParam],
                            expandido: true
                        }
                    }
                }));
            }
            // Verificar si es una sección especial
            else if (expanded.seccionesEspeciales[carreraParam]) {
                setCarreraSeleccionada(carreraParam);
                setExpanded(prev => ({
                    ...prev,
                    seccionesEspeciales: {
                        ...prev.seccionesEspeciales,
                        [carreraParam]: {
                            ...prev.seccionesEspeciales[carreraParam],
                            expandido: true
                        }
                    }
                }));
            }

            setTimeout(() => {
                const cursosSection = document.getElementById('cursos-section');
                if (cursosSection) {
                    cursosSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location.search]);

    // Función para buscar asignaturas
    const buscarAsignaturas = (termino) => {
        if (!termino.trim()) {
            setResultadosBusqueda([]);
            return;
        }

        const resultados = [];
        const terminoLower = termino.toLowerCase();

        // Buscar en carreras regulares
        Object.keys(asignaturasEjemplo).forEach(carrera => {
            Object.keys(asignaturasEjemplo[carrera]).forEach(año => {
                Object.keys(asignaturasEjemplo[carrera][año]).forEach(periodo => {
                    Object.keys(asignaturasEjemplo[carrera][año][periodo]).forEach(asignatura => {
                        if (asignatura.toLowerCase().includes(terminoLower)) {
                            resultados.push({
                                carrera,
                                año: parseInt(año),
                                periodo: parseInt(periodo),
                                nombreAsignatura: asignatura,
                                datos: asignaturasEjemplo[carrera][año][periodo][asignatura],
                                tipo: 'carrera'
                            });
                        }
                    });
                });
            });
        });

        // Buscar en secciones especiales
        Object.keys(expanded.seccionesEspeciales).forEach(seccion => {
            Object.keys(expanded.seccionesEspeciales[seccion].asignaturas).forEach(asignatura => {
                if (asignatura.toLowerCase().includes(terminoLower)) {
                    resultados.push({
                        carrera: seccion,
                        nombreAsignatura: asignatura,
                        datos: expanded.seccionesEspeciales[seccion].asignaturas[asignatura],
                        tipo: 'seccionEspecial'
                    });
                }
            });
        });

        setResultadosBusqueda(resultados);
    };

    useEffect(() => {
        buscarAsignaturas(terminoBusqueda);
    }, [terminoBusqueda]);

    const handleDownload = (e, enlace, nombreArchivo = 'documento') => {
        e.preventDefault();
        // Simulación de descarga
        console.log(`Descargando ${nombreArchivo} desde ${enlace}`);
        // En una implementación real, aquí iría la lógica para descargar el archivo
    };

    // Funciones para manejar la expansión
    const toggleCarrera = (carrera) => {
        setExpanded(prev => ({
            ...prev,
            carreras: {
                ...prev.carreras,
                [carrera]: {
                    ...prev.carreras[carrera],
                    expandido: !prev.carreras[carrera].expandido
                }
            }
        }));
        setCarreraSeleccionada(!expanded.carreras[carrera].expandido ? carrera : null);
    };

    const toggleSeccionEspecial = (seccion) => {
        setExpanded(prev => ({
            ...prev,
            seccionesEspeciales: {
                ...prev.seccionesEspeciales,
                [seccion]: {
                    ...prev.seccionesEspeciales[seccion],
                    expandido: !prev.seccionesEspeciales[seccion].expandido
                }
            }
        }));
        setCarreraSeleccionada(!expanded.seccionesEspeciales[seccion].expandido ? seccion : null);
    };

    const toggleAño = (carrera, año) => {
        setExpanded(prev => ({
            ...prev,
            carreras: {
                ...prev.carreras,
                [carrera]: {
                    ...prev.carreras[carrera],
                    años: {
                        ...prev.carreras[carrera].años,
                        [año]: {
                            ...prev.carreras[carrera].años[año],
                            expandido: !prev.carreras[carrera].años[año].expandido
                        }
                    }
                }
            }
        }));
    };

    const togglePeriodo = (carrera, año, periodo) => {
        setExpanded(prev => ({
            ...prev,
            carreras: {
                ...prev.carreras,
                [carrera]: {
                    ...prev.carreras[carrera],
                    años: {
                        ...prev.carreras[carrera].años,
                        [año]: {
                            ...prev.carreras[carrera].años[año],
                            periodos: {
                                ...prev.carreras[carrera].años[año].periodos,
                                [periodo]: {
                                    ...prev.carreras[carrera].años[año].periodos[periodo],
                                    expandido: !prev.carreras[carrera].años[año].periodos[periodo].expandido
                                }
                            }
                        }
                    }
                }
            }
        }));
    };

    const toggleAsignatura = (carrera, año, periodo, asignatura, tipo = 'carrera') => {
        if (tipo === 'seccionEspecial') {
            setExpanded(prev => ({
                ...prev,
                seccionesEspeciales: {
                    ...prev.seccionesEspeciales,
                    [carrera]: {
                        ...prev.seccionesEspeciales[carrera],
                        asignaturas: {
                            ...prev.seccionesEspeciales[carrera].asignaturas,
                            [asignatura]: {
                                ...prev.seccionesEspeciales[carrera].asignaturas[asignatura],
                                expandido: !prev.seccionesEspeciales[carrera].asignaturas[asignatura]?.expandido
                            }
                        }
                    }
                }
            }));
        } else {
            setExpanded(prev => ({
                ...prev,
                carreras: {
                    ...prev.carreras,
                    [carrera]: {
                        ...prev.carreras[carrera],
                        años: {
                            ...prev.carreras[carrera].años,
                            [año]: {
                                ...prev.carreras[carrera].años[año],
                                periodos: {
                                    ...prev.carreras[carrera].años[año].periodos,
                                    [periodo]: {
                                        ...prev.carreras[carrera].años[año].periodos[periodo],
                                        asignaturas: {
                                            ...prev.carreras[carrera].años[año].periodos[periodo].asignaturas,
                                            [asignatura]: {
                                                ...prev.carreras[carrera].años[año].periodos[periodo].asignaturas[asignatura],
                                                expandido: !prev.carreras[carrera].años[año].periodos[periodo].asignaturas[asignatura]?.expandido
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }));
        }
    };

    const toggleBibliografia = (carrera, año, periodo, asignatura, tipo, seccionEspecial = false) => {
        const key = seccionEspecial
            ? `${carrera}-${asignatura}-${tipo}`
            : `${carrera}-${año}-${periodo}-${asignatura}-${tipo}`;

        setExpanded(prev => ({
            ...prev,
            bibliografias: {
                ...prev.bibliografias,
                [key]: !prev.bibliografias[key]
            }
        }));
    };

    const toggleClases = (carrera, año, periodo, asignatura, seccionEspecial = false) => {
        const key = seccionEspecial
            ? `${carrera}-${asignatura}-clases`
            : `${carrera}-${año}-${periodo}-${asignatura}-clases`;

        setExpanded(prev => ({
            ...prev,
            clases: {
                ...prev.clases,
                [key]: !prev.clases[key]
            }
        }));
    };

    const collapseAll = () => {
        const nuevasCarreras = {};
        Object.keys(expanded.carreras).forEach(carrera => {
            const nuevosAños = {};
            Object.keys(expanded.carreras[carrera].años).forEach(año => {
                const nuevosPeriodos = {};
                [1, 2].forEach(periodo => {
                    nuevosPeriodos[periodo] = {
                        expandido: false,
                        asignaturas: {}
                    };
                });
                nuevosAños[año] = {
                    expandido: false,
                    periodos: nuevosPeriodos
                };
            });
            nuevasCarreras[carrera] = {
                expandido: false,
                años: nuevosAños
            };
        });

        const nuevasSeccionesEspeciales = {};
        Object.keys(expanded.seccionesEspeciales).forEach(seccion => {
            nuevasSeccionesEspeciales[seccion] = {
                expandido: false,
                asignaturas: Object.keys(expanded.seccionesEspeciales[seccion].asignaturas).reduce((acc, asignatura) => {
                    acc[asignatura] = { ...expanded.seccionesEspeciales[seccion].asignaturas[asignatura], expandido: false };
                    return acc;
                }, {})
            };
        });

        setExpanded({
            carreras: nuevasCarreras,
            seccionesEspeciales: nuevasSeccionesEspeciales,
            bibliografias: {},
            clases: {}
        });
        setCarreraSeleccionada(null);
    };

    // Función para verificar si todo está colapsado
    const todoColapsado = () => {
        const carrerasColapsadas = Object.values(expanded.carreras).every(
            carrera => !carrera.expandido
        );

        const seccionesColapsadas = Object.values(expanded.seccionesEspeciales).every(
            seccion => !seccion.expandido
        );

        return carrerasColapsadas && seccionesColapsadas;
    };

    // Función para alternar entre colapsar/expandir todo
    const toggleExpandCollapseAll = () => {
        if (todoColapsado()) {
            // Solo expandir carreras y secciones, no años ni asignaturas
            const nuevasCarreras = {};
            Object.keys(expanded.carreras).forEach(carrera => {
                nuevasCarreras[carrera] = {
                    ...expanded.carreras[carrera],
                    expandido: true,
                    años: Object.keys(expanded.carreras[carrera].años).reduce((acc, año) => {
                        acc[año] = { ...expanded.carreras[carrera].años[año], expandido: false };
                        return acc;
                    }, {})
                };
            });

            const nuevasSeccionesEspeciales = {};
            Object.keys(expanded.seccionesEspeciales).forEach(seccion => {
                nuevasSeccionesEspeciales[seccion] = {
                    ...expanded.seccionesEspeciales[seccion],
                    expandido: true,
                    asignaturas: Object.keys(expanded.seccionesEspeciales[seccion].asignaturas).reduce((acc, asignatura) => {
                        acc[asignatura] = { ...expanded.seccionesEspeciales[seccion].asignaturas[asignatura], expandido: false };
                        return acc;
                    }, {})
                };
            });

            setExpanded({
                carreras: nuevasCarreras,
                seccionesEspeciales: nuevasSeccionesEspeciales,
                bibliografias: {},
                clases: {}
            });
        } else {
            collapseAll();
        }
    };

    // Datos de ejemplo para las asignaturas (igual que en tu código original)
    const asignaturasEjemplo = {
        contabilidad: {
            1: {
                1: {
                    "Fundamentos de Contabilidad": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Principios de Contabilidad - Weygandt", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_1" },
                            { nombre: "Contabilidad Básica - García", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_2" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Normas Internacionales de Contabilidad", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_3" },
                            { nombre: "Manual de Contabilidad Financiera", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_4" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Introducción a la Contabilidad", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_1" },
                            { nombre: "Clase 2: Principios Contables", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_2" },
                            { nombre: "Clase 3: El Balance General", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_3" }
                        ]
                    },
                    "Matemáticas Financieras": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Matemáticas para Finanzas - Ayres", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_5" },
                            { nombre: "Cálculo Financiero - Bustos", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_6" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Matemáticas Aplicadas - Stewart", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_7" },
                            { nombre: "Finanzas Cuantitativas - Bodie", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_8" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Interés Simple", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_4" },
                            { nombre: "Clase 2: Interés Compuesto", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_5" }
                        ]
                    }
                },
                2: {
                    "Derecho Comercial": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Derecho Mercantil - Rodríguez", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_9" },
                            { nombre: "Legislación Comercial - Pérez", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_10" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Código de Comercio", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_11" },
                            { nombre: "Derecho Empresarial - Gómez", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_12" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Introducción al Derecho Comercial", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_6" },
                            { nombre: "Clase 2: Contratos Mercantiles", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_7" }
                        ]
                    },
                    "Economía General": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Principios de Economía - Mankiw", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_13" },
                            { nombre: "Economía Básica - Samuelson", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_14" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Microeconomía - Pindyck", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_15" },
                            { nombre: "Macroeconomía - Blanchard", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_16" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Conceptos Básicos de Economía", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_8" },
                            { nombre: "Clase 2: Oferta y Demanda", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_9" }
                        ]
                    }
                }
            },
            2: {
                1: {
                    "Contabilidad de Costos": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Costos para la Toma de Decisiones - Horngren", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_17" },
                            { nombre: "Contabilidad de Costos - Polimeni", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_18" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Gestión de Costos - Kaplan", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_19" },
                            { nombre: "Análisis de Costos - Backer", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_20" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Introducción a los Costos", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_10" },
                            { nombre: "Clase 2: Sistemas de Costeo", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_11" }
                        ]
                    },
                    "Estadística Aplicada": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Estadística para Negocios - Anderson", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_21" },
                            { nombre: "Probabilidad y Estadística - Walpole", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_22" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Análisis Estadístico - Levin", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_23" },
                            { nombre: "Estadística Descriptiva - Spiegel", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_24" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Estadística Descriptiva", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_12" },
                            { nombre: "Clase 2: Distribuciones de Probabilidad", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_13" }
                        ]
                    }
                },
                2: {
                    "Contabilidad Intermedia": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Contabilidad Financiera - Kieso", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_25" },
                            { nombre: "Contabilidad Intermedia - Weygandt", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_26" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Normas IFRS - Túa", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_27" },
                            { nombre: "Interpretación de Estados Financieros - Bernstein", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_28" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Ajustes Contables", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_14" },
                            { nombre: "Clase 2: Estados Financieros Consolidados", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_15" }
                        ]
                    }
                }
            }
        },
        culturaFisica: {
            1: {
                1: {
                    "Anatomía Humana": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Anatomía del Movimiento - Calais", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_29" },
                            { nombre: "Anatomía para Deportistas - Weineck", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_30" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Atlas de Anatomía - Netter", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_31" },
                            { nombre: "Fundamentos de Anatomía - Tortora", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_32" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Sistema Muscular", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_16" },
                            { nombre: "Clase 2: Sistema Óseo", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_17" }
                        ]
                    },
                    "Educación Física General": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Teoría de la Educación Física - Sánchez", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_33" },
                            { nombre: "Fundamentos de la Educación Física - López", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_34" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Historia de la Educación Física - Cagigal", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_35" },
                            { nombre: "Metodología de la Educación Física - Blázquez", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_36" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Historia de la Educación Física", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_18" },
                            { nombre: "Clase 2: Metodologías de Enseñanza", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_19" }
                        ]
                    }
                },
                2: {
                    "Fisiología del Ejercicio": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Fisiología del Esfuerzo - Wilmore", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_37" },
                            { nombre: "Fisiología del Ejercicio - McArdle", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_38" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Bioenergética del Ejercicio - Brooks", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_39" },
                            { nombre: "Adaptaciones Fisiológicas al Ejercicio - Fox", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_40" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Sistemas Energéticos", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_20" },
                            { nombre: "Clase 2: Respuesta Cardiovascular al Ejercicio", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_21" }
                        ]
                    }
                }
            },
            2: {
                1: {
                    "Biomecánica": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Biomecánica Deportiva - González", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_41" },
                            { nombre: "Fundamentos de Biomecánica - Hamill", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_42" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Análisis del Movimiento - Hay", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_43" },
                            { nombre: "Biomecánica Clínica - Norkin", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_44" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Cinemática", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_22" },
                            { nombre: "Clase 2: Cinética", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_23" }
                        ]
                    }
                }
            }
        },
        educacionPrimaria5: {
            1: {
                1: {
                    "Psicología del Desarrollo": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Psicología del Desarrollo - Papalia", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_45" },
                            { nombre: "Desarrollo Humano - Berger", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_46" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Teorías del Desarrollo - Santrock", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_47" },
                            { nombre: "Psicología Evolutiva - Palacios", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_48" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Etapas del Desarrollo", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_24" },
                            { nombre: "Clase 2: Teorías de Piaget", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_25" }
                        ]
                    }
                }
            }
        },
        educacionPrimaria3: {
            1: {
                1: {
                    "Didáctica General": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Didáctica Magna - Comenio", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_49" },
                            { nombre: "Fundamentos de Didáctica - Zabalza", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_50" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Estrategias Didácticas Innovadoras - Díaz", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_51" },
                            { nombre: "Planificación Didáctica - Litwin", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_52" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Conceptos Básicos", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_26" },
                            { nombre: "Clase 2: Planificación de Clases", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_27" }
                        ]
                    }
                }
            }
        },
        educacionPreescolar5: {
            1: {
                1: {
                    "Desarrollo Infantil": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Psicología del Desarrollo Infantil - Berk", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_53" },
                            { nombre: "El Niño de 0 a 6 años - Palacios", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_54" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Juego y Desarrollo Infantil - Garvey", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_55" },
                            { nombre: "Estimulación Temprana - Ferré", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_56" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Desarrollo Cognitivo", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_28" },
                            { nombre: "Clase 2: Desarrollo Socioafectivo", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_29" }
                        ]
                    }
                }
            }
        },
        educacionPreescolar3: {
            1: {
                1: {
                    "Pedagogía Preescolar": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Pedagogía de la Educación Inicial - Malajovich", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_57" },
                            { nombre: "Didáctica del Nivel Inicial - Pitluk", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_58" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Espacios Educativos para la Infancia - Hoyuelos", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_59" },
                            { nombre: "La Educación Infantil - Gervilla", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_60" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Enfoques Pedagógicos", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_30" },
                            { nombre: "Clase 2: Organización del Aula", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_31" }
                        ]
                    }
                }
            }
        },
        agronoma: {
            1: {
                1: {
                    "Botánica General": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Introducción a la Botánica - Raven", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_61" },
                            { nombre: "Botánica General - Strasburger", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_62" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Morfología Vegetal - Font Quer", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_63" },
                            { nombre: "Anatomía Vegetal - Esau", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_64" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Clasificación Vegetal", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_32" },
                            { nombre: "Clase 2: Estructura de las Plantas", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_33" }
                        ]
                    }
                }
            }
        },
        trabajoSocial: {
            1: {
                1: {
                    "Fundamentos del Trabajo Social": {
                        expandido: false,
                        bibliografiaBasica: [
                            { nombre: "Introducción al Trabajo Social - Zamanillo", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_65" },
                            { nombre: "Historia del Trabajo Social - Lima", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_66" }
                        ],
                        bibliografiaComplementaria: [
                            { nombre: "Teorías del Trabajo Social - Payne", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_67" },
                            { nombre: "Metodología de la Intervención - Ander-Egg", enlace: "https://drive.google.com/uc?export=download&id=ID_DEL_ARCHIVO_68" }
                        ],
                        clases: [
                            { nombre: "Clase 1: Historia del Trabajo Social", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_34" },
                            { nombre: "Clase 2: Ámbitos de Intervención", enlace: "https://drive.google.com/uc?export=download&id=ID_CLASE_35" }
                        ]
                    }
                }
            }
        },
        tecnicoTrabajoSocial: {
            1: {
                1: {
                    "Ética y trabajo social": {
                        expandido: false,
                        bibliografiaBasica: [
                            {
                                nombre: "Código de trabajo, Reglamento y legislación complementaria",
                                enlace: "https://drive.google.com/uc?export=download&id=1uTeDN1cFqsSuexx1vtvo7f8T6F4Ud9lX"
                            },
                            {
                                nombre: "Acuerdo 9040 Política de PCD",
                                enlace: "https://drive.google.com/uc?export=download&id=1eUos3wyNyHKHIEnDQUVW5NxZuJZGUAVF"
                            },
                            {
                                nombre: "Código trabajo actualizado",
                                enlace: "https://drive.google.com/uc?export=download&id=1zA0o9Ji6ig8uNeUOTLRPpf0s9gGyetEC"
                            },
                            {
                                nombre: "Código-de-las-Familias",
                                enlace: "https://drive.google.com/uc?export=download&id=1rGGNYs3VbUic66ZtB9IHgeWkWEWaUUXr"
                            },
                            {
                                nombre: "Constitucion-Cuba-2019",
                                enlace: "https://drive.google.com/uc?export=download&id=1fV2eWwBiIimmEnLFwD76TyST5Ns7y53G"
                            },
                            {
                                nombre: "DECRETO No. 365",
                                enlace: "https://drive.google.com/uc?export=download&id=174xo0aOGL9x5UEqxGtMPN57deoJSOMfg"
                            },
                            {
                                nombre: "desarrollo historico",
                                enlace: "https://drive.google.com/uc?export=download&id=1DkZSW5THpi4ID59_9ruA4VtVDrFC4QWM"
                            },
                            {
                                nombre: "LEY No. 105 de seguridad social",
                                enlace: "https://drive.google.com/uc?export=download&id=1GbRYeXN51zUK1u19zRvSLBaUpi9MzIuV"
                            },
                            {
                                nombre: "Monografía",
                                enlace: "https://drive.google.com/uc?export=download&id=1bGSnDgTwumQV2bOxQeuMIaOuMV3ti3DV"
                            }
                        ],
                        bibliografiaComplementaria: [
                            {
                                nombre: "Ética y Trabajo Social Una aproximación a los debates contemporáneos",
                                enlace: "https://drive.google.com/uc?export=download&id=1UxbaUHj0LH3x2nr24g6DCckZudLtdJP5"
                            },
                            {
                                nombre: "EL ENVEJECIMIENTO POBLACIONAL EN CUBA",
                                enlace: "https://drive.google.com/uc?export=download&id=1lgABBNxgrblfJGmPl3CM4P4FCxQR7H-9"
                            },
                            {
                                nombre: "Ética y Trabajo Social",
                                enlace: "https://drive.google.com/uc?export=download&id=1VrQivcJAS8b_aHPTQtaIH3P6nLi8irMg"
                            },
                            {
                                nombre: "Los profesionales del trabajo social y la ética profesional",
                                enlace: "https://drive.google.com/uc?export=download&id=1Yv2YkW6seM8LZT-u0eDXEx3XbFsdrysw"
                            },
                            {
                                nombre: "Repensar la ética en Trabajo Social desde una perspectiva de género",
                                enlace: "https://drive.google.com/uc?export=download&id=1ut0NvmQuq17y1EuXh2nPvL6l6Gp2w5ps"
                            }
                        ],
                        clases: [
                            {
                                nombre: "Clase 1",
                                enlace: "https://drive.google.com/uc?export=download&id=18tdCeGWMQ8_uv7S_ToaF2LrBELCnJlbv"
                            },
                            {
                                nombre: "Clase 2",
                                enlace: "https://drive.google.com/uc?export=download&id=12Xeudzns2YabRF35ARAiBDxtPfeYC-4l"
                            },
                            {
                                nombre: "Clase 3",
                                enlace: "https://drive.google.com/uc?export=download&id=1Kdnwl9qAGBn-eseUhVCTAuCC48EVfrWB"
                            },
                            {
                                nombre: "Conferencia 1",
                                enlace: "https://drive.google.com/uc?export=download&id=1YJzEG5aWsbufi9CwpgbKYi1DPoCB_TdT"
                            },
                            {
                                nombre: "Taller 1",
                                enlace: "https://drive.google.com/uc?export=download&id=1PSTJu2OVV1uICu1H38lrIyMVKXoJyy8g"
                            },
                            {
                                nombre: "Taller 2",
                                enlace: "https://drive.google.com/uc?export=download&id=1w_29T4h2RM2O5nPiGk6YF05VALoOc2_l"
                            },
                        ]
                    },
                    "Formación Cívica": {
                        expandido: false,
                        bibliografiaBasica: [
                            {
                                nombre: "Código de trabajo, Reglamento y legislación complementaria",
                                enlace: "https://drive.google.com/uc?export=download&id=1uTeDN1cFqsSuexx1vtvo7f8T6F4Ud9lX"
                            },
                            {
                                nombre: "Acuerdo 9040 Política de PCD",
                                enlace: "https://drive.google.com/uc?export=download&id=1eUos3wyNyHKHIEnDQUVW5NxZuJZGUAVF"
                            },
                            {
                                nombre: "Código trabajo actualizado",
                                enlace: "https://drive.google.com/uc?export=download&id=1zA0o9Ji6ig8uNeUOTLRPpf0s9gGyetEC"
                            },
                            {
                                nombre: "Código-de-las-Familias",
                                enlace: "https://drive.google.com/uc?export=download&id=1rGGNYs3VbUic66ZtB9IHgeWkWEWaUUXr"
                            },
                            {
                                nombre: "Constitucion-Cuba-2019",
                                enlace: "https://drive.google.com/uc?export=download&id=1fV2eWwBiIimmEnLFwD76TyST5Ns7y53G"
                            },
                            {
                                nombre: "DECRETO No. 365",
                                enlace: "https://drive.google.com/uc?export=download&id=174xo0aOGL9x5UEqxGtMPN57deoJSOMfg"
                            },
                            {
                                nombre: "Constitución de la República de Cuba proclamada el 10 de abril de 2019 _ Gaceta Oficial",
                                enlace: "https://drive.google.com/uc?export=download&id=1dKWlQNkmc65vU-HUklZn86lQXBTp8cNO"
                            },
                            {
                                nombre: "Control social - Qué es, definición y concepto _ 2022 _ Economipedia",
                                enlace: "https://drive.google.com/uc?export=download&id=1GOE7pecYrNALup-DV8CVSyHdQqbOvWXg"
                            },
                            {
                                nombre: "Control social - Wikipedia, la enciclopedia libre",
                                enlace: "https://drive.google.com/uc?export=download&id=1J5q6vdNB1_8sO6ieML6FWiqzGjg6T-GV"
                            },
                            {
                                nombre: "DECRETO-LEY No. 56 de la maternidad de las trabajadoras",
                                enlace: "https://drive.google.com/uc?export=download&id=1u9YE75g1XuDGi9LZphOCZTxQYyd8V_2I"
                            },
                            {
                                nombre: "El proceso  penal y la política criminal",
                                enlace: "https://drive.google.com/uc?export=download&id=1NdxnKUdMvbqH6nOXlgwMd22ZESm8o2x-"
                            },
                            {
                                nombre: "FUNCIONAMIENTO FAMILIAR Y REALIDAD CUBANA ACTUAL1118D036-1-1",
                                enlace: "https://drive.google.com/uc?export=download&id=1lLHt2Y4nqFcjGNmhCECXkJE7V7HDblUF"
                            },
                            {
                                nombre: "Funciones básicas de la familia",
                                enlace: "https://drive.google.com/uc?export=download&id=1su7POUQQ4kaUMamXLCwXNGoyBhtWd4gi"
                            },
                            {
                                nombre: "GUÍAS DE ESTUDIOS FORM. CÍVICA ESCC",
                                enlace: "https://drive.google.com/uc?export=download&id=1WSHZYOJIBX0JKm0GIjkIqJp66hZL8_MU"
                            },
                            {
                                nombre: "Paz y Trabajo Digno_UPR30_CUB_S_Main",
                                enlace: "https://drive.google.com/uc?export=download&id=1AxSKyOTJ50GpkESoQVu44vqPaNpHq2T8"
                            },
                            {
                                nombre: "Política criminal en cuba ",
                                enlace: "https://drive.google.com/uc?export=download&id=1v315B2Xg85cGSKBZPqXKsNFfI2qPFMhY"
                            },
                            {
                                nombre: "Política Social de Cuba",
                                enlace: "https://drive.google.com/uc?export=download&id=1Fd-wZDGD1sLQrlwOMfwGjVebLTRjhaX9"
                            },
                        ],
                        bibliografiaComplementaria: [
                            {
                                nombre: "CIENCIA, TECNOLOGÍA",
                                enlace: "https://drive.google.com/uc?export=download&id=1l2SVzRXBRSexgeToEY5FGVzQcLR-1-kq"
                            },
                            {
                                nombre: "Cuentapropismo o emprendimiento",
                                enlace: "https://drive.google.com/uc?export=download&id=11-9-zjep4d5q8xbRzkvkGcZUJ2bQu-_n"
                            },
                            {
                                nombre: "El Derecho Constitucional Cubano De 1812 Al 2009",
                                enlace: "https://drive.google.com/uc?export=download&id=1fASvKWIv-jZ0PxSlnkK_OlHoQEvYG4qt"
                            },
                            {
                                nombre: "El enfoque de género en cp",
                                enlace: "https://drive.google.com/uc?export=download&id=12pqH5WCM-KFgC94k7aE0hTesAUHGBLrr"
                            },
                            {
                                nombre: "Igualdad de Género-Constitución",
                                enlace: "https://drive.google.com/uc?export=download&id=1Sne0aqJCn2xbM9_kF4hzpV3ccKIysyig"
                            },
                            {
                                nombre: "Las personas en condición de deambulantes",
                                enlace: "https://drive.google.com/uc?export=download&id=1mLvdOcMG0nDNZN82N6LN2Mvc40KNpUzc"
                            },
                            {
                                nombre: "LEY No. 105 de seguridad social",
                                enlace: "https://drive.google.com/uc?export=download&id=1pW9BqAqwwYxO7IgXtcuprDYdYe3xeiGd"
                            },
                            {
                                nombre: "Los Fundamentos Constitucionales Del Estado",
                                enlace: "https://drive.google.com/uc?export=download&id=1YVmaLepq7EprBaDh0sMOCHZ1mCu0CfoX"
                            },
                            {
                                nombre: "Los profesionales del trabajo social",
                                enlace: "https://drive.google.com/uc?export=download&id=1o583tXsN8RYx41EgMvJi6h-prnFZy__8"
                            },
                            {
                                nombre: "MEDIDAS LABORALES Y SALARIALES  Covid 19",
                                enlace: "https://drive.google.com/uc?export=download&id=1uLJ3i8xWiXL36lBnZaxmw5JCv3iEkZu-"
                            },
                            {
                                nombre: "Plan de acciones para prevenir indisciplinas sociales en jóvenes",
                                enlace: "https://drive.google.com/uc?export=download&id=1degrCKy3tVb41FvYCGrvFUwFjK25BG9Q"
                            },
                            {
                                nombre: "PROGRAMA NACIONAL DE DESARROLLO ECONÓMICO SOCIAL",
                                enlace: "https://drive.google.com/uc?export=download&id=1YfArCwtKytnxX7SGZoewTiiEB3_B4bJa"
                            },
                            {
                                nombre: "PROGRAMA NACIONAL PARA EL ADELANTO DE LAS MUJER",
                                enlace: "https://drive.google.com/uc?export=download&id=17Cl5WSrXCFTLV8XuAW-wlu20ytKKL1PW"
                            },
                            {
                                nombre: "PROYECTO DE LEY codigo de la familia",
                                enlace: "https://drive.google.com/uc?export=download&id=1TFbM2UVYAE1YCVkSQmzAe0e8GT6iYU41"
                            },
                            {
                                nombre: "Resolución 47 Evaluación de la solvencia económica-1",
                                enlace: "https://drive.google.com/uc?export=download&id=1lbzhY89kGjhWVAe9cH_aZH2_wpm1eelQ"
                            },
                            {
                                nombre: "Resolución 47-2022 Reglamento del trabajo docente",
                                enlace: "https://drive.google.com/uc?export=download&id=1evaQ4gQnjkMFjICCeMmIXnJ_YfjCz7mA"
                            },
                        ],
                        clases: [
                            {
                                nombre: "Clase 1",
                                enlace: "https://drive.google.com/uc?export=download&id=1jfCfIwzzAcdD6A63fIjAKcdWGQ4j95oJ"
                            },
                            {
                                nombre: "Clase 2",
                                enlace: "https://drive.google.com/uc?export=download&id=1M--qRWKTFUnmNfeoolKBcdGWK-dCzG4c"
                            },
                            {
                                nombre: "Clase 3",
                                enlace: "https://drive.google.com/uc?export=download&id=1jyW7Oi7tem2hZDkSAUIFQNZbm9fwZ3jM"
                            },
                            {
                                nombre: "Clase 4",
                                enlace: "https://drive.google.com/uc?export=download&id=176BrDLIiKZcwFNys1E86BBuyFgw8mD7U"
                            },
                            {
                                nombre: "Clase 5",
                                enlace: "https://drive.google.com/uc?export=download&id=1guq5u-LLXDJORYlhYmfxIARHBk7iLkgz"
                            }
                        ]
                    },
                    "Defensa Nacional": {
                        expandido: false,
                        bibliografiaBasica: [
                            {
                                nombre: "GUIA DE DEFENSA NACIONAL ACTUALIZADA",
                                enlace: "https://drive.google.com/uc?export=download&id=1t8yZ0u1I9qYE48zTAk_uIAMwN7QoXzA0"
                            },
                            {
                                nombre: "LEY 75 DE LA DEFENSA NACIONAL",
                                enlace: "https://drive.google.com/uc?export=download&id=1woYQKx4FQYTomtd7ujhorN7_9Ee48CFl"
                            },
                            {
                                nombre: "TEXTO BÁSICO PREPARACIÓN PARA LA DEFENSA",
                                enlace: "https://drive.google.com/uc?export=download&id=1FJXZg8lEb34D-qNKaI8DP_dNqM6CmT9k"
                            },
                        ],
                        bibliografiaComplementaria: [
                            {
                                nombre: "BRIGADAS DE PRODUCCIÓN Y DEFENSA",
                                enlace: "https://drive.google.com/uc?export=download&id=1evlvUx80QFP0sn48FbvJvlot0NfCimBq"
                            },
                            {
                                nombre: "Decreto 205 SOBRE LA PREPARACION DE LA ECONOMÍA PL",
                                enlace: "https://drive.google.com/uc?export=download&id=1ZJvP52QyNOZMuaDWA08I8hYZ4SwOIBwi"
                            },
                            {
                                nombre: "DOCTRINA MILITAR CUBANA",
                                enlace: "https://drive.google.com/uc?export=download&id=19Yf2P_2dgSd0GGkBfsk1bYq1jxxooogN"
                            },
                            {
                                nombre: "Fragmentos del Informe central al VII cong PCC",
                                enlace: "https://drive.google.com/uc?export=download&id=1TTr3dH4_t9b26Nh8dYRfnOQ7HciWdtIF"
                            },
                            {
                                nombre: "Indicaciones No 11 del Jefe DIEM sobre contendios a actualizar o introducir en la disc. PPD",
                                enlace: "https://drive.google.com/uc?export=download&id=1GdyOX5LfX9CquxWqFB5E2GEzZS2s6X6X"
                            },
                            {
                                nombre: "REGLAMENTO PARA LA COMPATIBILIZACIÖn DEL COMITÉ EJECUTIVO DEL CONSEJO DE MINISTROS",
                                enlace: "https://drive.google.com/uc?export=download&id=1Fcb7qvKy9_1Nff3kGcjeNkqeL8eglnW0"
                            },
                        ],
                        clases: [
                            {
                                nombre: "Clase 1",
                                enlace: "https://drive.google.com/uc?export=download&id=16-Tih7b10IHjkdQ5nAnwYo-n_t9kK2uh"
                            },
                            {
                                nombre: "Clase 2",
                                enlace: "https://drive.google.com/uc?export=download&id=1538oHQwH-xr8ffkV19jvcWu2Gj3FJ4W0"
                            },
                            {
                                nombre: "Clase 3",
                                enlace: "https://drive.google.com/uc?export=download&id=1djewSKtx8zEfuiC5wQI-cftAlJZnZtSm"
                            },
                            {
                                nombre: "Clase 4",
                                enlace: "https://drive.google.com/uc?export=download&id=1lBBL6GuRf-jksqiN5Syc8eJYL6TG7ifh"
                            },
                            {
                                nombre: "Clase 5",
                                enlace: "https://drive.google.com/uc?export=download&id=1KAuYyfAZER8fpJCQhx7IVzQTFzkO7sY6"
                            },
                            {
                                nombre: "Clase 6",
                                enlace: "https://drive.google.com/uc?export=download&id=1wWD6q0ivxuI9Q7BwHDnKpmBzOdnauZ8L"
                            },
                            {
                                nombre: "Clase 7",
                                enlace: "https://drive.google.com/uc?export=download&id=1Ec_VIEXKzCsAn_Cf4nIWb6xy8VtSAs2V"
                            },
                            {
                                nombre: "Clase 8",
                                enlace: "https://drive.google.com/uc?export=download&id=13fdtQpKXlfdrfvqoRLtXip97dl5he-O9"
                            },
                            {
                                nombre: "Guia de estudio 1",
                                enlace: "https://drive.google.com/uc?export=download&id=1I3nmIGKIUNWaMHYintXuy5jxbwPTChir"
                            },
                            {
                                nombre: "Guia de estudio 2",
                                enlace: "https://drive.google.com/uc?export=download&id=1GQk0wjnjAriKJDYsYOws1TQfEH8OqaCO"
                            },
                            {
                                nombre: "Guia de estudio 3",
                                enlace: "https://drive.google.com/uc?export=download&id=1u7Mdx3-vzlgI6KE878CgoqI1yuHMuZKC"
                            },
                            {
                                nombre: "Guia de estudio 4",
                                enlace: "https://drive.google.com/uc?export=download&id=1HHvauJDicWvSN8XtrsItZHRnUt5rjFrT"
                            },
                            {
                                nombre: "Guia de estudio 5",
                                enlace: "https://drive.google.com/uc?export=download&id=1l96SJHIZBbqOEmoFLFgpLzlvKObfvg9x"
                            }
                        ]
                    },
                    "Seguridad Nacional": {
                        expandido: false,
                        bibliografiaBasica: [
                            {
                                nombre: "ACTUALIZACIÓN DE CONTENIDOS SEGURIDAD NACIONAL Y DEFE",
                                enlace: "https://drive.google.com/uc?export=download&id=19UevAh4f3C6nXN3sBCFimAZTQ0MDSf3e"
                            },
                            {
                                nombre: "Dimensiones de la seguridad nacional",
                                enlace: "https://drive.google.com/uc?export=download&id=1imBNc9QGmswgJ9pcLvkUDHT7MS8Hivcr"
                            },
                            {
                                nombre: "La SN de Cuba Curso actualización",
                                enlace: "https://drive.google.com/uc?export=download&id=1y5rdYzEUn6bLFEkD2sYnoIXBryF-Uew2"
                            },
                            {
                                nombre: "Libro Seguridad y defensa Nacional 2013",
                                enlace: "https://drive.google.com/uc?export=download&id=1PXkRbq1-Z2jjvZ427Pn4AIf1MOLfdo2q"
                            },
                            {
                                nombre: "Manual Aspectos Básicos de la Seg. y Def. Nac. de Cuba",
                                enlace: "https://drive.google.com/uc?export=download&id=1vK5wlnNcNu2wdHzVo86EE2ZGhTfE7I5x"
                            }
                        ],
                        bibliografiaComplementaria: [
                            {
                                nombre: "CÓMO PROTEGERSE Y REDUCIR EL RIESGO ANTE LA PANDEMIA DEL CORNAVIRUS",
                                enlace: "https://drive.google.com/uc?export=download&id=1Z-4XKb2lIUMLyd7fjRqxFckkDVfz6oqa"
                            },
                            {
                                nombre: "CONCEPTO DE REVOLUCION PPT",
                                enlace: "https://drive.google.com/uc?export=download&id=1R81eNtUEEE9ZUG5c7iHWaD9I3rrcA9ey"
                            },
                            {
                                nombre: "Concepto Revolución PDF",
                                enlace: "https://drive.google.com/uc?export=download&id=1ZamEXtEcDqbqtko-otcKPqJYSWHgvu7M"
                            },
                            {
                                nombre: "DOCUMENTOS NORMATIVOS Y metodológicos de reducción",
                                enlace: "https://drive.google.com/uc?export=download&id=18HQI5LJ22HOp449RIFEHwLUytqzA6_F4"
                            },
                            {
                                nombre: "GLOSARIO DEFENSA CIVIL",
                                enlace: "https://drive.google.com/uc?export=download&id=1f3Mr2-n12Kk3AZ92efelKUlgkBYVxI5h"
                            },
                            {
                                nombre: "Glosario Seg. y Def. Nac.III  13.12.07",
                                enlace: "https://drive.google.com/uc?export=download&id=185WpZEynhSJbbCBGEHnEsUOuXlkz-bRd"
                            },
                            {
                                nombre: "Ley de los Símbolos Nacionales. GOC-2019-O71",
                                enlace: "https://drive.google.com/uc?export=download&id=1qSQU8pdZevltjm2CtWFlyYkEOXKXR_PB"
                            },
                            {
                                nombre: "Material de estudio Defensa Civil 1",
                                enlace: "https://drive.google.com/uc?export=download&id=1ucYewcOcePeQzkoAFC5xQsIloSKuodtI"
                            },
                            {
                                nombre: "NuevoPlan COVID19",
                                enlace: "https://drive.google.com/uc?export=download&id=1jeWPtjX92HDEfj1nYwxgvpbdbg1WppVo"
                            },
                            {
                                nombre: "Plan de enfrentamiento Covid-19",
                                enlace: "https://drive.google.com/uc?export=download&id=1OVXXZdVua_Dz3oYByU3aBAR9gidm4YzJ"
                            },
                            {
                                nombre: "Prohibiciones de los Símbolos Nacionales",
                                enlace: "https://drive.google.com/uc?export=download&id=1OTOMlZHq6RXCfrrqZm7QVrHR_f9iXOIP"
                            },
                            {
                                nombre: "Simbolos Nacionales",
                                enlace: "https://drive.google.com/uc?export=download&id=1730YG1ztlaIaheW2HSZ9GkCJ0L7Ppn2d"
                            },
                            {
                                nombre: "Situación de desatres",
                                enlace: "https://drive.google.com/uc?export=download&id=1uhhKeD6ysZPm-5q2Ym7VRnXaza7Acr5z"
                            },
                            {
                                nombre: "FOTO titulos-ley-helms-burton-580x789",
                                enlace: "https://drive.google.com/uc?export=download&id=1sm-__PEScTS4-LgXuKqWSfca2Tb6A5N8"
                            }
                        ],
                        clases: [
                            {
                                nombre: "Clase 1",
                                enlace: "https://drive.google.com/uc?export=download&id=1tsXXlMmMWtsgVNNAsedEzkeVBIQbNuoz"
                            },
                            {
                                nombre: "Clase 2",
                                enlace: "https://drive.google.com/uc?export=download&id=1ffpLY9kvJ5T4F_DtR3Ls0XqGzpKU5kCG"
                            },
                            {
                                nombre: "Clase 3",
                                enlace: "https://drive.google.com/uc?export=download&id=1BtAdKkgI2YrUXYJvO6cwOoZI5vChqKaq"
                            },
                            {
                                nombre: "Clase 4",
                                enlace: "https://drive.google.com/uc?export=download&id=1B8nLDu46QWku77NqiGlKKfDUF68lU0Jg"
                            },
                            {
                                nombre: "Trabajo extraclase",
                                enlace: "https://drive.google.com/uc?export=download&id=1DWTYs_2Hm620GlnVHNr3EQUqY6W9W94G"
                            },
                            {
                                nombre: "Tema 1",
                                enlace: "https://drive.google.com/uc?export=download&id=1ERcu5C44ijk6UnBuwC3wEtqb6I4d9vQo"
                            },
                            {
                                nombre: "Guia de estudio 1",
                                enlace: "https://drive.google.com/uc?export=download&id=1NGSX9JEoDV-lCJJQxn5vUy2BQwdR-qhP"
                            },
                            {
                                nombre: "Guia de estudio 2",
                                enlace: "https://drive.google.com/uc?export=download&id=1TOyrDnL0kwcfkZnf-W6WbBSP0yR8-LS1"
                            },
                            {
                                nombre: "Guia de estudio 3",
                                enlace: "https://drive.google.com/uc?export=download&id=1VBd9VEWxeHh7jIaY4Qat1KrITtmgkGFw"
                            },
                            {
                                nombre: "Guia de estudio SN",
                                enlace: "https://drive.google.com/uc?export=download&id=1rRmZiTjCZflkHbjAHRrTYpxxoS0xtOFu"
                            }
                        ]
                    },
                    "Fundamentos de la contrucción del socialismo en cuba I": {
                        expandido: false,
                        bibliografiaBasica: [
                            {
                                nombre: "Constitucion-Cuba-2019",
                                enlace: "https://drive.google.com/uc?export=download&id=1fV2eWwBiIimmEnLFwD76TyST5Ns7y53G"
                            },
                            {
                                nombre: "LT Fundamentos de la construcción del socialismo en Cuba I",
                                enlace: "https://drive.google.com/uc?export=download&id=1d6tefAuFm49qJzyTZWNnB9Pco6SbxRsV"
                            },
                            {
                                nombre: "Fundamentos políticos. Principios fundamentales de la nación _ Juriscuba",
                                enlace: "https://drive.google.com/uc?export=download&id=1p7TUTomo2XsrcBtjlMcMZSFa-fHjtSMS"
                            }
                        ],
                        bibliografiaComplementaria: [
                            {
                                nombre: "¿Cuentapropismo o emprendimiento Una aproximación desde el contexto cubano 2073-6061-cofin-13-02-e03-1-1",
                                enlace: "https://drive.google.com/uc?export=download&id=1DiyJkjjDakj654FHCgn-U3lBFSdT27D7"
                            },
                            {
                                nombre: "EL MANIFIESTO COMUNISTA II",
                                enlace: "https://drive.google.com/uc?export=download&id=1h4wgGnnZBNS26qqa1kKnoM20fBQMHjpK"
                            },
                            {
                                nombre: "GLOSARIO CULTURA POLÍTICA",
                                enlace: "https://drive.google.com/uc?export=download&id=1fR6oYack-VU1kbveW1wYtbTZ438zQsJI"
                            },
                            {
                                nombre: "LA COMUNA DE PARÍS",
                                enlace: "https://drive.google.com/uc?export=download&id=11oRukbLdNqUPhMqBPTkNteylzj8blNUJ"
                            },
                            {
                                nombre: "LAS INTERNACIONALES",
                                enlace: "https://drive.google.com/uc?export=download&id=1mAT6n78Tfa0DAm8xk309DJogg168Qy43"
                            }
                        ],
                        clases: [
                            {
                                nombre: "Clase 1",
                                enlace: "https://drive.google.com/uc?export=download&id=1UUOo5LJRSa1jzTikfMHRM8ZoTzRbeomn"
                            },
                            {
                                nombre: "Clase 2",
                                enlace: "https://drive.google.com/uc?export=download&id=1DIhsvNAtxZSTVb86XW3ixsQgCorXuhuj"
                            },
                            {
                                nombre: "Clase 3",
                                enlace: "https://drive.google.com/uc?export=download&id=1mlef58-SSIkMHrixCOAYJ_y_VCBTsom8"
                            },
                            {
                                nombre: "Clase 4",
                                enlace: "https://drive.google.com/uc?export=download&id=1TceALixgNKIJaKmKHMsBCUfztRQ8bJ7T"
                            },
                            {
                                nombre: "Clase 5",
                                enlace: "https://drive.google.com/uc?export=download&id=1T7mA188ZyBSvYlRzlNAeN0ZI520_stCw"
                            },
                            {
                                nombre: "Clase 6",
                                enlace: "https://drive.google.com/uc?export=download&id=1sEcgMMpFA4n8T7CtVAx_N-otFoMasbFp"
                            },
                            {
                                nombre: "Clase 7",
                                enlace: "https://drive.google.com/uc?export=download&id=1vOgRu9KHtCB9sE_LQdR3W8F2brs28lQg"
                            },
                            {
                                nombre: "Clase 8",
                                enlace: "https://drive.google.com/uc?export=download&id=1XBocdz5_eiOyApEnNqGhoa5ApLsAl2_z"
                            }
                        ]
                    }
                }
            }
        }
    };

    // Colores para cada carrera y sección especial
    const coloresCarreras = {
        contabilidad: {
            border: 'border-blue-200',
            hover: 'hover:bg-blue-50',
            icon: 'text-blue-500',
            año: 'text-blue-400',
            periodo: 'text-blue-300',
            asignatura: 'text-blue-200',
            bibliografia: 'text-blue-100',
            clase: 'text-blue-50'
        },
        culturaFisica: {
            border: 'border-red-200',
            hover: 'hover:bg-red-50',
            icon: 'text-red-500',
            año: 'text-red-400',
            periodo: 'text-red-300',
            asignatura: 'text-red-200',
            bibliografia: 'text-red-100',
            clase: 'text-red-50'
        },
        educacionPrimaria5: {
            border: 'border-green-200',
            hover: 'hover:bg-green-50',
            icon: 'text-green-500',
            año: 'text-green-400',
            periodo: 'text-green-300',
            asignatura: 'text-green-200',
            bibliografia: 'text-green-100',
            clase: 'text-green-50'
        },
        educacionPrimaria3: {
            border: 'border-green-300',
            hover: 'hover:bg-green-100',
            icon: 'text-green-600',
            año: 'text-green-500',
            periodo: 'text-green-400',
            asignatura: 'text-green-300',
            bibliografia: 'text-green-200',
            clase: 'text-green-100'
        },
        educacionPreescolar5: {
            border: 'border-purple-200',
            hover: 'hover:bg-purple-50',
            icon: 'text-purple-500',
            año: 'text-purple-400',
            periodo: 'text-purple-300',
            asignatura: 'text-purple-200',
            bibliografia: 'text-purple-100',
            clase: 'text-purple-50'
        },
        educacionPreescolar3: {
            border: 'border-purple-300',
            hover: 'hover:bg-purple-100',
            icon: 'text-purple-600',
            año: 'text-purple-500',
            periodo: 'text-purple-400',
            asignatura: 'text-purple-300',
            bibliografia: 'text-purple-200',
            clase: 'text-purple-100'
        },
        agronoma: {
            border: 'border-yellow-200',
            hover: 'hover:bg-yellow-50',
            icon: 'text-yellow-500',
            año: 'text-yellow-400',
            periodo: 'text-yellow-300',
            asignatura: 'text-yellow-200',
            bibliografia: 'text-yellow-100',
            clase: 'text-yellow-50'
        },
        trabajoSocial: {
            border: 'border-indigo-200',
            hover: 'hover:bg-indigo-50',
            icon: 'text-indigo-500',
            año: 'text-indigo-400',
            periodo: 'text-indigo-300',
            asignatura: 'text-indigo-200',
            bibliografia: 'text-indigo-100',
            clase: 'text-indigo-50'
        },
        tecnicoTrabajoSocial: {
            border: 'border-pink-200',
            hover: 'hover:bg-pink-50',
            icon: 'text-pink-500',
            año: 'text-pink-400',
            periodo: 'text-pink-300',
            asignatura: 'text-pink-200',
            bibliografia: 'text-pink-100',
            clase: 'text-pink-50'
        },
        trabajoMetodologico: {
            border: 'border-teal-200',
            hover: 'hover:bg-teal-50',
            icon: 'text-teal-500',
            asignatura: 'text-teal-300',
            bibliografia: 'text-teal-100',
            clase: 'text-teal-50'
        },
        idiomas: {
            border: 'border-amber-200',
            hover: 'hover:bg-amber-50',
            icon: 'text-amber-500',
            asignatura: 'text-amber-300',
            bibliografia: 'text-amber-100',
            clase: 'text-amber-50'
        },
        eventos: {
            border: 'border-rose-200',
            hover: 'hover:bg-rose-50',
            icon: 'text-rose-500',
            asignatura: 'text-rose-300',
            bibliografia: 'text-rose-100',
            clase: 'text-rose-50'
        }
    };

    // Función para obtener asignaturas
    const obtenerAsignaturas = (carrera, año, periodo) => {
        return asignaturasEjemplo[carrera]?.[año]?.[periodo] || {
            "Asignatura de Ejemplo": {
                expandido: false,
                bibliografiaBasica: [
                    { nombre: "Libro básico 1", enlace: "#" },
                    { nombre: "Libro básico 2", enlace: "#" }
                ],
                bibliografiaComplementaria: [
                    { nombre: "Libro complementario 1", enlace: "#" },
                    { nombre: "Libro complementario 2", enlace: "#" }
                ],
                clases: [
                    { nombre: "Clase de Ejemplo 1", enlace: "#" },
                    { nombre: "Clase de Ejemplo 2", enlace: "#" }
                ]
            }
        };
    };

    // Función auxiliar para obtener el nombre de la carrera o sección especial
    const obtenerNombreSeccion = (idSeccion) => {
        const nombres = {
            contabilidad: 'Licenciatura en Contabilidad y Finanzas',
            culturaFisica: 'Licenciatura en Cultura Física',
            educacionPrimaria5: 'Licenciatura en Educación Primaria (5 años)',
            educacionPrimaria3: 'Licenciatura en Educación Primaria (3 años)',
            educacionPreescolar5: 'Licenciatura en Educación Preescolar (5 años)',
            educacionPreescolar3: 'Licenciatura en Educación Preescolar (3 años)',
            agronoma: 'Ingeniería Agrónoma',
            trabajoSocial: 'Licenciatura en Trabajo Social',
            tecnicoTrabajoSocial: 'Técnico Superior en Trabajo Social',
            trabajoMetodologico: 'Trabajo Metodológico',
            idiomas: 'Idiomas',
            eventos: 'Eventos'
        };
        return nombres[idSeccion] || idSeccion;
    };

    // Componente para renderizar una carrera
    const renderCarrera = (carrera, nombreCarrera) => {
        const colores = coloresCarreras[carrera];

        return (
            <div className={`pl-4 border-l-2 ${colores.border}`} key={carrera}>
                <div
                    className={`flex items-center justify-between px-3 py-3 transition-colors rounded-lg cursor-pointer ${colores.hover} ${carreraSeleccionada === carrera ? 'bg-gray-100' : ''}`}
                    onClick={() => toggleCarrera(carrera)}
                >
                    <span className="text-lg font-semibold text-gray-800">{nombreCarrera}</span>
                    <svg
                        className={`w-6 h-6 ${colores.icon} transform transition-transform ${expanded.carreras[carrera].expandido ? 'rotate-0' : '-rotate-90'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {expanded.carreras[carrera].expandido && (
                    <div className={`pl-4 mt-2 ml-4 space-y-3 border-l-2 ${colores.border}`}>
                        {Object.keys(expanded.carreras[carrera].años).map(añoStr => {
                            const año = parseInt(añoStr);
                            return (
                                <div key={`${carrera}-año-${año}`}>
                                    <div
                                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${colores.hover}`}
                                        onClick={() => toggleAño(carrera, año)}
                                    >
                                        <span className="font-medium text-gray-700">{año}° Año</span>
                                        <svg
                                            className={`w-5 h-5 ${colores.año} transform transition-transform ${expanded.carreras[carrera].años[año].expandido ? 'rotate-0' : '-rotate-90'}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>

                                    {expanded.carreras[carrera].años[año].expandido && (
                                        <div className={`pl-4 ml-4 space-y-2 border-l-2 ${colores.border}`}>
                                            {[1, 2].map(periodo => (
                                                <div key={`${carrera}-periodo-${año}-${periodo}`}>
                                                    <div
                                                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${colores.hover}`}
                                                        onClick={() => togglePeriodo(carrera, año, periodo)}
                                                    >
                                                        <span className="text-gray-600">{periodo === 1 ? 'Primer' : 'Segundo'} período</span>
                                                        <svg
                                                            className={`w-5 h-5 ${colores.periodo} transform transition-transform ${expanded.carreras[carrera].años[año].periodos[periodo].expandido ? 'rotate-0' : '-rotate-90'}`}
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>

                                                    {expanded.carreras[carrera].años[año].periodos[periodo].expandido && (
                                                        <div className={`pl-4 ml-4 space-y-3 border-l-2 ${colores.border}`}>
                                                            {Object.entries(obtenerAsignaturas(carrera, año, periodo)).map(([nombreAsignatura, datos]) => (
                                                                <div key={`${carrera}-asignatura-${año}-${periodo}-${nombreAsignatura}`}>
                                                                    <div
                                                                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${colores.hover}`}
                                                                        onClick={() => toggleAsignatura(carrera, año, periodo, nombreAsignatura)}
                                                                    >
                                                                        <span className="text-sm font-medium text-gray-600">{nombreAsignatura}</span>
                                                                        <svg
                                                                            className={`w-4 h-4 ${colores.asignatura} transform transition-transform ${expanded.carreras[carrera].años[año].periodos[periodo].asignaturas[nombreAsignatura]?.expandido ? 'rotate-0' : '-rotate-90'}`}
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                        </svg>
                                                                    </div>

                                                                    {expanded.carreras[carrera].años[año].periodos[periodo].asignaturas[nombreAsignatura]?.expandido && (
                                                                        <div className={`pl-4 ml-4 space-y-2 border-l-2 ${colores.border}`}>
                                                                            {/* Bibliografía Básica */}
                                                                            <div className="px-3 py-1 rounded-md cursor-pointer"
                                                                                onClick={() => toggleBibliografia(carrera, año, periodo, nombreAsignatura, 'basica')}>
                                                                                <div className="flex items-center justify-between">
                                                                                    <div className="text-xs font-semibold text-gray-500">Bibliografía Básica</div>
                                                                                    <svg
                                                                                        className={`w-4 h-4 ${colores.bibliografia} transform transition-transform ${expanded.bibliografias[`${carrera}-${año}-${periodo}-${nombreAsignatura}-basica`] ? 'rotate-0' : '-rotate-90'}`}
                                                                                        fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                        stroke="currentColor"
                                                                                    >
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                                    </svg>
                                                                                </div>
                                                                                {expanded.bibliografias[`${carrera}-${año}-${periodo}-${nombreAsignatura}-basica`] && (
                                                                                    <ul className="mt-1 ml-4 space-y-1">
                                                                                        {datos.bibliografiaBasica.map((libro, index) => (
                                                                                            <li key={`basica-${index}`} className="text-xs text-gray-600">
                                                                                                <a
                                                                                                    href={libro.enlace}
                                                                                                    onClick={(e) => handleDownload(e, libro.enlace, libro.nombre)}
                                                                                                    className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
                                                                                                >
                                                                                                    {libro.nombre}
                                                                                                </a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                )}
                                                                            </div>

                                                                            {/* Bibliografía Complementaria */}
                                                                            <div className="px-3 py-1 rounded-md cursor-pointer"
                                                                                onClick={() => toggleBibliografia(carrera, año, periodo, nombreAsignatura, 'complementaria')}>
                                                                                <div className="flex items-center justify-between">
                                                                                    <div className="text-xs font-semibold text-gray-500">Bibliografía Complementaria</div>
                                                                                    <svg
                                                                                        className={`w-4 h-4 ${colores.bibliografia} transform transition-transform ${expanded.bibliografias[`${carrera}-${año}-${periodo}-${nombreAsignatura}-complementaria`] ? 'rotate-0' : '-rotate-90'}`}
                                                                                        fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                        stroke="currentColor"
                                                                                    >
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                                    </svg>
                                                                                </div>
                                                                                {expanded.bibliografias[`${carrera}-${año}-${periodo}-${nombreAsignatura}-complementaria`] && (
                                                                                    <ul className="mt-1 ml-4 space-y-1">
                                                                                        {datos.bibliografiaComplementaria.map((libro, index) => (
                                                                                            <li key={`complementaria-${index}`} className="text-xs text-gray-600">
                                                                                                <a
                                                                                                    href={libro.enlace}
                                                                                                    onClick={(e) => handleDownload(e, libro.enlace, libro.nombre)}
                                                                                                    className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
                                                                                                >
                                                                                                    {libro.nombre}
                                                                                                </a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                )}
                                                                            </div>

                                                                            {/* Clases */}
                                                                            <div className="px-3 py-1 rounded-md cursor-pointer"
                                                                                onClick={() => toggleClases(carrera, año, periodo, nombreAsignatura)}>
                                                                                <div className="flex items-center justify-between">
                                                                                    <div className="text-xs font-semibold text-gray-500">Clases</div>
                                                                                    <svg
                                                                                        className={`w-4 h-4 ${colores.clase} transform transition-transform ${expanded.clases[`${carrera}-${año}-${periodo}-${nombreAsignatura}-clases`] ? 'rotate-0' : '-rotate-90'}`}
                                                                                        fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                        stroke="currentColor"
                                                                                    >
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                                    </svg>
                                                                                </div>
                                                                                {expanded.clases[`${carrera}-${año}-${periodo}-${nombreAsignatura}-clases`] && (
                                                                                    <ul className="mt-1 ml-4 space-y-1">
                                                                                        {datos.clases.map((clase, index) => (
                                                                                            <li key={`clase-${index}`} className="text-xs text-gray-600">
                                                                                                <a
                                                                                                    href={clase.enlace}
                                                                                                    onClick={(e) => handleDownload(e, clase.enlace, clase.nombre)}
                                                                                                    className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
                                                                                                >
                                                                                                    {clase.nombre}
                                                                                                </a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    // Componente para renderizar una sección especial (sin años)
    const renderSeccionEspecial = (seccion, nombreSeccion) => {
        const colores = coloresCarreras[seccion];

        return (
            <div className={`pl-4 border-l-2 ${colores.border}`} key={seccion}>
                <div
                    className={`flex items-center justify-between px-3 py-3 transition-colors rounded-lg cursor-pointer ${colores.hover} ${carreraSeleccionada === seccion ? 'bg-gray-100' : ''}`}
                    onClick={() => toggleSeccionEspecial(seccion)}
                >
                    <span className="text-lg font-semibold text-gray-800">{nombreSeccion}</span>
                    <svg
                        className={`w-6 h-6 ${colores.icon} transform transition-transform ${expanded.seccionesEspeciales[seccion].expandido ? 'rotate-0' : '-rotate-90'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {expanded.seccionesEspeciales[seccion].expandido && (
                    <div className={`pl-4 mt-2 ml-4 space-y-3 border-l-2 ${colores.border}`}>
                        {Object.entries(expanded.seccionesEspeciales[seccion].asignaturas).map(([nombreAsignatura, datos]) => (
                            <div key={`${seccion}-asignatura-${nombreAsignatura}`}>
                                <div
                                    className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${colores.hover}`}
                                    onClick={() => toggleAsignatura(seccion, null, null, nombreAsignatura, 'seccionEspecial')}
                                >
                                    <span className="text-sm font-medium text-gray-600">{nombreAsignatura}</span>
                                    <svg
                                        className={`w-4 h-4 ${colores.asignatura} transform transition-transform ${expanded.seccionesEspeciales[seccion].asignaturas[nombreAsignatura]?.expandido ? 'rotate-0' : '-rotate-90'}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {expanded.seccionesEspeciales[seccion].asignaturas[nombreAsignatura]?.expandido && (
                                    <div className={`pl-4 ml-4 space-y-2 border-l-2 ${colores.border}`}>
                                        {/* Bibliografía Básica */}
                                        <div className="px-3 py-1 rounded-md cursor-pointer"
                                            onClick={() => toggleBibliografia(seccion, null, null, nombreAsignatura, 'basica', true)}>
                                            <div className="flex items-center justify-between">
                                                <div className="text-xs font-semibold text-gray-500">Bibliografía Básica</div>
                                                <svg
                                                    className={`w-4 h-4 ${colores.bibliografia} transform transition-transform ${expanded.bibliografias[`${seccion}-${nombreAsignatura}-basica`] ? 'rotate-0' : '-rotate-90'}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            {expanded.bibliografias[`${seccion}-${nombreAsignatura}-basica`] && (
                                                <ul className="mt-1 ml-4 space-y-1">
                                                    {datos.bibliografiaBasica.map((libro, index) => (
                                                        <li key={`basica-${index}`} className="text-xs text-gray-600">
                                                            <a
                                                                href={libro.enlace}
                                                                onClick={(e) => handleDownload(e, libro.enlace, libro.nombre)}
                                                                className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
                                                            >
                                                                {libro.nombre}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        {/* Bibliografía Complementaria */}
                                        <div className="px-3 py-1 rounded-md cursor-pointer"
                                            onClick={() => toggleBibliografia(seccion, null, null, nombreAsignatura, 'complementaria', true)}>
                                            <div className="flex items-center justify-between">
                                                <div className="text-xs font-semibold text-gray-500">Bibliografía Complementaria</div>
                                                <svg
                                                    className={`w-4 h-4 ${colores.bibliografia} transform transition-transform ${expanded.bibliografias[`${seccion}-${nombreAsignatura}-complementaria`] ? 'rotate-0' : '-rotate-90'}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            {expanded.bibliografias[`${seccion}-${nombreAsignatura}-complementaria`] && (
                                                <ul className="mt-1 ml-4 space-y-1">
                                                    {datos.bibliografiaComplementaria.map((libro, index) => (
                                                        <li key={`complementaria-${index}`} className="text-xs text-gray-600">
                                                            <a
                                                                href={libro.enlace}
                                                                onClick={(e) => handleDownload(e, libro.enlace, libro.nombre)}
                                                                className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
                                                            >
                                                                {libro.nombre}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        {/* Clases */}
                                        <div className="px-3 py-1 rounded-md cursor-pointer"
                                            onClick={() => toggleClases(seccion, null, null, nombreAsignatura, true)}>
                                            <div className="flex items-center justify-between">
                                                <div className="text-xs font-semibold text-gray-500">Clases</div>
                                                <svg
                                                    className={`w-4 h-4 ${colores.clase} transform transition-transform ${expanded.clases[`${seccion}-${nombreAsignatura}-clases`] ? 'rotate-0' : '-rotate-90'}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            {expanded.clases[`${seccion}-${nombreAsignatura}-clases`] && (
                                                <ul className="mt-1 ml-4 space-y-1">
                                                    {datos.clases.map((clase, index) => (
                                                        <li key={`clase-${index}`} className="text-xs text-gray-600">
                                                            <a
                                                                href={clase.enlace}
                                                                onClick={(e) => handleDownload(e, clase.enlace, clase.nombre)}
                                                                className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
                                                            >
                                                                {clase.nombre}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div id="cursos-section" className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
            <div className="flex items-center mt-20 mb-6 text-sm text-gray-500">
                <Link to="/" className="text-blue-600 hover:underline">Página Principal</Link>
                <span className="mx-2">/</span>
                <span>Cursos</span>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Buscar cursos o asignaturas"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={terminoBusqueda}
                    onChange={(e) => setTerminoBusqueda(e.target.value)}
                />
            </div>

            {terminoBusqueda.trim() && (
                <div className="mb-6">
                    <h3 className="mb-3 text-lg font-semibold">
                        Resultados de búsqueda para "{terminoBusqueda}"
                    </h3>

                    {resultadosBusqueda.length > 0 ? (
                        <div className="space-y-4">
                            {resultadosBusqueda.map((resultado, index) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">{resultado.nombreAsignatura}</h4>
                                            <p className="text-sm text-gray-600">
                                                {obtenerNombreSeccion(resultado.carrera)}
                                                {resultado.tipo === 'carrera' && ` - ${resultado.año}° Año - ${resultado.periodo === 1 ? 'Primer' : 'Segundo'} período`}
                                            </p>
                                        </div>
                                        <button
                                            className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                                            onClick={() => {
                                                setCarreraSeleccionada(resultado.carrera);
                                                setTerminoBusqueda('');

                                                if (resultado.tipo === 'carrera') {
                                                    setExpanded(prev => ({
                                                        ...prev,
                                                        carreras: {
                                                            ...prev.carreras,
                                                            [resultado.carrera]: {
                                                                ...prev.carreras[resultado.carrera],
                                                                expandido: true,
                                                                años: {
                                                                    ...prev.carreras[resultado.carrera].años,
                                                                    [resultado.año]: {
                                                                        ...prev.carreras[resultado.carrera].años[resultado.año],
                                                                        expandido: true,
                                                                        periodos: {
                                                                            ...prev.carreras[resultado.carrera].años[resultado.año].periodos,
                                                                            [resultado.periodo]: {
                                                                                ...prev.carreras[resultado.carrera].años[resultado.año].periodos[resultado.periodo],
                                                                                expandido: true,
                                                                                asignaturas: {
                                                                                    ...prev.carreras[resultado.carrera].años[resultado.año].periodos[resultado.periodo].asignaturas,
                                                                                    [resultado.nombreAsignatura]: {
                                                                                        expandido: true
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }));
                                                } else {
                                                    setExpanded(prev => ({
                                                        ...prev,
                                                        seccionesEspeciales: {
                                                            ...prev.seccionesEspeciales,
                                                            [resultado.carrera]: {
                                                                ...prev.seccionesEspeciales[resultado.carrera],
                                                                expandido: true,
                                                                asignaturas: {
                                                                    ...prev.seccionesEspeciales[resultado.carrera].asignaturas,
                                                                    [resultado.nombreAsignatura]: {
                                                                        ...prev.seccionesEspeciales[resultado.carrera].asignaturas[resultado.nombreAsignatura],
                                                                        expandido: true
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }));
                                                }
                                            }}
                                        >
                                            Ir a la asignatura
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No se encontraron asignaturas que coincidan con la búsqueda</p>
                    )}
                </div>
            )}

            {!terminoBusqueda.trim() && (
                <div className="space-y-4">
                    {/* Carreras regulares */}
                    <h2 className="text-xl font-bold text-gray-800">Carreras Universitarias</h2>
                    {renderCarrera('contabilidad', 'Licenciatura en Contabilidad y Finanzas')}
                    {renderCarrera('culturaFisica', 'Licenciatura en Cultura Física')}
                    {renderCarrera('educacionPrimaria5', 'Licenciatura en Educación Primaria (5 años)')}
                    {renderCarrera('educacionPrimaria3', 'Licenciatura en Educación Primaria (3 años)')}
                    {renderCarrera('educacionPreescolar5', 'Licenciatura en Educación Preescolar (5 años)')}
                    {renderCarrera('educacionPreescolar3', 'Licenciatura en Educación Preescolar (3 años)')}
                    {renderCarrera('agronoma', 'Ingeniería Agrónoma')}
                    {renderCarrera('trabajoSocial', 'Licenciatura en Trabajo Social')}
                    {renderCarrera('tecnicoTrabajoSocial', 'Técnico Superior en Trabajo Social')}

                    {/* Secciones especiales */}
                    <h2 className="pt-6 mt-6 text-xl font-bold text-gray-800 border-t border-gray-200">Otras Secciones</h2>
                    {renderSeccionEspecial('trabajoMetodologico', 'Trabajo Metodológico')}
                    {renderSeccionEspecial('idiomas', 'Idiomas')}
                    {renderSeccionEspecial('eventos', 'Eventos')}
                </div>
            )}

            <div className="pt-4 mt-6 border-t border-gray-200">
                <button
                    className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
                    onClick={toggleExpandCollapseAll}
                >
                    {todoColapsado() ? 'Desplegar todo' : 'Colapsar todo'}
                </button>
            </div>
        </div>
    );
}