/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/angular/angular-route.d.ts" />

module adunware.snm.components {
    class Controller {
        public currentNavItem: string;

        constructor(private $route: ng.route.IRouteService) {
            this.currentNavItem = this._getNavItem($route.current.name);
        }

        private _getNavItem(routeName: string): string {
            if (!routeName) {
                //Default is 'home'
                return "home";
            }

            switch (routeName) {
                case "home":
                    return "home";
                case "sites":
                case "site-details":
                case "site-edit":
                    return "sites";
                default:
                    return "home";
            }
        }
    }

    // component
    angular.module("snm.components.navMenu", []).component("navMenu", {
        templateUrl: '/app/components/nav-menu/nav-menu.component.html',
        controller: Controller,
        controllerAs: "vm"
    });
}