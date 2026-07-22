import type { TranslationDictionary } from "../types";

const es: TranslationDictionary = {
  meta: {
    title: "Jungle Fish — Experiencias Naturales",
    description:
      "Un espacio tropical de experiencias sostenibles, ecoturismo y conexión directa con la naturaleza.",
  },
  nav: {
    about: "Nosotros",
    payments: "Pagos",
    mtb: "Competencia MTB",
    visit: "Visítanos",
    volunteer: "Voluntariado",
  },
  hero: {
    eyebrow: "Ecoturismo y vida sostenible",
    title: "Reconéctate con la naturaleza",
    subtitle:
      "Jungle Fish es un espacio donde la permacultura, la acuacultura y las experiencias al aire libre se unen — fresco, orgánico y vivo.",
    ctaPrimary: "Explorar experiencias",
    ctaSecondary: "Competencia MTB",
  },
  about: {
    eyebrow: "¿Quienes somos?",
    title: "Un ecosistema vivo",
    description:
      "Combinamos producción sostenible, actividades recreativas y hospitalidad natural para que cada visita sea un auténtico escape a la jungla.",
    detailBack: "Volver a Nosotros",
    detailCta: "Planifica tu visita",
    cardCta: "Saber más",
    experienceTitle: "Lo que vivirás",
    visitNoteTitle: "Bueno saber",
    availableTitle: "Actualmente disponible",
    availableSubtitle: "Todo lo que ya existe y puedes visitar o vivir hoy.",
    growingTitle: "En desarrollo en Jungle Fish",
    growingSubtitle: "Proyectos y áreas en crecimiento que estamos construyendo.",
    cards: {
      permaculture: {
        title: "Permacultura",
        description:
          "Sistemas autosuficientes diseñados en armonía con la tierra — cultivando alimentos, restaurando suelos y fomentando la biodiversidad.",
        detail: {
          intro:
            "Nuestras zonas de permacultura son laboratorios vivos donde bosques comestibles, sistemas de compostaje y captación de agua trabajan en conjunto. Los visitantes recorren plantaciones en capas, observan la regeneración del suelo y ven cómo el diseño en circuito cerrado mantiene el santuario productivo todo el año.",
          highlights: [
            "Bosques comestibles con especies nativas y cultivables",
            "Talleres de compostaje y restauración de suelos",
            "Captación de lluvia y reutilización de aguas grises",
            "Jardines de plantas medicinales y corredores para polinizadores",
          ],
          experiences: [
            {
              title: "Recorrido guiado por la finca",
              description:
                "Un paseo pausado por nuestras zonas de cultivo con explicaciones prácticas de cómo cada elemento apoya al siguiente.",
            },
            {
              title: "Siembra participativa",
              description:
                "Ayuda a preparar camas, trasplantar plántulas o cubrir senderos junto a nuestros cuidadores del terreno.",
            },
            {
              title: "Cosecha y degustación",
              description:
                "Prueba productos de temporada recogidos el mismo día en camas diseñadas para sabor y resiliencia.",
            },
          ],
          visitNote:
            "Usa calzado cómodo y ropa ligera. Las visitas matutinas son ideales por el clima más fresco y la actividad en la finca.",
        },
      },
      aquaculture: {
        title: "Acuacultura",
        description:
          "Tilapia fresca y especies acuáticas cultivadas en entornos controlados y sostenibles.",
        detail: {
          intro:
            "Jungle Fish opera sistemas integrados de acuacultura donde los estanques de tilapia se conectan con el ecosistema general. El agua circula por pozas cuidadosamente gestionadas, favoreciendo la salud del pez y alimentando jardines adyacentes mientras reduce el desperdicio en todo el santuario.",
          highlights: [
            "Tilapia fresca criada en el lugar",
            "Cadena estanque-a-plato para el restaurante",
            "Recirculación de agua entre pozas y jardines",
            "Sesiones introductorias sobre piscicultura sostenible",
          ],
          experiences: [
            {
              title: "Panorama de los estanques",
              description:
                "Conoce cómo diseñamos los sistemas de tilapia para el trópico y una producción constante.",
            },
            {
              title: "Alimentación y monitoreo",
              description:
                "Observa las rutinas diarias que mantienen estable la calidad del agua y el crecimiento saludable.",
            },
            {
              title: "Conexión con la cocina",
              description:
                "Sigue el camino del estanque al plato y comprueba cómo la frescura transforma el menú.",
            },
          ],
          visitNote:
            "Las zonas de estanques pueden ser húmedas y soleadas. Lleva sombrero y agua. Los niños son bienvenidos con supervisión adulta cerca del agua.",
        },
      },
      accommodation: {
        title: "Hospedaje",
        description:
          "Cabañas y espacios de descanso para relajarte, respirar y permanecer inmerso en el entorno.",
        detail: {
          intro:
            "Quédate rodeado de sonidos de jungla, aire libre y ritmos sin prisa. Nuestras cabañas y áreas de descanso están pensadas para quienes buscan comodidad sin perder contacto con la tierra — espacios sencillos, materiales naturales y mañanas tranquilas antes de que el santuario cobre vida.",
          highlights: [
            "Cabañas inmersas en vegetación",
            "Áreas compartidas de descanso y convivencia",
            "Acceso a senderos, estanques y talleres",
            "Base ideal para experiencias eco de varios días",
          ],
          experiences: [
            {
              title: "Espacios orientados a la naturaleza",
              description:
                "Despierta con canto de aves y luz del bosque en espacios frescos y conectados al exterior.",
            },
            {
              title: "Mañanas tranquilas",
              description:
                "Disfruta un café cerca de los jardines antes de explorar permacultura, acuacultura o programas educativos.",
            },
            {
              title: "Calma al atardecer",
              description:
                "Relájate tras los recorridos y talleres en áreas comunes diseñadas para el descanso.",
            },
          ],
          visitNote:
            "La disponibilidad varía según la temporada. Contáctanos antes de tu visita para confirmar cabañas y arreglos grupales.",
        },
      },
      book: {
        title: "Los Siete Libros de Jungle Fish",
        description:
          "Una guía integral para reconectar con los ritmos de la naturaleza mediante diseño regenerativo, plantas medicinales y el arte de vivir en circuito cerrado en el trópico.",
        detail: {
          intro:
            "Los Siete Libros de Jungle Fish son nuestro marco para vivir bien en el trópico — un conjunto de principios sobre tierra, agua, alimento, comunidad, salud, economía y espíritu. Las sesiones en el lugar presentan las ideas detrás de cada libro y cómo orientan cada proyecto del santuario.",
          highlights: [
            "Siete volúmenes temáticos sobre vida regenerativa",
            "Plantas medicinales y saberes tradicionales",
            "Diseño en circuito cerrado para climas tropicales",
            "Círculos de conversación con visitantes y locales",
          ],
          experiences: [
            {
              title: "Sesiones de introducción",
              description:
                "Charlas iniciales que vinculan cada volumen con prácticas reales visibles en la propiedad.",
            },
            {
              title: "Caminatas de plantas medicinales",
              description:
                "Identifica especies útiles y aprende cómo encajan en la salud diaria y el cuidado del terreno.",
            },
            {
              title: "Reflexión y bitácora",
              description:
                "Tiempo tranquilo para conectar las ideas con tu propia relación con la naturaleza y la comunidad.",
            },
          ],
          visitNote:
            "No se requiere lectura previa. Las sesiones son conversacionales y aptas para visitantes curiosos por primera vez.",
        },
      },
      freshFood: {
        title: "Comida Fresca",
        description:
          "Tilapia y productos locales servidos directamente desde nuestros sistemas sostenibles.",
        detail: {
          intro:
            "El restaurante y bar de Jungle Fish muestran lo que la tierra y los estanques producen cada semana. Los menús cambian con las cosechas — tilapia de nuestra acuacultura, verduras de las camas de permacultura e ingredientes regionales con un toque ligero y fresco.",
          highlights: [
            "Tilapia proveniente de estanques en el lugar",
            "Productos de temporada de camas de permacultura",
            "Restaurante y bar abiertos a visitantes",
            "Platos con raíces en sabores costarricenses",
          ],
          experiences: [
            {
              title: "Comida del campo a la mesa",
              description:
                "Come sabiendo que los ingredientes principales recorrieron solo unos metros del estanque o jardín a la cocina.",
            },
            {
              title: "Selección de temporada",
              description:
                "Pregunta qué hay fresco ese día — el menú refleja lo que el santuario está cosechando ahora.",
            },
            {
              title: "Bebidas en el bar",
              description:
                "Relájate con refrescos tras talleres o caminatas en nuestro espacio social al aire libre.",
            },
          ],
          visitNote:
            "El horario de cocina puede variar. Escríbenos antes de tu visita para comidas del día y reservas grupales.",
        },
      },
      education: {
        title: "Visitas Educativas",
        description:
          "Aprende sobre sostenibilidad, ecología y vivir en equilibrio con la naturaleza.",
        detail: {
          intro:
            "Las visitas educativas acercan a estudiantes, familias y viajeros curiosos a prácticas regenerativas de forma directa. Los programas combinan charlas breves, observación guiada y actividades prácticas para escuelas, universidades y grupos informales.",
          highlights: [
            "Programas para escuelas y universidades",
            "Introducciones a ecología y sostenibilidad",
            "Actividades prácticas en finca y estanques",
            "Temas semanales ligados a proyectos del santuario",
          ],
          experiences: [
            {
              title: "Introducciones de campo",
              description:
                "Panoramas adaptados por edad sobre permacultura, acuacultura y cuidado comunitario del terreno.",
            },
            {
              title: "Estaciones interactivas",
              description:
                "Rota por demostraciones prácticas sobre suelo, agua, plantas y sistemas alimentarios.",
            },
            {
              title: "Preguntas con los cuidadores",
              description:
                "Conversa con quienes gestionan la tierra a diario y escucha cómo evolucionan los proyectos por temporada.",
            },
          ],
          visitNote:
            "Los grupos deben reservar con anticipación. Podemos adaptar duración y enfoque para escuelas o intereses especiales.",
        },
      },
    },
  },
  jfish: {
    eyebrow: "Conoce $JFISH",
    title: "Stellar Network News",
    description:
      "$JFISH es nuestro token nativo recién desarrollado en la red Stellar. Es una forma de invertir, participar y desbloquear las experiencias de la jungla tropical mientras creamos y fortalecemos el potencial de nuestras comunidades y del planeta.",
    usesTitle: "Cómo usar $JFISH a través de Stellar",
    uses: [
      "Compra cualquier commodity, producto y moneda del mundo directamente en la red Stellar.",
      "Conecta y asegura cada parte de tu sistema financiero a través de un stronghold.",
      "Las transacciones ocurren en segundos vía Stellar, mientras stronghold garantiza que todo quede contabilizado de forma segura.",
      "Escanea códigos QR para obtener control total y realizar compras en segundos.",
    ],
    closingText:
      "Stellar Network News: tu espacio para aprender a comprar, invertir y participar en la red.",
    xCta: "Síguenos en X",
    howTitle: "Cómo funciona",
    howDescription:
      "Stellar es una red descentralizada sin fines de lucro diseñada para ser accesible para todos. Ya sea que quieras conocer más sobre la red, interactuar con contratos inteligentes o explorar un ecosistema fundamentalmente sencillo, está pensada para que la disfruten personas de 3 a 100 años.",
    interestTitle: "¿Te interesa Stellar?",
    contactLabel: "Contáctanos",
    emailSubject: "Consulta sobre Stellar — Jungle Fish",
    emailBodyIntro: "Nueva consulta sobre Stellar / $JFISH:",
    successMessage:
      "¡Gracias! Tu aplicación de correo debería abrirse con tu mensaje listo para enviar. Si no se abrió, escríbenos directamente al correo de contacto en esta página.",
    form: {
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Correo electrónico",
      emailPlaceholder: "tu@ejemplo.com",
      message: "Mensaje",
      messagePlaceholder: "Dejanos un mensaje.",
      submit: "Enviar",
    },
  },
  payments: {
    eyebrow: "Métodos de pago",
    title: "Paga en segundos",
    description:
      "Aceptamos pagos tradicionales y digitales para que tu visita sea fluida — ya prefieras efectivo, tarjeta o cripto.",
    methods: {
      cash: {
        title: "Efectivo",
        description: "Aceptado en sitio para todos los servicios.",
      },
      card: {
        title: "Tarjeta",
        description: "Tarjetas de crédito y débito bienvenidas.",
      },
      usdc: {
        title: "USDC",
        description: "Pagos digitales estables para un checkout sencillo.",
      },
      jfish: {
        title: "$JFISH",
        description:
          "Nuestro token nativo para recompensas y pagos del ecosistema.",
      },
    },
    traditionalEyebrow: "Pagos en el lugar",
    cryptoEyebrow: "Pagos digitales y cripto",
  },
  volunteer: {
    eyebrow: "Únete al movimiento",
    title: "Voluntariado en Jungle Fish",
    description:
      "Convocatoria internacional abierta para personas conscientes que quieran ayudar a hacer crecer nuestro ecosantuario en Costa Rica.",
    intro:
      "Dona tu tiempo, habilidades y energía para construir algo real, desde estanques de tilapia y senderos hasta talleres que conectan la regeneración de la tierra con la comunidad.",
    highlights: [
      "Trabajo práctico en la granja de tilapia, restaurante, bar e infraestructura ecológica",
      "Mapeo de senderos, construcción de cabañas y cuidado diario del terreno",
      "Talleres semanales: permacultura, acuacultura, introducción a Stellar y reciclaje creativo",
      "Inmersión comunitaria con locales, visitantes y una red global de voluntarios",
      "Acceso compartido a los espacios recreativos del santuario mientras contribuyes",
    ],
    noteTitle: "Modelo de donación de tiempo",
    noteBody:
      "El voluntariado en Jungle Fish se basa en donar tu tiempo — no hay salario ni compensación económica. A cambio, obtienes una inmersión profunda en la comunidad y acceso a la infraestructura compartida que construimos juntos.",
    formTitle: "Solicitud de voluntariado",
    formDescription:
      "Cuéntanos un poco sobre ti. Revisaremos tu solicitud y te responderemos por correo.",
    emailSubject: "Solicitud de voluntariado — Jungle Fish",
    emailBodyIntro: "Nueva solicitud de voluntariado:",
    successMessage:
      "¡Gracias! Tu aplicación de correo debería abrirse lista para enviar. Si no se abrió, escríbenos directamente al correo de contacto en esta página.",
    form: {
      fullName: "Nombre completo",
      fullNamePlaceholder: "María García",
      phone: "Número de teléfono",
      countryCode: "Código de país",
      phonePlaceholder: "8888 8888",
      email: "Correo electrónico",
      emailPlaceholder: "tu@ejemplo.com",
      message: "Sobre ti y por qué quieres unirte",
      messagePlaceholder:
        "Comparte tu experiencia, habilidades, disponibilidad y qué te atrae de Jungle Fish…",
      submit: "Enviar solicitud",
    },
  },
  finalCta: {
    eyebrow: "Planifica tu visita",
    title: "Ven a vivir Jungle Fish",
    description:
      "Ya sea por un día o por la noche, la naturaleza te espera. Escríbenos para conocer ubicación, horarios y próximas experiencias.",
    ctaPrimary: "Contáctanos",
    ctaSecondary: "Sobre nosotros",
    locationLabel: "Ubicación",
    phoneLabel: "Teléfono",
    contactLabel: "Correo",
  },
  footer: {
    tagline: "Natural. Sostenible. Vivo.",
    rights: "Todos los derechos reservados.",
    sections: "Secciones",
    connect: "Conectar",
    facebook: "Facebook",
    instagram: "Instagram",
    x: "X",
  },
  mtb: {
    eyebrow: "¡Mucho Más Que Una Carrera!",
    title: "Pedalea, Gana y Vive la Experiencia $JFISH",
    description:
      "¿Listo para el verdadero Mountain Bike del futuro? Aquí no solo vienes a darlo todo en la pista; vienes a formar parte de un ecosistema que premia tu esfuerzo desde el primer segundo. Al asegurar tu campo, tu inscripción se convierte en el motor de tu fin de semana.",
    benefitsTitle: "🔥 Lo que incluye tu inscripción inteligente:",
    benefits: [
      {
        title: "Saldo Real en tu Billetera ($JFISH)",
        description:
          "Con la compra de tu ticket de carrera, recibes de forma automática un porcentaje de tu inscripción en tokens $JFISH directo en tu billetera digital. ¡Dinero listo para usar!",
      },
      {
        title: "Ecosistema de Descuentos Exclusivos",
        description:
          "Usa tus tokens en los mejores hoteles, restaurantes y comercios eco-turísticos aliados de la zona. Obtén hasta un 15% de descuento inmediato o cashbacks especiales al pagar con tu celular.",
      },
      {
        title: "Dinámicas y Regalos en Ruta",
        description:
          "¿Quieres más tokens? Los comercios locales te regalarán más $JFISH solo por visitarlos, subir una historia a Instagram o dejarles un review de 5 estrellas en Google Maps. ¡Tu experiencia se paga sola!",
      },
      {
        title: "Turismo Triple",
        description:
          "Disfruta de un evento que une el deporte rudo, la naturaleza de la zona y la tecnología financiera más avanzada de Costa Rica.",
      },
    ],
    urgencyTitle: "⚡ ¡No te quedes fuera de la línea de salida!",
    urgencyText:
      "Las inscripciones son limitadas. Asegura tu kit, descarga tu billetera digital y prepárate para pedalear en el circuito más tecnológico y emocionante del año.",
    cta: "Asegurar Mi Campo y Mis Tokens",
  },
  mtbTransition: {
    nature: "Naturaleza",
    adrenaline: "Adrenalina",
    technology: "Tecnología",
  },
  language: {
    en: "English",
    es: "Español",
  },
};

export default es;
