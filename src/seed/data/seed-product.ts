import * as bcrypt from 'bcrypt';
interface SeedProduct {
  name: string;
  description: string;
  images: string[];
  stock: number;
  price: number;
  slug: string;
  sku: string;
}

interface SeedUser {
  name: string;
  email: string;
  password: string;
  roles: string[];
  username: string;
  isActive: boolean;
}

interface SeedData {
  users: SeedUser[];
  products: SeedProduct[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'admin@magiclog.com',
      name: 'Admin',
      password: bcrypt.hashSync('admin', 10),
      roles: ['admin'],
      username: 'admin',
      isActive: true,
    },
    {
      email: 'user1@magiclog.com',
      name: 'user1',
      password: bcrypt.hashSync('user1', 10),
      roles: ['user'],
      username: 'user1',
      isActive: true,
    },
    {
      email: 'user2@magiclog.com',
      name: 'user2',
      password: bcrypt.hashSync('user2', 10),
      roles: ['user'],
      username: 'user2',
      isActive: true,
    },
    {
      email: 'user3@magiclog.com',
      name: 'user3',
      password: bcrypt.hashSync('user3', 10),
      roles: ['user'],
      username: 'user3',
      isActive: true,
    },
  ],
  products: [
    {
      sku: 'TECH-1001',
      name: 'Smartwatch Fitness Tracker X1',
      description:
        'El Smartwatch Fitness Tracker X1 está diseñado para llevar un seguimiento avanzado de tu salud y actividad física. Incluye medición de frecuencia cardíaca, sueño, GPS y notificaciones inteligentes.',
      price: 99.99,
      stock: 200,
      slug: 'smartwatch_fitness_tracker_x1',
      images: [
        'https://picsum.photos/600/600?random=1 ',
        'https://picsum.photos/600/600?random=2 ',
      ],
    },
    {
      sku: 'TECH-1002',
      name: 'Auriculares Inalámbricos Bluetooth Pro',
      description:
        'Auriculares inalámbricos con cancelación activa de ruido, 30 horas de batería y sonido envolvente. Diseñados para comodidad durante largas sesiones y compatibles con asistentes como Alexa o Google Assistant.',
      price: 149.99,
      stock: 180,
      slug: 'auriculares_inalambricos_bluetooth_pro',
      images: [
        'https://picsum.photos/600/600?random=3 ',
        'https://picsum.photos/600/600?random=4 ',
      ],
    },
    {
      sku: 'TECH-1003',
      name: 'Laptop Gamer RTX 4060 i7 16GB RAM',
      description:
        'Laptop potente para juegos y edición multimedia. Cuenta con procesador Intel Core i7, tarjeta gráfica NVIDIA RTX 4060, 16 GB de memoria RAM y almacenamiento SSD de 1 TB.',
      price: 1399.99,
      stock: 50,
      slug: 'laptop_gamer_rtx_4060_i7_16gb_ram',
      images: [
        'https://picsum.photos/600/600?random=5 ',
        'https://picsum.photos/600/600?random=6 ',
      ],
    },
    {
      sku: 'TECH-1004',
      name: 'Altavoz Inteligente con Asistente IA',
      description:
        'Altavoz inteligente con control por voz, compatible con asistentes como Alexa, Google Assistant y Siri. Reproduce música, controla dispositivos del hogar y responde preguntas en tiempo real.',
      price: 79.99,
      stock: 250,
      slug: 'altavoz_inteligente_con_asistente_ia',
      images: [
        'https://picsum.photos/600/600?random=7 ',
        'https://picsum.photos/600/600?random=8 ',
      ],
    },
    {
      sku: 'TECH-1005',
      name: 'Cámara de Seguridad IP Exterior HD',
      description:
        'Cámara de seguridad resistente al agua con visión nocturna, detección de movimiento y transmisión en vivo. Ideal para vigilancia residencial o comercial mediante conexión Wi-Fi.',
      price: 59.99,
      stock: 120,
      slug: 'camara_de_seguridad_ip_exterior_hd',
      images: [
        'https://picsum.photos/600/600?random=9 ',
        'https://picsum.photos/600/600?random=10 ',
      ],
    },
    {
      sku: 'TECH-1006',
      name: 'Tablet Android 10 Pulgadas 128GB',
      description:
        'Tablet de alta definición con pantalla de 10 pulgadas, 128 GB de almacenamiento y sistema operativo Android. Ideal para trabajo, estudio y entretenimiento multimedia.',
      price: 299.99,
      stock: 90,
      slug: 'tablet_android_10_pulgadas_128gb',
      images: [
        'https://picsum.photos/600/600?random=11 ',
        'https://picsum.photos/600/600?random=12 ',
      ],
    },
    {
      sku: 'TECH-1007',
      name: 'Teclado Mecánico RGB Gaming',
      description:
        'Teclado mecánico retroiluminado RGB con interruptores azules, ideal para juegos y escritura precisa. Incluye reposamuñecas ergonómico y cable USB desmontable.',
      price: 89.99,
      stock: 150,
      slug: 'teclado_mecanico_rgb_gaming',
      images: [
        'https://picsum.photos/600/600?random=13 ',
        'https://picsum.photos/600/600?random=14 ',
      ],
    },
    {
      sku: 'TECH-1008',
      name: 'Ratón Inalámbrico Ergonómico',
      description:
        'Ratón inalámbrico ergonómico con sensores ópticos ajustables y diseño cómodo para uso prolongado. Compatible con múltiples sistemas operativos y superficies.',
      price: 29.99,
      stock: 300,
      slug: 'raton_inalambrico_ergonomico',
      images: [
        'https://picsum.photos/600/600?random=15 ',
        'https://picsum.photos/600/600?random=16 ',
      ],
    },
    {
      sku: 'TECH-1009',
      name: 'Cargador Rápido USB-C 30W',
      description:
        'Cargador rápido USB-C de 30W, compatible con smartphones, tablets y laptops. Diseño compacto y protección contra sobrecarga y sobrecalentamiento.',
      price: 19.99,
      stock: 500,
      slug: 'cargador_rapido_usb_c_30w',
      images: [
        'https://picsum.photos/600/600?random=17 ',
        'https://picsum.photos/600/600?random=18 ',
      ],
    },
    {
      sku: 'TECH-1010',
      name: 'Batería Externa 20000mAh Dual USB',
      description:
        'Power Bank de 20000mAh con dos puertos USB para cargar dos dispositivos simultáneamente. Ideal para viajes y uso diario con carga rápida y diseño compacto.',
      price: 39.99,
      stock: 200,
      slug: 'bateria_externa_20000mah_dual_usb',
      images: [
        'https://picsum.photos/600/600?random=19 ',
        'https://picsum.photos/600/600?random=20 ',
      ],
    },
    {
      sku: 'TECH-1011',
      name: 'Monitor Curvo 27 Pulgadas Full HD',
      description:
        'Monitor curvo de 27 pulgadas con resolución Full HD, ideal para gaming y productividad. Ángulo de visión amplio y tecnología antideslumbrante.',
      price: 199.99,
      stock: 70,
      slug: 'monitor_curvo_27_pulgadas_full_hd',
      images: [
        'https://picsum.photos/600/600?random=21 ',
        'https://picsum.photos/600/600?random=22 ',
      ],
    },
    {
      sku: 'TECH-1012',
      name: 'Router WiFi 6 Dual Band Gigabit',
      description:
        'Router WiFi 6 de doble banda con velocidades hasta 1800 Mbps, 4 puertos LAN gigabit y soporte para múltiples dispositivos conectados simultáneamente.',
      price: 129.99,
      stock: 60,
      slug: 'router_wifi_6_dual_band_gigabit',
      images: [
        'https://picsum.photos/600/600?random=23 ',
        'https://picsum.photos/600/600?random=24 ',
      ],
    },
    {
      sku: 'TECH-1013',
      name: 'Impresora Multifuncional Laser Color',
      description:
        'Impresora láser multifuncional a color con escaneo, copiado e impresión dúplex automática. Velocidad de hasta 25 páginas por minuto y conexión USB/WiFi.',
      price: 399.99,
      stock: 40,
      slug: 'impresora_multifuncional_laser_color',
      images: [
        'https://picsum.photos/600/600?random=25 ',
        'https://picsum.photos/600/600?random=26 ',
      ],
    },
    {
      sku: 'TECH-1014',
      name: 'Micrófono Condensador Estudio',
      description:
        'Micrófono condensador profesional con patrón cardioide, ideal para grabaciones de estudio, podcasting o streaming. Incluye soporte anti-vibración y filtro pop.',
      price: 149.99,
      stock: 80,
      slug: 'microfono_condensador_estudio',
      images: [
        'https://picsum.photos/600/600?random=27 ',
        'https://picsum.photos/600/600?random=28 ',
      ],
    },
    {
      sku: 'TECH-1015',
      name: 'Proyector HD 1080P Portátil',
      description:
        'Proyector portátil Full HD con resolución nativa 1080p, ideal para cine en casa, presentaciones o camping. Conectividad HDMI, USB y altavoces integrados.',
      price: 299.99,
      stock: 30,
      slug: 'proyector_hd_1080p_portatil',
      images: [
        'https://picsum.photos/600/600?random=29 ',
        'https://picsum.photos/600/600?random=30 ',
      ],
    },
    {
      sku: 'TECH-1016',
      name: 'Disco Duro Externo SSD 1TB',
      description:
        'Disco duro externo SSD de 1TB con puerto USB-C y velocidades de hasta 1000MB/s. Diseño ultradelgado y resistente a golpes para transporte seguro.',
      price: 119.99,
      stock: 100,
      slug: 'disco_duro_externo_ssd_1tb',
      images: [
        'https://picsum.photos/600/600?random=31 ',
        'https://picsum.photos/600/600?random=32 ',
      ],
    },
    {
      sku: 'TECH-1017',
      name: 'WebCam Full HD 1080p',
      description:
        'Cámara web Full HD 1080p con micrófonos estéreo integrados, ideal para videollamadas, conferencias o streaming. Montaje universal para monitor o laptop.',
      price: 49.99,
      stock: 150,
      slug: 'webcam_full_hd_1080p',
      images: [
        'https://picsum.photos/600/600?random=33 ',
        'https://picsum.photos/600/600?random=34 ',
      ],
    },
    {
      sku: 'TECH-1018',
      name: 'Smart TV Stick 4K con Control por Voz',
      description:
        'Stick de streaming con salida 4K Ultra HD, compatible con aplicaciones como Netflix, YouTube, Disney+ y soporte para Alexa o Google Assistant.',
      price: 49.99,
      stock: 200,
      slug: 'smart_tv_stick_4k_control_por_voz',
      images: [
        'https://picsum.photos/600/600?random=35 ',
        'https://picsum.photos/600/600?random=36 ',
      ],
    },
    {
      sku: 'TECH-1019',
      name: 'Mando Xbox One Inalámbrico',
      description:
        'Mando inalámbrico oficial para Xbox One con botones mejorados, vibración háptica y latencia reducida. Compatible con PC y consolas Xbox Series.',
      price: 59.99,
      stock: 100,
      slug: 'mando_xbox_one_inalambrico',
      images: [
        'https://picsum.photos/600/600?random=37 ',
        'https://picsum.photos/600/600?random=38 ',
      ],
    },
    {
      sku: 'TECH-1020',
      name: 'Joystick Arcade USB Retrocompatible',
      description:
        'Joystick arcade clásico con conexión USB y retrocompatibilidad con múltiples plataformas. Ideal para juegos retro o simuladores de combate.',
      price: 39.99,
      stock: 120,
      slug: 'joystick_arcade_usb_retrocompatible',
      images: [
        'https://picsum.photos/600/600?random=39 ',
        'https://picsum.photos/600/600?random=40 ',
      ],
    },
    {
      sku: 'TECH-1021',
      name: 'Cámara Web 4K Streaming',
      description:
        'Cámara web profesional con resolución 4K UHD, autoenfoque, corrección de luz ambiental y micrófonos duales integrados para streaming o reuniones virtuales.',
      price: 129.99,
      stock: 60,
      slug: 'camara_web_4k_streaming',
      images: [
        'https://picsum.photos/600/600?random=41 ',
        'https://picsum.photos/600/600?random=42 ',
      ],
    },
    {
      sku: 'TECH-1022',
      name: 'Placa Base AMD AM4 MicroATX',
      description:
        'Placa base MicroATX compatible con procesadores Ryzen AM4, soporta DDR4, PCIe 4.0, M.2 NVMe y múltiples puertos USB 3.2 Gen2.',
      price: 149.99,
      stock: 40,
      slug: 'placa_base_amd_am4_microatx',
      images: [
        'https://picsum.photos/600/600?random=43 ',
        'https://picsum.photos/600/600?random=44 ',
      ],
    },
    {
      sku: 'TECH-1023',
      name: 'Memoria RAM DDR4 16GB 3200MHz',
      description:
        'Módulo de memoria RAM DDR4 de 16GB a 3200MHz, ideal para gaming y multitarea. Diseño sin buffer y bajo voltaje para mayor eficiencia energética.',
      price: 69.99,
      stock: 200,
      slug: 'memoria_ram_ddr4_16gb_3200mhz',
      images: [
        'https://picsum.photos/600/600?random=45 ',
        'https://picsum.photos/600/600?random=46 ',
      ],
    },
    {
      sku: 'TECH-1024',
      name: 'Fuente de Alimentación 650W Modular',
      description:
        'Fuente de alimentación modular de 650W certificada 80 Plus Bronze, con cables planos y ventilación silenciosa. Compatible con placas ATX y sistemas gaming.',
      price: 89.99,
      stock: 90,
      slug: 'fuente_de_alimentacion_650w_modular',
      images: [
        'https://picsum.photos/600/600?random=47 ',
        'https://picsum.photos/600/600?random=48 ',
      ],
    },
    {
      sku: 'TECH-1025',
      name: 'Gabinete Gaming ATX con Ventilación',
      description:
        'Gabinete gamer ATX con ventanas laterales de cristal templado, espacio para radiadores de líquido y múltiples ventiladores preinstalados para refrigeración avanzada.',
      price: 99.99,
      stock: 50,
      slug: 'gabinete_gaming_atx_con_ventilacion',
      images: [
        'https://picsum.photos/600/600?random=49 ',
        'https://picsum.photos/600/600?random=50 ',
      ],
    },
  ],
};
