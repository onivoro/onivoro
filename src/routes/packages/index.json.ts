import { Package, ProjectType } from '@onivoro/isomorphic-onivoro';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<any> = async (_request) => {
    return Promise.resolve({status: 200, headers: {}, body: JSON.stringify([
        new Package('angular-diagrams', ProjectType.ANGULAR_LIB),
        new Package('angular-estructura', ProjectType.ANGULAR_LIB),
        new Package('angular-material-styles', ProjectType.SCSS),
        new Package('angular-serializable-forms', ProjectType.ANGULAR_LIB),
        new Package('angular-track-by-functions', ProjectType.ANGULAR_LIB),
        new Package('browser-layout', ProjectType.SCSS),
        new Package('isomorphic-onivoro', ProjectType.ISOMORPHIC),
        new Package('nodejs-cli-sdk', ProjectType.SERVER_LIB),
        new Package('onivoro', ProjectType.ANGULAR_APP),
        new Package('server-app-vscx', ProjectType.SERVER_LIB),
        new Package('server-build', ProjectType.NESTJS_LIB),
        new Package('server-disk', ProjectType.SERVER_LIB),
        new Package('server-elastic-search', ProjectType.SERVER_LIB),
        new Package('server-event-sourcing', ProjectType.NESTJS_LIB),
        new Package('server-git', ProjectType.SERVER_LIB),
        new Package('server-parameterization', ProjectType.NESTJS_LIB),
        new Package('server-process', ProjectType.SERVER_LIB),
        new Package('server-vscode', ProjectType.SERVER_LIB),
    ], null, 2)});
};

// "@onivoro/nodejs-cli-sdk",
// "@onivoro/server-process",
// "@onivoro/browser-layout",
// "@onivoro/isomorphic-seo",
// "@onivoro/angular-diagrams",
// "@onivoro/isomorphic-onivoro",
// "@onivoro/isomorphic-crud-provider",
// "@onivoro/server-build",
// "@onivoro/angular-track-by",
// "@onivoro/server-parameterization",
// "@onivoro/server-browser",
// "@onivoro/angular-serializable-forms",
// "@onivoro/server-disk",
// "@onivoro/server-app-vscx",
// "@onivoro/isomorphic-try-json",
// "@onivoro/angular-material-styles",
// "@onivoro/server-vscode",
// "@onivoro/server-elastic-search",
// "@onivoro/server-kafka",
// "@onivoro/server-database"
