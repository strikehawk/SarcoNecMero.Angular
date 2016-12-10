/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../definitions.ts" />

module snm.pers.components {
    class PersonneController {
        static $inject: string[] = ["$scope"];

        private _personne: IPersonne;

        public get personne(): IPersonne {
            return this._personne;
        }

        public set personne(value: IPersonne) {
            this._personne = value;
        }

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