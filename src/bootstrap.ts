/// <reference path="../typings/angular/angular.d.ts" />
/// <reference path="../typings/angular/angular-route.d.ts" />
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
            .config(Bootstrap._configureRoutes);

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
                template: "<main-page layout='column' flex></main-page>",
            })

            //// route for the character sheet page
            //.when('/team', {
            //	templateUrl: 'pages/team.html',
            //	controller: Adunware.Rpg.Pages.TeamPageController.CONTROLLER_NAME,
            //	controllerAs: "vm"
            //})

            //// route for the inventory page
            //.when('/inventory', {
            //	templateUrl: 'pages/inventory.html',
            //	controller: Adunware.Rpg.Pages.InventoryPageController.CONTROLLER_NAME,
            //	controllerAs: "vm"
            //})

            .otherwise("/");
    }

    private static _initServices(): void {

    }
}

Bootstrap.initialize();