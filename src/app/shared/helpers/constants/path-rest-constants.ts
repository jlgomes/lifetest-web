/**
 * Global constants for system routes, services, and modules.
 *
 */

export const appRoutes = {
  LOGIN: 'login',
  FORGOT_PASSWORD: 'forgot-password',
  CHANGE_PASSWORD: 'change-password',
  ACTIVATE_USER: 'activate-user',
  CONTROL_PANEL: 'control-panel',
  DASHBOARD: 'dashboard',
  REGISTERS: 'registers',
  REPORTS: 'reports',
  USERS: 'users',
  CLIENTS: 'clients',
  PROFILES: 'profiles',
  CUSTOMERS: 'customers',
  PRODUCTS: 'products',
  TESTS: 'tests',
  CONTROL: 'control',
  NOTIFICATIONS: 'notifications',
  REPAIR: 'repair',
  EVENT: 'event',
  MAINTENANCE: 'maintenance',
  RACK_CONFIGURATION: 'rack-configuration',
};

export const testsRoutes = {
  TEST_REGISTRATION: 'tests/registration',
  TEST_READING: 'tests/registration/reading',
  TEST_FINISH: 'tests/finish',
};

export const repairRoutes = {
  REGISTRATION: 'registration',
};

export const statsRoutes = {
  DETAILED_VIEW: 'detailed-view',
};

export const reportRoutes = {
  TOTAL_ERRORS: 'total-errors',
  RECURRING_ERRORS: 'recurring-errors',
  TOTAL_TESTS: 'total-tests',
  TELEMETRY: 'telemetry',
};

export const registerRoutes = {
  TELEMETRIES: 'telemetries',
};

export const maintenanceRoutes = {
  DASHBOARD: 'dashboard',
  REGISTERS: 'registers',
};

// API Routes
export const PAGEABLE = 'pageable';
export const LOGIN = 'authentication/login';
export const AUTHENTICATION = 'authentication';
export const USERS = 'users';
export const PROFILES = 'profiles';
export const PRODUCTS = 'products';
export const SLOTS = 'slots';
export const STATS = 'stats';
export const TELEMETRIES = 'telemetries';
export const LED_TELEMETRIES = 'led-telemetries';
export const PING_TELEMETRIES = 'ping-telemetries';
export const TESTS = 'tests';
export const CLIENTS = 'clients';
export const MEDIA = 'media';
export const NOTIFICATION = 'notifications';
export const LOG_EVENT = 'log-event';
export const MENU = 'menus';
export const REPAIRS = 'repairs';
export const MAINTENANCES = 'maintenances';
export const RACKS = 'racks';
export const VOLTAGES = 'rackvoltages';
export const MARK_AS_READ = 'mark-as-read';

export const REPORTS = 'reports/';
// Dashboard
export const MOST_TESTED_MODELS = REPORTS + 'most-tested-models';
export const LED_PING_ERRORS = REPORTS + 'led-ping-errors';
// Test Reports
export const TOTAL_PRODUCTS_TESTED = REPORTS + 'total-products-tested'
export const TOTAL_FAILURES_PER_PRODUCT = REPORTS + 'total-failures-per-product'
export const TOTAL_FAILURES_PER_TYPE = REPORTS + 'total-failures-per-type'
export const TOTAL_FAILURES_DETAILED = REPORTS + 'total-failures-detailed'
export const HOURS_EXECUTED_PER_PRODUCT = REPORTS + 'hours-executed-per-product'
// Maintenance Reports
export const AVERAGE_RACK_TEMPERATURE = REPORTS + 'average-rack-temperature'
export const POWER_CYCLE_QUANTITY = REPORTS + 'power-cycle-quantity'
export const MAINTENANCES_PER_TYPE = REPORTS + 'maintenances-per-type'
export const MAINTENANCES_PER_SLOT = REPORTS + 'maintenances-per-slot'
