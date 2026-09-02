import { countActiveModules } from '../models/Module';
import { countActivePlans } from '../models/Plan';
import { countContacts } from '../models/Contact';

export async function getDashboardStats() {
  const [activePlans, activeModules, contacts] = await Promise.all([
    countActivePlans(),
    countActiveModules(),
    countContacts(),
  ]);

  return {
    activePlans,
    activeModules,
    contacts,
  };
}
