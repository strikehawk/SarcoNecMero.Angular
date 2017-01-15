/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../../common/event-block.ts" />
/// <reference path="../../definitions-summary.ts" />

module snm.ops.components {
    // controller
    class Controller {
        static $inject: string[] = ["$scope", "$http", "$log", "userSettings"];

        public siteId: number;
        public operations: snm.ops.OperationArcheoSummary[];

        public allowEdition: boolean;
        public eventBlock: adnw.common.EventBlock;

        constructor(private $scope: ng.IScope,
                    private $http: ng.IHttpService,
                    private $log: ng.ILogService,
                    private userSettings: snm.services.settings.UserSettings) {
        }

        public $onInit(): void {
            //Get operation list
            this.$http.get<snm.ops.OperationArcheoSummary[]>("api/ops/operations/site/" + this.siteId)
                .then((result: ng.IHttpPromiseCallbackArg<snm.ops.OperationArcheoSummary[]>) => {
                    this.operations = result.data;
                });
        }

        public goToOperation(id: number): void {

        }
    }

    // component
    angular.module("snm.ops.components.siteOperations", ["ngRoute"])
        .component("siteOperations", {
            templateUrl: '/app/ops/components/site-operations/site-operations.component.html',
            controller: Controller,
            controllerAs: "vm",
            bindings: {
                siteId: "<",
                allowEdition: "=",
                eventBlock: "<"
            }
        });
}