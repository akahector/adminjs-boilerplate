import { ComponentLoader } from 'adminjs';
const componentLoader = new ComponentLoader();
const Components = {
    dashboard: componentLoader.add('Dashboard', '../components/Dashboard'),
};
export { componentLoader, Components };
