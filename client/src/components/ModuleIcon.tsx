import {
  BarChart3,
  ClipboardList,
  Layers,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  Warehouse,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  receipt: Receipt,
  package: Package,
  users: Users,
  'shopping-cart': ShoppingCart,
  warehouse: Warehouse,
  'clipboard-list': ClipboardList,
  truck: Truck,
  'bar-chart-3': BarChart3,
  settings: Settings,
  layers: Layers,
};

export const moduleIconOptions = Object.keys(icons);

interface ModuleIconProps {
  name: string;
  className?: string;
}

export function ModuleIcon({ name, className = 'h-5 w-5' }: ModuleIconProps) {
  const Icon = icons[name] ?? Layers;
  return <Icon className={className} strokeWidth={1.6} />;
}
