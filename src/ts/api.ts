/**
 * Journey.js
 * 
 * A lightweight, easy-to-use JavaScript library to create interactive, customizable, accessible guided tours across your websites or web apps!
 * 
 * @file        api.ts
 * @version     v2.1.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { type BindingOptions } from "./type";

    
export type PublicApi = {
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Show/Hide
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * start().
     * 
     * Starts the Journey from the beginning.
     * 
     * @public
     * @fires       onStart
     * 
     * @param       {string}   [group]                                      States the group of steps you want to start the journey for (defaults to "default").
     * 
     * @returns     {PublicApi}                                             The Journey.js class instance.
     */
    start: ( group?: string ) => PublicApi;

    /**
     * show().
     * 
     * Shows the Journey.js dialog for the element in the last known position (defaults to the start).
     * 
     * @public
     * @fires       onOpen
     * 
     * @param       {string}   [group]                                      States the group of steps you want to show the dialog for (defaults to the last group used).
     * 
     * @returns     {PublicApi}                                             The Journey.js class instance.
     */
    show: ( group?: string ) => PublicApi;

    /**
     * hide().
     * 
     * Hides the Journey.js dialog.
     * 
     * @public
     * @fires       onClose
     * 
     * @returns     {PublicApi}                                             The Journey.js class instance.
     */
    hide: () => PublicApi;

    /**
     * isOpen().
     * 
     * Returns a flag that states if the dialog is opened.
     * 
     * @public
     * 
     * @returns     {boolean}                                               The flag that states if the dialog is open.
     */
    isOpen: () => boolean;

    /**
     * isComplete().
     * 
     * Returns a flag that states if the full journey has been completed.
     * 
     * @public
     * 
     * @returns     {boolean}                                               The flag that states if the full journey has been completed.
     */
    isComplete: () => boolean;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Managing Steps
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * addDocumentSteps().
     * 
     * Finds all new elements that contain the binding attribute and adds them as new steps.
     * 
     * @public
     * @fires       onAddStep
     * 
     * @returns     {PublicApi}                                             The Journey.js class instance.
     */
    addDocumentSteps: () => PublicApi;

    /**
     * addStep().
     * 
     * Adds a new step to the journey for a specific element.
     * 
     * @public
     * @fires       onAddStep
     * 
     * @param       {Object}   element                                      The element that should be added to the journey.
     * @param       {Object}   options                                      The options to use for this step in the journey (refer to "Binding Options" documentation for properties).
     * 
     * @returns     {PublicApi}                                             The Journey.js class instance.
     */
    addStep: ( element: HTMLElement, options: BindingOptions ) => PublicApi;

    /**
     * removeStep().
     * 
     * Removes a step from the journey, or a hint.
     * 
     * @public
     * @fires       onRemoveStep
     * 
     * @param       {Object}   element                                      The element that should be removed.
     * 
     * @returns     {PublicApi}                                             The Journey.js class instance.
     */
    removeStep: ( element: HTMLElement ) => PublicApi;

    /**
     * clearSteps().
     * 
     * Removes all the steps from the journey.
     * 
     * @public
     * @fires       onRemoveStep
     * 
     * @param       {string}   [group]                                      States the group of steps you want to remove (defaults to all groups).
     * 
     * @returns     {PublicApi}                                             The Journey.js class instance.
     */
    clearSteps: ( group?: string ) => PublicApi;

    /**
     * clearHints().
     * 
     * Removes all the hints.
     * 
     * @public
     * 
     * @returns     {PublicApi}                                             The Journey.js class instance.
     */
    clearHints: () => PublicApi;

    /**
     * reverseStepOrder().
     * 
     * Reverses the order the steps in the journey should in.
     * 
     * @public
     * 
     * @returns     {PublicApi}                                             The Journey.js class instance.
     */
    reverseStepOrder: () => PublicApi;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Configuration
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * setConfiguration().
     * 
     * Sets the specific configuration options that should be used.
     * 
     * @public
     * 
     * @param       {Object}   newConfiguration                             All the configuration options that should be set (refer to "Configuration Options" documentation for properties).
     * 
     * @returns     {PublicApi}                                             The Journey.js class instance.
     */
    setConfiguration: ( newConfiguration: any ) => PublicApi;

    
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Additional Data
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * getVersion().
     * 
     * Returns the version of Journey.js.
     * 
     * @public
     * 
     * @returns     {string}                                                The version number.
     */
    getVersion: () => string;
};

declare global {
	interface Window {
		$journey: PublicApi;
	}
}