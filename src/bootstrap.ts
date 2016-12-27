/// <reference path="../typings/angular/angular.d.ts" />
/// <reference path="../typings/angular/angular-route.d.ts" />
/// <reference path="../typings/angular-material/angular-material.d.ts" />
/// <reference path="components/components.ts" />
/// <reference path="pages/pages.ts" />
/// <reference path="services/services.ts" />
/// <reference path="ops/ops.ts" />
/// <reference path="pers/pers.ts" />

class Bootstrap {
    public static initialize(): void {
        angular.module(adunware.snm.AppConstants.APP_MODULE_NAME, [
                "ngRoute",
                "ngMaterial"])
            .config(Bootstrap._configureRoutes)
            .config(function ($mdThemingProvider) {

                // Configure a dark theme with primary foreground yellow

                $mdThemingProvider.theme('docs-dark', 'default')
                    .primaryPalette('yellow')
                    .dark();

            });

        (<ng.IAngularStatic>angular).module(adunware.snm.AppConstants.CORE_MODULE_NAME, [
                adunware.snm.AppConstants.APP_MODULE_NAME,
                adunware.snm.AppConstants.COMPONENTS_MODULE_NAME,
                adunware.snm.AppConstants.PAGES_MODULE_NAME,
                adunware.snm.AppConstants.SERVICES_MODULE_NAME,
                adunware.snm.AppConstants.CHRONO_MODULE_NAME,
                adunware.snm.AppConstants.OPS_MODULE_NAME,
                adunware.snm.AppConstants.PERS_MODULE_NAME
            ])
            .value(adunware.snm.AppConstants.APP_INSTANCE, new adunware.snm.App());
    }

    private static _configureRoutes($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider

        // route for the home page
            .when("/", {
                template: "<main-page></main-page>"
            })

            // route for the sites list page
            .when('/sites', {
                template: "<sites-page flex layout='column'></sites-page>"
            })

            // route for the site details page
            .when('/sites/:siteId', {
                template: "<site-details-page></site-details-page>"
            })

            // route for the site edit page
            .when('/sites/edit/:siteId', {
                template: "<site-edit-page></site-edit-page>"
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