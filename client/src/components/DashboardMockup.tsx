const invoices = [
  { serie: 'F001-0001842', client: 'Andes Distribuciones', amount: 'S/ 4,280', status: 'Emitida' },
  { serie: 'F001-0001841', client: 'Comercial del Sur', amount: 'S/ 1,950', status: 'Pagada' },
  { serie: 'B001-0000927', client: 'Insumos del Valle', amount: 'S/ 630', status: 'Borrador' },
  { serie: 'F001-0001840', client: 'Logística Pacífico', amount: 'S/ 8,120', status: 'Emitida' },
];

const navItems = ['Dashboard', 'Ventas', 'Facturación', 'Productos', 'Inventario', 'Reportes'];

export function DashboardMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-3 rounded-sm bg-[#dce6f0] md:-inset-4" />
      <div className="relative overflow-hidden rounded-sm border border-[#c5d0dc] bg-[#eef2f6] shadow-panel">
        <div className="flex items-center gap-2 border-b border-[#d5dde6] bg-[#f7f9fb] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#d0d7e0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d0d7e0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d0d7e0]" />
          <span className="ml-3 truncate text-[11px] text-ink-muted">NexusERP · Operación comercial</span>
        </div>
        <div className="grid min-h-[340px] grid-cols-[92px_1fr] md:grid-cols-[132px_1fr]">
          <aside className="bg-primary-dark px-2 py-3 text-white md:px-3">
            <p className="mb-4 px-1 text-[10px] font-semibold tracking-[0.16em] text-slate-400">MENÚ</p>
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li
                  key={item}
                  className={
                    index === 0
                      ? 'rounded-sm bg-white/10 px-2 py-1.5 text-[11px] font-medium'
                      : 'px-2 py-1.5 text-[11px] text-slate-300'
                  }
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
          <div className="space-y-3 p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">Hoy</p>
                <p className="text-sm font-semibold">Resumen de operación</p>
              </div>
              <span className="rounded-sm bg-white px-2 py-1 text-[10px] text-ink-muted ring-1 ring-line">
                Periodo: Agosto 2026
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              {[
                ['Ventas del mes', 'S/ 128,430'],
                ['Facturas emitidas', '186'],
                ['Productos activos', '1,042'],
                ['Stock crítico', '14'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-sm bg-white p-2.5 ring-1 ring-line">
                  <p className="text-[10px] text-ink-muted">{label}</p>
                  <p className="mt-1 font-display text-sm font-semibold md:text-base">{value}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-3 lg:grid-cols-[1.4fr_0.8fr]">
              <div className="overflow-hidden rounded-sm bg-white ring-1 ring-line">
                <div className="flex items-center justify-between border-b border-line px-3 py-2">
                  <p className="text-xs font-medium">Comprobantes recientes</p>
                  <span className="text-[10px] text-brand">Ver facturación</span>
                </div>
                <table className="w-full text-left text-[11px]">
                  <thead className="text-ink-muted">
                    <tr className="border-b border-line">
                      <th className="px-3 py-2 font-medium">Documento</th>
                      <th className="hidden px-3 py-2 font-medium sm:table-cell">Cliente</th>
                      <th className="px-3 py-2 font-medium">Importe</th>
                      <th className="px-3 py-2 font-medium">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((row) => (
                      <tr key={row.serie} className="border-b border-line last:border-0">
                        <td className="px-3 py-2 font-medium">{row.serie}</td>
                        <td className="hidden px-3 py-2 text-ink-muted sm:table-cell">{row.client}</td>
                        <td className="px-3 py-2">{row.amount}</td>
                        <td className="px-3 py-2">
                          <span
                            className={
                              row.status === 'Pagada'
                                ? 'text-[#027a48]'
                                : row.status === 'Borrador'
                                  ? 'text-ink-muted'
                                  : 'text-brand'
                            }
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="rounded-sm bg-white p-3 ring-1 ring-line">
                <p className="text-xs font-medium">Ventas por semana</p>
                <div className="mt-4 flex h-28 items-end gap-2">
                  {[42, 58, 51, 73, 66, 84].map((value, index) => (
                    <div key={value} className="flex flex-1 flex-col items-center gap-1">
                      <div
                        className="w-full rounded-sm bg-brand/80"
                        style={{ height: `${value}%`, opacity: 0.45 + index * 0.08 }}
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[10px] text-ink-muted">Comparado con el mes anterior: +12%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
