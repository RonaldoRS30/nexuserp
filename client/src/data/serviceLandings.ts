import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  Boxes,
  Cable,
  ClipboardList,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  History,
  Layers,
  LifeBuoy,
  PackageSearch,
  Receipt,
  ScanBarcode,
  ShieldCheck,
  ShoppingCart,
  Users,
  Wallet,
  Warehouse,
  Workflow,
} from 'lucide-react';
import { images } from '../assets/images';

export interface ServiceLanding {
  path: string;
  eyebrow: string;
  heading: string;
  intro: string;
  image: string;
  imageAlt: string;
  featuresTitle: string;
  features: { icon: LucideIcon; title: string; text: string }[];
  audienceTitle: string;
  audience: string[];
  faqs: { question: string; answer: string }[];
}

export const serviceLandings: Record<string, ServiceLanding> = {
  '/facturacion-electronica': {
    path: '/facturacion-electronica',
    eyebrow: 'Facturación electrónica',
    heading: 'Sistema de facturación electrónica para empresas',
    intro:
      'Emite facturas, boletas y notas de crédito o débito desde un solo sistema, controla tus series y revisa el estado de cada comprobante sin depender de hojas de cálculo.',
    image: images.facturacion,
    imageAlt: 'Emisión de comprobantes electrónicos desde el sistema de facturación',
    featuresTitle: 'Todo lo que necesitas para facturar sin errores',
    features: [
      {
        icon: Receipt,
        title: 'Comprobantes electrónicos',
        text: 'Facturas, boletas, notas de crédito y notas de débito generadas con los datos del cliente y del producto ya registrados.',
      },
      {
        icon: ClipboardList,
        title: 'Control de series',
        text: 'Series y correlativos por punto de emisión, sin saltos ni duplicados entre cajas o sucursales.',
      },
      {
        icon: FileCheck2,
        title: 'Estado de cada documento',
        text: 'Consulta qué comprobantes están emitidos, anulados o pendientes y actúa antes de que se acumulen.',
      },
      {
        icon: History,
        title: 'Historial por cliente',
        text: 'Revisa todo lo facturado a cada cliente, con sus montos, fechas y documentos relacionados.',
      },
      {
        icon: FileSpreadsheet,
        title: 'Exportación contable',
        text: 'Descarga reportes de ventas y comprobantes listos para tu contador, sin volver a digitar información.',
      },
      {
        icon: Cable,
        title: 'Integración con tu operación',
        text: 'La facturación se conecta con ventas, punto de venta e inventario para que cada venta quede registrada una sola vez.',
      },
    ],
    audienceTitle: 'Pensado para empresas que',
    audience: [
      'Emiten muchos comprobantes al día y necesitan rapidez en caja o en oficina.',
      'Tienen varias sucursales o puntos de emisión con series propias.',
      'Quieren dejar de copiar datos entre el sistema de ventas y la facturación.',
      'Necesitan reportes claros para su área contable.',
    ],
    faqs: [
      {
        question: '¿Qué comprobantes puedo emitir con el sistema?',
        answer:
          'Facturas, boletas de venta, notas de crédito y notas de débito. Si tu operación necesita otros documentos, los evaluamos dentro del alcance del proyecto.',
      },
      {
        question: '¿Puedo usar la facturación junto con el control de inventario?',
        answer:
          'Sí. Al emitir un comprobante desde una venta, el stock de los productos se descuenta automáticamente si tienes activo el módulo de inventario.',
      },
      {
        question: '¿El sistema se adapta a la forma en que ya facturo?',
        answer:
          'Sí. Antes de implementar revisamos tus documentos, series y flujo de aprobación para configurar el sistema según tu operación.',
      },
      {
        question: '¿Incluye capacitación y soporte?',
        answer:
          'Sí. Capacitamos a tu equipo durante la puesta en marcha y te acompañamos después con soporte, correcciones y ajustes.',
      },
    ],
  },
  '/sistema-de-inventario': {
    path: '/sistema-de-inventario',
    eyebrow: 'Inventario y almacén',
    heading: 'Sistema de inventario y control de almacén',
    intro:
      'Conoce en tiempo real cuánto stock tienes, dónde está y cómo se mueve. Registra entradas, salidas y transferencias entre almacenes con trazabilidad por producto.',
    image: images.inventario,
    imageAlt: 'Control de stock e inventario en almacén con el sistema',
    featuresTitle: 'Control total de tu stock',
    features: [
      {
        icon: Boxes,
        title: 'Stock en tiempo real',
        text: 'Cada venta, compra o ajuste actualiza el stock al momento, por producto y por almacén.',
      },
      {
        icon: ArrowLeftRight,
        title: 'Entradas, salidas y transferencias',
        text: 'Registra movimientos entre almacenes o sucursales con responsable, fecha y motivo.',
      },
      {
        icon: Bell,
        title: 'Alertas de stock mínimo',
        text: 'Recibe avisos cuando un producto llega a su stock mínimo para reponer a tiempo.',
      },
      {
        icon: History,
        title: 'Kardex por producto',
        text: 'Historial completo de movimientos de cada producto para auditar diferencias.',
      },
      {
        icon: PackageSearch,
        title: 'Catálogo de productos',
        text: 'Productos con códigos, categorías, unidades de medida y precios organizados en un solo lugar.',
      },
      {
        icon: BarChart3,
        title: 'Reportes de inventario',
        text: 'Valorización, rotación y productos sin movimiento para decidir qué comprar y qué liquidar.',
      },
    ],
    audienceTitle: 'Ideal para negocios que',
    audience: [
      'Manejan uno o varios almacenes y necesitan saber qué hay en cada uno.',
      'Pierden ventas por quiebres de stock o acumulan productos sin rotación.',
      'Hacen inventarios físicos que nunca cuadran con el sistema.',
      'Quieren conectar el inventario con ventas, compras y despacho.',
    ],
    faqs: [
      {
        question: '¿Puedo controlar varios almacenes o sucursales?',
        answer:
          'Sí. El sistema maneja stock por almacén y permite transferencias entre ellos con su respectivo registro.',
      },
      {
        question: '¿El stock se actualiza solo cuando vendo?',
        answer:
          'Sí. Si usas el punto de venta o la facturación del sistema, cada venta descuenta el stock automáticamente.',
      },
      {
        question: '¿Puedo cargar mi inventario actual al empezar?',
        answer:
          'Sí. Durante la puesta en marcha te ayudamos a cargar tus productos y saldos iniciales desde tus archivos actuales.',
      },
      {
        question: '¿Se puede adaptar a procesos especiales de mi almacén?',
        answer:
          'Sí. Si tu operación usa lotes, ubicaciones u otros controles, los evaluamos y desarrollamos a medida.',
      },
    ],
  },
  '/punto-de-venta': {
    path: '/punto-de-venta',
    eyebrow: 'Punto de venta',
    heading: 'Sistema de punto de venta (POS) para tu negocio',
    intro:
      'Atiende más rápido en caja, emite el comprobante al instante y deja que el sistema descuente el stock y registre el cobro. Ideal para tiendas, minimarkets y distribuidoras.',
    image: images.market,
    imageAlt: 'Venta en caja con sistema de punto de venta en un minimarket',
    featuresTitle: 'Vende rápido y con control',
    features: [
      {
        icon: ScanBarcode,
        title: 'Venta ágil en caja',
        text: 'Busca productos por nombre o código de barras y registra la venta en pocos pasos.',
      },
      {
        icon: FileText,
        title: 'Comprobante al instante',
        text: 'Emite boleta o factura en el mismo momento de la venta, conectado a la facturación electrónica.',
      },
      {
        icon: Wallet,
        title: 'Apertura y cierre de caja',
        text: 'Controla ingresos por medio de pago y cuadra la caja al final de cada turno.',
      },
      {
        icon: Boxes,
        title: 'Stock sincronizado',
        text: 'Cada venta descuenta el inventario automáticamente, sin conteos manuales.',
      },
      {
        icon: Users,
        title: 'Usuarios y permisos',
        text: 'Cada cajero entra con su usuario y solo ve las funciones que le corresponden.',
      },
      {
        icon: BarChart3,
        title: 'Reportes de ventas',
        text: 'Ventas por día, por cajero y por producto para saber qué se vende y cuándo.',
      },
    ],
    audienceTitle: 'Hecho para',
    audience: [
      'Tiendas y minimarkets con alto movimiento en caja.',
      'Distribuidoras que venden en mostrador y necesitan emitir comprobantes al momento.',
      'Negocios con varias cajas o turnos que necesitan cuadrar cada uno.',
      'Empresas que quieren unir ventas, facturación e inventario en un solo sistema.',
    ],
    faqs: [
      {
        question: '¿El punto de venta emite comprobantes electrónicos?',
        answer:
          'Sí. El POS está conectado al módulo de facturación, así que puedes emitir boleta o factura en el mismo momento de la venta.',
      },
      {
        question: '¿Puedo usar lector de código de barras?',
        answer: 'Sí. Puedes buscar y agregar productos a la venta escaneando su código de barras.',
      },
      {
        question: '¿Funciona con varias cajas al mismo tiempo?',
        answer:
          'Sí. Cada caja trabaja con su usuario, su serie y su propio cierre, y todo se consolida en los reportes.',
      },
      {
        question: '¿Necesito comprar equipos especiales?',
        answer:
          'El sistema funciona desde el navegador. Te orientamos sobre impresoras y lectores compatibles según tu negocio.',
      },
    ],
  },
  '/software-a-medida': {
    path: '/software-a-medida',
    eyebrow: 'Software a medida',
    heading: 'Desarrollo de software a medida para empresas',
    intro:
      'Cuando una plantilla genérica no encaja con tu operación, construimos el sistema alrededor de tus procesos reales: con tus pantallas, tus reglas y el lenguaje de tu equipo.',
    image: images.sistema,
    imageAlt: 'Equipo trabajando con un sistema empresarial desarrollado a medida',
    featuresTitle: 'Un sistema que se adapta a tu empresa, no al revés',
    features: [
      {
        icon: Workflow,
        title: 'Flujos propios',
        text: 'Modelamos aprobaciones, estados y validaciones tal como funcionan hoy en tu empresa.',
      },
      {
        icon: Layers,
        title: 'Módulos combinables',
        text: 'Partimos de módulos probados (ventas, facturación, inventario) y desarrollamos solo lo que falta.',
      },
      {
        icon: Cable,
        title: 'Integración de sistemas',
        text: 'Conectamos con herramientas que ya usas: contabilidad, pasarelas de pago, APIs o archivos.',
      },
      {
        icon: ShieldCheck,
        title: 'Acceso por roles',
        text: 'Cada usuario ve y hace solo lo que le corresponde, con registro de quién hizo qué.',
      },
      {
        icon: Warehouse,
        title: 'Arquitectura escalable',
        text: 'Un sistema preparado para crecer con más usuarios, sucursales y procesos.',
      },
      {
        icon: LifeBuoy,
        title: 'Soporte continuo',
        text: 'Después de la puesta en marcha seguimos con correcciones, ajustes y nuevas funciones.',
      },
    ],
    audienceTitle: 'Te conviene si',
    audience: [
      'Tu proceso es particular y los sistemas de mercado te obligan a cambiarlo.',
      'Hoy trabajas con varias hojas de cálculo que nadie más entiende.',
      'Necesitas conectar áreas (ventas, almacén, despacho) que hoy no se hablan.',
      'Quieres un sistema propio que puedas seguir mejorando con el tiempo.',
    ],
    faqs: [
      {
        question: '¿Cómo empieza un proyecto de software a medida?',
        answer:
          'Con un diagnóstico: revisamos tu proceso actual, tus documentos y los cuellos de botella. Con eso preparamos una propuesta de alcance, módulos y tiempos.',
      },
      {
        question: '¿Cuánto cuesta un sistema a medida?',
        answer:
          'Depende del alcance y de los módulos que necesites. Después del diagnóstico te enviamos una cotización detallada sin compromiso.',
      },
      {
        question: '¿Cuánto tiempo toma el desarrollo?',
        answer:
          'Depende del tamaño del proyecto. Trabajamos por etapas para que puedas usar las primeras partes del sistema antes de terminar todo.',
      },
      {
        question: '¿Qué pasa después de la entrega?',
        answer:
          'Te acompañamos con soporte, correcciones y mejoras. El sistema puede seguir creciendo según las necesidades de tu empresa.',
      },
    ],
  },
};

export const serviceLandingLinks = [
  { label: 'Facturación electrónica', to: '/facturacion-electronica', icon: Receipt },
  { label: 'Sistema de inventario', to: '/sistema-de-inventario', icon: Boxes },
  { label: 'Punto de venta', to: '/punto-de-venta', icon: ShoppingCart },
  { label: 'Software a medida', to: '/software-a-medida', icon: Workflow },
];
