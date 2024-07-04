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

export type BindingOptions = {
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
    events?: Events;
};

export type Events = {
    onEnter?: ( element: HTMLElement ) => void;
    onLeave?: ( element: HTMLElement ) => void;
    onClose?: ( element: HTMLElement ) => void;
    onFinish?: ( element: HTMLElement ) => void;
    onOpen?: ( element: HTMLElement ) => void;
    onStart?: ( element: HTMLElement ) => void;
    onAddStep?: ( element: HTMLElement ) => void;
    onRemoveStep?: ( element: HTMLElement ) => void;
};