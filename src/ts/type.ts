/**
 * Journey.js
 * 
 * A lightweight, easy-to-use JavaScript library to create interactive, customizable, accessible guided tours across your websites or web apps!
 * 
 * @file        type.ts
 * @version     v2.1.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


export type Position = {
    left: number;
    top: number;
};

export type Configuration = {
    safeMode?: boolean;
    domElementTypes?: string[] | string;
    showCloseButton?: boolean;
    shortcutKeysEnabled?: boolean;
    showProgressDots?: boolean;
    browserUrlParametersEnabled?: boolean;
    showProgressDotNumbers?: boolean;
    showButtons?: boolean;
    showDoNotShowAgain?: boolean;
    tooltipDelay?: number;
    showProgressDotToolTips?: boolean;
    closeDialogOnDisabledBackgroundClick?: boolean;
    showProgressBar?: boolean;
    scrollToElements?: boolean;
    dialogMovingEnabled?: boolean;
    showProgressBarText?: boolean;
    showStepNumbersInTitle?: boolean;
    text?: ConfigurationText;
    events?: ConfigurationEvents;
};

export type ConfigurationText = {
    backButtonText?: string;
    nextButtonText?: string;
    finishButtonText?: string;
    closeButtonToolTipText?: string;
    doNotShowAgainText?: string;
    objectErrorText?: string;
    attributeNotValidErrorText?: string;
    attributeNotSetErrorText?: string;
    closeDialogConfirmationText?: string;
};

export type ConfigurationEvents = {
    onDoNotShowAgainChange?: ( flag: boolean ) => void;
};

export type BindingOptions = {
    _currentView: BindingOptionsCurrentView;
    order?: number;
    attach?: boolean;
    sendClick: boolean;
    alignTop: boolean;
    alignRight: boolean;
    isHint: boolean;
    alignHintToClickPosition: boolean;
    showDisabledBackground: boolean;
    removeHintWhenViewed: boolean;
    group?: string;
    title?: string;
    description?: string;
    tooltip?: string;
    ignore?: boolean;
    moveToNextOnClick?: boolean;
    hintClickPositionOffset?: number;
    events?: BindingOptionsEvents;
};

export type BindingOptionsCurrentView = {
    element: HTMLElement;
};

export type BindingOptionsEvents = {
    onEnter?: ( element: HTMLElement ) => void;
    onLeave?: ( element: HTMLElement ) => void;
    onClose?: ( element: HTMLElement ) => void;
    onFinish?: ( element: HTMLElement ) => void;
    onOpen?: ( element: HTMLElement ) => void;
    onStart?: ( element: HTMLElement ) => void;
    onAddStep?: ( element: HTMLElement ) => void;
    onRemoveStep?: ( element: HTMLElement ) => void;
};