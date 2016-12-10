/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../definitions.ts" />
/// <reference path="../../../services/dal/db-context.ts" />
/// <reference path="../../dal/phase-chronologique-set.ts" />

module snm.chrono.components {
    class PhasesChronologiquesController {
        static $inject: string[] = ["$scope", "dbContext"];

        private _phases: IPhaseChronologique[];

        public get phases(): IPhaseChronologique[] {
            return this._phases;
        }

        public set phases(value: IPhaseChronologique[]) {
            this._phases = value;
        }

        private _debut: number;

        public get debut(): number {
            return this._debut;
        }

        public set debut(value: number) {
            this._debut = value;
        }

        private _fin: number;

        public get fin(): number {
            return this._fin;
        }

        public set fin(value: number) {
            this._fin = value;
        }

        constructor(private $scope: ng.IScope, private dbContext: snm.services.dal.DbContext) {
            let repoPhaseChrono: snm.chrono.IPhaseChronologiqueSet =
                <snm.chrono.IPhaseChronologiqueSet> dbContext.getRepository("PhaseChronologique");
            repoPhaseChrono.refresh().then(() => {
                this.phases = repoPhaseChrono.getAll();
                this.$scope.$applyAsync();
            });
        }
    }

    // component
    angular.module("snm.chrono.components.phases-chronologiques", [
    ]).component("phasesChrono", {
        templateUrl: '/app/chrono/components/phases-chronologiques/phases-chronologiques.component.html',
        controller: PhasesChronologiquesController,
        controllerAs: "vm",
        bindings: {
            debut: "<",
            fin: "<"
        }
    });
}