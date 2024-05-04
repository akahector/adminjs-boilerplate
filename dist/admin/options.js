import { componentLoader, Components } from './component-loader.js';
import { getModelByName } from '@adminjs/prisma';
import prisma from '../client.js';
import { afterShow, beforeShow } from './actions/userActions/user.show.action.js';
import { afterEdit, beforeEdit } from './actions/userActions/user.edit.action.js';
import { afterList } from './actions/userActions/user.list.action.js';
import uploadFileFeature from '@adminjs/upload';
import CustomTheme from './theme.js';
const localProvider = {
    bucket: 'uploads',
    opts: {
        baseUrl: 'http://localhost:3000/uploads',
    },
};
const options = {
    componentLoader,
    rootPath: '/admin',
    assets: {
        styles: ['/assets/custom.css'],
    },
    branding: {
        companyName: "Tatsat",
        withMadeWithLove: false,
        logo: '/assets/logo.png',
        favicon: '/assets/favicon.png',
        theme: CustomTheme,
    },
    locale: {
        language: 'en',
        translations: {
            en: {
                messages: {
                    loginWelcomeHeader: "Hola"
                },
                buttons: {
                    Login: "Komentarze",
                },
                resources: {
                    Login: {
                        properties: {
                            name: "Nazwa Komentarza",
                            content: "Zawartość",
                        },
                        actions: {
                            new: 'Create new Comment'
                        }
                    }
                }
            }
        }
    },
    dashboard: {
        component: Components.dashboard
    },
    databases: [],
    resources: [{
            resource: { model: getModelByName('User'), client: prisma },
            options: {
                actions: {
                    show: {
                        before: beforeShow,
                        after: afterShow
                    },
                    edit: {
                        before: beforeEdit,
                        after: afterEdit,
                    },
                    list: {
                        after: afterList,
                    },
                },
                properties: {
                    password: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: false,
                            edit: true,
                        },
                    },
                },
            },
        }, {
            resource: { model: getModelByName('Product'), client: prisma },
            options: {
                listProperties: ['name', 'category', 'subCategory', 'image', 'gallery', 'description', 'createdAt', 'updatedAt'],
            },
            features: [
                uploadFileFeature({
                    componentLoader,
                    provider: {
                        local: localProvider,
                    },
                    properties: {
                        key: `image`,
                        mimeType: `/image.mimeType`,
                        bucket: `/image.bucket`,
                        filename: `/image.filename`,
                        file: `/image.file`,
                        filePath: `/image.filePath`,
                        filesToDelete: `/image.filesToDelete`,
                    },
                    validation: {
                        mimeTypes: ['image/jpeg', 'image/png'],
                        maxSize: 5000000
                    },
                    uploadPath: (record, filename) => (`${record.id()}/image/${filename}_${Date.now()}`),
                }),
                uploadFileFeature({
                    componentLoader,
                    provider: {
                        local: localProvider
                    },
                    properties: {
                        key: `gallery.path`,
                        mimeType: `gallery.mimeType`,
                        bucket: `gallery.bucket`,
                        filename: `gallery.filename`,
                        file: `gallery.file`,
                        filePath: `gallery.filePath`,
                        filesToDelete: `gallery.filesToDelete`,
                    },
                    validation: {
                        mimeTypes: ['image/jpeg', 'image/png'],
                        maxSize: 5000000
                    },
                    multiple: true,
                    uploadPath: (record, filename) => (`${record.id()}/gallery/${filename}_${Date.now()}`),
                })
            ]
        }, {
            resource: { model: getModelByName('Category'), client: prisma },
            options: {
                listProperties: ['name', 'icon', 'createdAt', 'updatedAt'],
            },
            features: [
                uploadFileFeature({
                    componentLoader,
                    provider: {
                        local: localProvider,
                    },
                    properties: {
                        key: `icon`,
                        mimeType: `icon.mimeType`,
                        bucket: `icon.bucket`,
                        filename: `icon.filename`,
                        file: `icon.file`,
                        filePath: `/icon.filePath`,
                        filesToDelete: `icon.filesToDelete`,
                    },
                    validation: {
                        mimeTypes: ['image/jpeg', 'image/png'],
                        maxSize: 5000000
                    },
                    uploadPath: (record, filename) => (`${record.id()}/icon/${filename}_${Date.now()}`),
                }),
            ]
        },
        {
            resource: { model: getModelByName('SubCategory'), client: prisma },
            options: {
                listProperties: ['name', 'category', 'icon', 'createdAt', 'updatedAt'],
            },
            features: [
                uploadFileFeature({
                    componentLoader,
                    provider: {
                        local: localProvider,
                    },
                    properties: {
                        key: `icon`,
                        mimeType: `icon.mimeType`,
                        bucket: `icon.bucket`,
                        filename: `icon.filename`,
                        file: `icon.file`,
                        filePath: `/icon.filePath`,
                        filesToDelete: `icon.filesToDelete`,
                    },
                    validation: {
                        mimeTypes: ['image/jpeg', 'image/png'],
                        maxSize: 5000000
                    },
                    uploadPath: (record, filename) => (`${record.id()}/icon/${filename}_${Date.now()}`),
                }),
            ]
        },
        {
            resource: { model: getModelByName('Inquiry'), client: prisma },
            options: {},
        },
    ],
};
export default options;
