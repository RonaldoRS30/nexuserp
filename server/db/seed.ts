import mysql from 'mysql2/promise';
import { env } from '../config/env';
import { hashPassword } from '../utils/password';

const modules = [
  { name: 'Facturación', description: 'Emisión de comprobantes y control de documentos electrónicos.', icon: 'receipt', sort_order: 1 },
  { name: 'Productos', description: 'Catálogo de productos y servicios con precios y categorías.', icon: 'package', sort_order: 2 },
  { name: 'Clientes', description: 'Registro comercial de clientes, contactos y condiciones de venta.', icon: 'users', sort_order: 3 },
  { name: 'Ventas', description: 'Pedidos, cotizaciones y seguimiento del ciclo comercial.', icon: 'shopping-cart', sort_order: 4 },
  { name: 'Inventario', description: 'Control de stock, movimientos y alertas de reposición.', icon: 'warehouse', sort_order: 5 },
  { name: 'Compras', description: 'Órdenes de compra y seguimiento a proveedores.', icon: 'clipboard-list', sort_order: 6 },
  { name: 'Logística', description: 'Despachos, guías y trazabilidad de entregas.', icon: 'truck', sort_order: 7 },
  { name: 'Reportes', description: 'Indicadores de operación para la toma de decisiones.', icon: 'bar-chart-3', sort_order: 8 },
  { name: 'Administración', description: 'Parámetros, usuarios internos y configuración del sistema.', icon: 'settings', sort_order: 9 },
];

const plans = [
  {
    name: 'Plan Básico',
    description: 'Punto de partida para emitir comprobantes y registrar la operación comercial diaria.',
    price: 1490,
    featured: false,
    sort_order: 1,
    modules: ['Facturación', 'Productos', 'Clientes', 'Ventas'],
  },
  {
    name: 'Plan Empresarial',
    description: 'Para empresas que necesitan controlar inventario y compras además de la operación comercial.',
    price: 2490,
    featured: true,
    sort_order: 2,
    modules: ['Facturación', 'Productos', 'Clientes', 'Ventas', 'Inventario', 'Compras'],
  },
  {
    name: 'Plan Integral',
    description: 'Cobertura completa de operación, logística, reportes y administración del sistema.',
    price: 3890,
    featured: false,
    sort_order: 3,
    modules: ['Facturación', 'Productos', 'Clientes', 'Ventas', 'Inventario', 'Compras', 'Logística', 'Reportes', 'Administración'],
  },
];

async function seed() {
  const connection = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.name,
    namedPlaceholders: true,
  });

  const [adminRows] = await connection.query<mysql.RowDataPacket[]>(
    'SELECT id FROM admins WHERE email = :email LIMIT 1',
    { email: env.admin.email },
  );

  if (!adminRows.length) {
    const password = await hashPassword(env.admin.password);
    await connection.query(
      'INSERT INTO admins (name, email, password, is_active) VALUES (:name, :email, :password, 1)',
      { name: env.admin.name, email: env.admin.email, password },
    );
    console.log(`Administrador creado: ${env.admin.email}`);
  } else {
    console.log('El administrador inicial ya existe.');
  }

  const [moduleCount] = await connection.query<mysql.RowDataPacket[]>('SELECT COUNT(*) AS total FROM modules');
  if (!moduleCount[0].total) {
    for (const module of modules) {
      await connection.query(
        'INSERT INTO modules (name, description, icon, is_active, sort_order) VALUES (:name, :description, :icon, 1, :sort_order)',
        module,
      );
    }
    console.log('Módulos iniciales creados.');
  }

  const [planCount] = await connection.query<mysql.RowDataPacket[]>('SELECT COUNT(*) AS total FROM plans');
  if (!planCount[0].total) {
    const [moduleRows] = await connection.query<mysql.RowDataPacket[]>('SELECT id, name FROM modules');
    const moduleMap = new Map(moduleRows.map((row) => [row.name as string, row.id as number]));

    for (const plan of plans) {
      const [result] = await connection.query<mysql.ResultSetHeader>(
        `INSERT INTO plans (name, description, price, currency, duration_months, is_active, is_featured, show_price, sort_order)
         VALUES (:name, :description, :price, 'PEN', 12, 1, :featured, 1, :sort_order)`,
        {
          name: plan.name,
          description: plan.description,
          price: plan.price,
          featured: plan.featured ? 1 : 0,
          sort_order: plan.sort_order,
        },
      );

      for (const moduleName of plan.modules) {
        const moduleId = moduleMap.get(moduleName);
        if (moduleId) {
          await connection.query(
            'INSERT INTO plan_modules (plan_id, module_id) VALUES (:planId, :moduleId)',
            { planId: result.insertId, moduleId },
          );
        }
      }
    }
    console.log('Planes iniciales creados.');
  }

  await connection.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id TINYINT UNSIGNED PRIMARY KEY DEFAULT 1,
      company_name VARCHAR(160) NOT NULL DEFAULT 'NexusERP',
      contact_email VARCHAR(180) NULL,
      contact_phone VARCHAR(40) NULL,
      whatsapp_number VARCHAR(40) NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB
  `);

  const [settingsCount] = await connection.query<mysql.RowDataPacket[]>(
    'SELECT COUNT(*) AS total FROM site_settings',
  );
  if (!settingsCount[0].total) {
    await connection.query(
      `INSERT INTO site_settings (id, company_name, contact_email, contact_phone, whatsapp_number)
       VALUES (1, :company_name, :contact_email, :contact_phone, :whatsapp_number)`,
      {
        company_name: env.site.companyName,
        contact_email: env.site.contactEmail || null,
        contact_phone: env.site.contactPhone || null,
        whatsapp_number: env.site.whatsappNumber || null,
      },
    );
    console.log('Configuración inicial del sitio creada.');
  }

  await connection.end();
  console.log('Seed completado.');
}

seed().catch((error) => {
  console.error('No se pudo ejecutar el seed:', error);
  process.exit(1);
});
