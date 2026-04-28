// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\config\appMode.js
export const APP_MODE = {
  isDemo:
    process.env.REACT_APP_DEMO_MODE === "true" ||
    process.env.REACT_APP_DEMO_MODE === undefined,

  isProductionClient: process.env.REACT_APP_DEMO_MODE === "false",

  demoCompanyName: "Propel Properties Demo",

  demoLockMessage:
    "This action is disabled in demo mode. Full functionality is activated after community onboarding.",
};