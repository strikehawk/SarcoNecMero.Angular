/// <reference path="../typings/angular/angular.d.ts" />
/// <reference path="../typings/angular/angular-route.d.ts" />
/// <reference path="../typings/angular-material/angular-material.d.ts" />
/// <reference path="components/components.ts" />
/// <reference path="maps/maps.ts" />
/// <reference path="pages/pages.ts" />
/// <reference path="services/services.ts" />
/// <reference path="ops/ops.ts" />
/// <reference path="chrono/chrono.ts" />
/// <reference path="pers/pers.ts" />

/// <reference path="services/settings/user-settings.ts" />

class Bootstrap {
    public static initialize(): void {
        angular.module(snm.AppConstants.CORE_MODULE_NAME, [
                snm.AppConstants.COMPONENTS_MODULE_NAME,
                snm.AppConstants.MAPS_MODULE_NAME,
                snm.AppConstants.PAGES_MODULE_NAME,
                snm.AppConstants.SERVICES_MODULE_NAME,
                snm.AppConstants.CHRONO_MODULE_NAME,
                snm.AppConstants.OPS_MODULE_NAME,
                snm.AppConstants.PERS_MODULE_NAME,
                "ngRoute",
                "ngMaterial",
                "ngMessages"
            ])
            .config(Bootstrap._configureRoutes)
            .config(function ($mdThemingProvider) {
                // Configure a dark theme with primary foreground yellow
                $mdThemingProvider.theme('docs-dark', 'default')
                    .primaryPalette('yellow')
                    .dark();

            });

        angular.element(document).ready(() => {
            let initInjector: angular.auto.IInjectorService = angular.injector(["ng"]);
            let $http: ng.IHttpService = initInjector.get<ng.IHttpService>("$http");
            snm.services.settings.UserSettings.fetchSettings($http)
                .then(() => {
                    angular.bootstrap(document, [snm.AppConstants.CORE_MODULE_NAME]);
                });
        });
    }

    private static _configureRoutes($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider

        // route for the home page
            .when("/", {
                name: "home",
                template: "<main-page></main-page>"
            })

            // route for the sites list page
            .when('/sites', {
                name: "sites",
                template: "<sites-page flex layout='column'></sites-page>"
            })

            // route for the site details page
            .when('/sites/:siteId', {
                name: "site-details",
                template: "<site-details-page flex layout='column'></site-details-page>"
            })

            // route for the site edit page
            .when('/sites/edit/:siteId', {
                name: "site-edit",
                template: "<site-edit-page flex layout='column'></site-edit-page>"
            })

            //// route for the inventory page
            //.when('/inventory', {
            //	templateUrl: 'pages/inventory.html',
            //	controller: Adunware.Rpg.Pages.InventoryPageController.CONTROLLER_NAME,
            //	controllerAs: "vm"
            //})

            .otherwise("/");
    }
}

Bootstrap.initialize();