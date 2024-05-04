import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
    dashboard: componentLoader.add('Dashboard', '../components/Dashboard'),
    // UploadMultipleFiles: componentLoader.add('UploadMultipleFiles', '../components/UploadMultipleFiles'),
    // other custom components
}

export { componentLoader, Components }
