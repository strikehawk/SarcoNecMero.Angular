// Type definitions for Angular Material 0.9.0-rc1+ (angular.material module)
// Project: https://github.com/angular/material
// Definitions by: Matt Traynham <https://github.com/mtraynham>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../angular/angular.d.ts" />

declare namespace angular.material {

    interface MDBottomSheetOptions {
        templateUrl?: string;
        template?: string;
        scope?: angular.IScope; // default: new child scope
        preserveScope?: boolean; // default: false
        controller?: string|Function;
        locals?: {[index: string]: any};
        targetEvent?: MouseEvent;
        resolve?: {[index: string]: angular.IPromise<any>}
        controllerAs?: string;
        parent?: string|Element|JQuery; // default: root node
        disableParentScroll?: boolean; // default: true
    }

    interface MDBottomSheetService {
        show(options: MDBottomSheetOptions): angular.IPromise<any>;
        hide(response?: any): void;
        cancel(response?: any): void;
    }

    interface MDPresetDialog<T> {
        title(title: string): T;
        textContent(content: string): T;
        htmlContent(content: string): T;
        ok(ok: string): T;
        theme(theme: string): T;
        targetEvent(event: MouseEvent): T;
    }

    interface MDAlertDialog extends MDPresetDialog<MDAlertDialog> {
    }

    interface MDConfirmDialog extends MDPresetDialog<MDConfirmDialog> {
        cancel(cancel: string): MDConfirmDialog;
    }

    interface MDDialogOptions {
        templateUrl?: string;
        template?: string;
        targetEvent?: MouseEvent;
        scope?: angular.IScope; // default: new child scope
        preserveScope?: boolean; // default: false
        disableParentScroll?: boolean; // default: true
        hasBackdrop?: boolean // default: true
        clickOutsideToClose?: boolean; // default: false
        escapeToClose?: boolean; // default: true
        focusOnOpen?: boolean; // default: true
        controller?: string|Function;
        locals?: {[index: string]: any};
        bindToController?: boolean; // default: false
        resolve?: {[index: string]: angular.IPromise<any>}
        controllerAs?: string;
        parent?: string|Element|JQuery; // default: root node
        onComplete?: Function;
    }

    interface MDDialogService {
        show(dialog: MDDialogOptions|MDAlertDialog|MDConfirmDialog): angular.IPromise<any>;
        confirm(): MDConfirmDialog;
        alert(): MDAlertDialog;
        hide(response?: any): angular.IPromise<any>;
        cancel(response?: any): void;
    }

    interface MDIcon {
        (id: string): angular.IPromise<Element>; // id is a unique ID or URL
    }

    interface MDIconProvider {
        icon(id: string, url: string, iconSize?: string): MDIconProvider; // iconSize default: '24px'
        iconSet(id: string, url: string, iconSize?: string): MDIconProvider; // iconSize default: '24px'
        defaultIconSet(url: string, iconSize?: string): MDIconProvider; // iconSize default: '24px'
        defaultIconSize(iconSize: string): MDIconProvider; // default: '24px'
    }

    interface MDMedia {
        (media: string): boolean;
    }

    interface MDSidenavObject {
        toggle(): angular.IPromise<void>;
        open(): angular.IPromise<void>;
        close(): angular.IPromise<void>;
        isOpen(): boolean;
        isLockedOpen(): boolean;
    }

    interface MDSidenavService {
        (component: string): MDSidenavObject;
    }

    interface MDToastPreset<T> {
        content(content: string): T;
        action(action: string): T;
        highlightAction(highlightAction: boolean): T;
        capsule(capsule: boolean): T;
        theme(theme: string): T;
        hideDelay(delay: number): T;
        position(position: string): T;
    }

    interface MDSimpleToastPreset extends MDToastPreset<MDSimpleToastPreset> {
    }

    interface MDToastOptions {
        templateUrl?: string;
        template?: string;
        scope?: angular.IScope; // default: new child scope
        preserveScope?: boolean; // default: false
        hideDelay?: number; // default (ms): 3000
        position?: string; // any combination of 'bottom'/'left'/'top'/'right'/'fit'; default: 'bottom left'
        controller?: string|Function;
        locals?: {[index: string]: any};
        bindToController?: boolean; // default: false
        resolve?: {[index: string]: angular.IPromise<any>}
        controllerAs?: string;
        parent?: string|Element|JQuery; // default: root node
    }

    interface MDToastService {
        show(optionsOrPreset: MDToastOptions|MDToastPreset<any>): angular.IPromise<any>;
        showSimple(): angular.IPromise<any>;
        simple(): MDSimpleToastPreset;
        build(): MDToastPreset<any>;
        updateContent(): void;
        hide(response?: any): void;
        cancel(response?: any): void;
    }

    interface MDPalette {
        0?: string;
        50?: string;
        100?: string;
        200?: string;
        300?: string;
        400?: string;
        500?: string;
        600?: string;
        700?: string;
        800?: string;
        900?: string;
        A100?: string;
        A200?: string;
        A400?: string;
        A700?: string;
        contrastDefaultColor?: string;
        contrastDarkColors?: string|string[];
        contrastLightColors?: string|string[];
    }

    interface MDThemeHues {
        default?: string;
        'hue-1'?: string;
        'hue-2'?: string;
        'hue-3'?: string;
    }

    interface MDThemePalette {
        name: string;
        hues: MDThemeHues;
    }

    interface MDThemeColors {
        accent: MDThemePalette;
        background: MDThemePalette;
        primary: MDThemePalette;
        warn: MDThemePalette;
    }

    interface MDThemeGrayScalePalette {
        1: string;
        2: string;
        3: string;
        4: string;
        name: string;
    }

    interface MDTheme {
        name: string;
        isDark: boolean;
        colors: MDThemeColors;
        foregroundPalette: MDThemeGrayScalePalette;
        foregroundShadow: string;
        accentPalette(name: string, hues?: MDThemeHues): MDTheme;
        primaryPalette(name: string, hues?: MDThemeHues): MDTheme;
        warnPalette(name: string, hues?: MDThemeHues): MDTheme;
        backgroundPalette(name: string, hues?: MDThemeHues): MDTheme;
        dark(isDark?: boolean): MDTheme;
    }

    interface MDThemingProvider {
        theme(name: string, inheritFrom?: string): MDTheme;
        definePalette(name: string, palette: MDPalette): MDThemingProvider;
        extendPalette(name: string, palette: MDPalette): MDPalette;
        setDefaultTheme(theme: string): void;
        alwaysWatchTheme(alwaysWatch: boolean): void;
    }

    interface MDPanelXPosition {
        CENTER: string;
        ALIGN_START: string;
        ALIGN_END: string;
        OFFSET_START: string;
        OFFSET_END: string;
    }

    interface MDPanelYPosition {
        CENTER: string;
        ALIGN_TOPS: string;
        ALIGN_BOTTOMS: string;
        ABOVE: string;
        BOTTOM: string;
    }

    interface MDPanelPosition {
        absolute(): MDPanelPosition;
        relativeTo(element: string|Element|JQuery): MDPanelPosition;
        top(top?: string): MDPanelPosition;
        bottom(bottom?: string): MDPanelPosition;
        start(start?: string): MDPanelPosition;
        end(end?: string): MDPanelPosition;
        left(left?: string): MDPanelPosition;
        right(right?: string): MDPanelPosition;
        centerHorizontally(): MDPanelPosition;
        centerVertically(): MDPanelPosition;
        center(): MDPanelPosition;
        addPanelPosition(xPosition: string, yPosition: string): MDPanelPosition;
        withOffsetX(offsetX: string): MDPanelPosition;
        withOffsetY(offsetY: string): MDPanelPosition;
    }

    interface MDPanelAnimation {
        closeTo(closeClass: string): MDPanelAnimation;
        defaultAnimation(animation: string): MDPanelAnimation;
        targetEvent(event: ng.IAngularEvent): MDPanelAnimation;
    }

    interface MDPanelRef {
        detach(): angular.IPromise<any>;
        show(): angular.IPromise<any>;
        hide(): angular.IPromise<any>;
        destroy(): void;
        addClass(newClass: string, toElement: boolean);
        removeClass(oldClass: string, fromElement: boolean);
        toggleClass(toggleClass: string, onElement: boolean);
        updatePosition(position: MDPanelPosition): void;
    }

    interface MDPanelConfig {
        id?: string;
        template?: string;
        templateUrl?: string;
        controller?: string|Function;
        controllerAs?: string;
        bindToController?: boolean;
        locals?: Object;
        resolve?: Object;
        attachTo?: string|Element|JQuery;
        propagateContainerEvents?: boolean;
        panelClass?: string;
        zIndex?: number;
        position?: MDPanelPosition;
        clickOutsideToClose?: boolean;
        escapeToClose?: boolean;
        trapFocus?: boolean;
        focusOnOpen?: boolean;
        fullScreen?: boolean;
        animation?: MDPanelAnimation;
        hasBackdrop?: boolean;
        disableParentScroll?: boolean;
        onDomAdded?: Function;
        onOpenComplete?: Function;
        onRemoving?: Function;
        onDomRemoved?: Function;
        origin?: string|Element|JQuery;
    }

    interface MDPanelService {
        xPosition: MDPanelXPosition;
        yPosition: MDPanelYPosition;
        create(config?: MDPanelConfig): MDPanelRef;
        open(config?: MDPanelConfig): angular.IPromise<MDPanelRef>;
        newPanelPosition(): MDPanelPosition;
        newPanelAnimation(): MDPanelAnimation;
    }
}
