/// <reference path="../../../typings/openlayers/openlayers.d.ts" />
/// <reference path="../../services/user-settings.ts" />
/// <reference path="../../ops/definitions-summary.ts" />
/// <reference path="../../ops/definitions-details.ts" />

module snm.maps.services {
    export interface IconService {
        getSiteSummaryStyle(site: snm.ops.SiteArcheoSummary): ol.style.Style;
        getSiteDetailsStyle(site: snm.ops.details.SiteArcheo): ol.style.Style;
        getOperationDetailsStyle(operation: snm.ops.details.OperationArcheo): ol.style.Style;
    }

    interface AnchorInfo {
        /**
         * Anchor. Default value is [0.5, 0.5] (icon center).
         */
        anchor: number[];

        /**
         * Origin of the anchor: bottom-left, bottom-right, top-left or top-right. Default is top-left.
         */
        anchorOrigin?: ol.style.Icon.Origin;

        /**
         * Units in which the anchor x value is specified. A value of 'fraction' indicates the x value is a fraction of
         * the icon. A value of 'pixels' indicates the x value in pixels. Default is 'fraction'.
         */
        anchorXUnits?: ol.style.Icon.AnchorUnits;

        /**
         * Units in which the anchor y value is specified. A value of 'fraction' indicates the y value is a fraction of
         * the icon. A value of 'pixels' indicates the y value in pixels. Default is 'fraction'.
         */
        anchorYUnits?: ol.style.Icon.AnchorUnits;
    }

    class Service implements IconService {
        public getSiteSummaryStyle(site: snm.ops.SiteArcheoSummary): ol.style.Style {
            if (!site) {
                throw new Error("Site cannot be null.");
            }

            let canvas: HTMLCanvasElement = this._getSiteSummaryCanvas(site);

            return this._getStyle(canvas);
        }

        getSiteDetailsStyle(site: snm.ops.details.SiteArcheo): ol.style.Style {
            if (!site) {
                throw new Error("Site cannot be null.");
            }

            let canvas: HTMLCanvasElement = this._getSiteSummaryCanvas(site);

            return this._getStyle(canvas);
        }

        getOperationDetailsStyle(operation: snm.ops.details.OperationArcheo): ol.style.Style {
            if (!operation) {
                throw new Error("Operation cannot be null.");
            }

            let canvas: HTMLCanvasElement;

            return this._getStyle(canvas);
        }

        private _getStyle(canvas: HTMLCanvasElement, anchorInfo?: AnchorInfo): ol.style.Style {
            if (!canvas) {
                throw new Error("Canvas cannot be null.");
            }

            let options: olx.style.IconOptions = {
                img: canvas,
                imgSize: [canvas.width, canvas.height]
            };

            if (anchorInfo) {
                options.anchor = anchorInfo.anchor;

                if (anchorInfo.anchorOrigin) {
                    options.anchorOrigin = anchorInfo.anchorOrigin;
                }

                if (anchorInfo.anchorXUnits) {
                    options.anchorXUnits = anchorInfo.anchorXUnits;
                }

                if (anchorInfo.anchorYUnits) {
                    options.anchorYUnits = anchorInfo.anchorYUnits;
                }
            }

            let style: ol.style.Style = new ol.style.Style({
                image: new ol.style.Icon(options)
            });

            return style;
        }

        private _getSiteSummaryCanvas(site: snm.ops.SiteArcheoSummary) {
            let content: string = site.identifications[0].reference;

            let width: number = this._getWidth(content);
            let height: number = 20;
            let background: string = "#000";
            let foreground: string = "#fff";
            let font: string = "Verdana 12px";

            let canvas: HTMLCanvasElement = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
            ctx.fillStyle = background;
            ctx.strokeStyle = foreground;
            ctx.lineWidth = 2;

            ctx.rect(0.5, 0.5, width - 2, height - 2);
            ctx.fill();
            ctx.stroke();

            ctx.font = font;
            ctx.fillStyle = foreground;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(content, ~~(width / 2), ~~(height / 2));

            return canvas;
        }

        private _getWidth(content: string): number {
            let width: number;

            switch (content.length) {
                case 1:
                    width = 18;
                    break;
                case 2:
                    width = 22;
                    break;
                case 3:
                    width = 27;
                    break;
                default:
                    width = 32;
            }

            return width;
        }
    }

    angular.module("snm.maps.services.iconService", [])
        .factory("iconService", () => new Service());
}