/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../definitions.ts" />

module snm.pers.components {
    class PersonneController {
        static $inject: string[] = ["$scope"];

        public personne: snm.pers.PersonneSummary;

        constructor(private $scope: ng.IScope) {

        }
    }

    // component
    angular.module("snm.pers.components.personne", [
    ]).component("personne", {
        templateUrl: '/app/pers/components/personne/personne.component.html',
        controller: PersonneController,
        controllerAs: "vm",
        bindings: {
            personne: "<"
        }
    });
}