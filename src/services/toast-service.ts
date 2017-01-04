/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../../typings/angular-material/angular-material.d.ts" />

module snm.services {
    export interface ToastService {
        showSimpleMsg(elementId: string, msg: string, hideDelay?: number): void;
        showSuccessfulSaveMsg(elementId: string, msg: string, hideDelay?: number): void;
        showErrorSaveMsg(elementId: string, msg: string, hideDelay?: number): void;
    }

    class Service implements ToastService {
        static $inject: string[] = ["$mdToast"];
        constructor(private $mdToast: angular.material.MDToastService) {
        }

        public showSimpleMsg(elementId: string, msg: string, hideDelay?: number): void {
            let options: angular.material.MDToastOptions = {
                position: "bottom right",
                template: "<md-toast><div class='md-toast-content'><span>" + msg + "</span></div></md-toast>",
                parent: elementId
            };

            if (typeof hideDelay === "number") {
                options.hideDelay = hideDelay;
            }

            this.$mdToast.show(options);
        }

        public showSuccessfulSaveMsg(elementId: string, msg: string, hideDelay?: number): void {
            let options: angular.material.MDToastOptions = {
                position: "bottom right",
                template: "<md-toast><div class='md-toast-content'><md-icon md-svg-src='assets/img/ic_done_24px.svg' class='s24 md-primary toast-icon' aria-label='Done'></md-icon><span>" + msg + "</span></div></md-toast>",
                parent: elementId
            };

            if (typeof hideDelay === "number") {
                options.hideDelay = hideDelay;
            }

            this.$mdToast.show(options);
        }

        public showErrorSaveMsg(elementId: string, msg: string, hideDelay?: number): void {
            let options: angular.material.MDToastOptions = {
                position: "bottom right",
                template: "<md-toast><div class='md-toast-content'><md-icon md-svg-src='assets/img/ic_report_problem_24px.svg' class='s24 md-warn toast-icon' aria-label='Error'></md-icon><span>" + msg + "</span></div></md-toast>",
                parent: elementId
            };

            if (typeof hideDelay === "number") {
                options.hideDelay = hideDelay;
            }

            this.$mdToast.show(options);
        }
    }

    angular.module("snm.services.toastService", [])
        .factory("toastService", ["$mdToast", ($mdToast: angular.material.MDToastService) => new Service($mdToast)]);
}
