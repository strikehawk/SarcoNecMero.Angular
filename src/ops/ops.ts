/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />

/// <reference path="./components/site-archeo-list/site-archeo-list.component.ts" />
/// <reference path="./components/site-localisation/site-localisation.component.ts" />
/// <reference path="./components/site-ops-map/site-ops-map.component.ts" />
/// <reference path="./components/site-operations/site-operations.component.ts" />

module snm.ops {
    import DbContext = snm.services.dal.DbContext;

    angular.module(snm.AppConstants.OPS_MODULE_NAME, [
        "snm.services.dal.dbContext",
        "snm.ops.components.siteArcheoList",
        "snm.ops.components.siteLocalisation",
        "snm.ops.components.siteOperations",
    ])
}