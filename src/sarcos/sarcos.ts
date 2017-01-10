/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="./components/panneaux-site-list/panneaux-site-list.component.ts" />

module snm.sarcos {
    angular.module(snm.AppConstants.SARCOS_MODULE_NAME, [
        "snm.sarcos.components.panneauxSiteList"
    ]);
}