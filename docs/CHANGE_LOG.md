# Journey.js - Change Log:

## Version 1.0.2:
- All hover transition effects now work for hovering, and not hovering, which results in a smoother display.
- Removed the outline effect for the "Back", "Next", and "Finish" buttons.
- Removed replicated HEX colors (all now reference the original ":root" variable).
- Added an ":active" states for all buttons, dots, and the close button (now shows a slightly lighter background color).
- Minor documentation improvements.

<br>


## Version 1.0.1:
- Fixed some missing CSS files in test HTML files, and updated the files to use the correct markup.
- Fixed some incorrectly formatted markup in the documentation.

<br>


## Version 1.0.0:

#### **New Features:**
- Do not show again! This will show a checkbox, which will ask if the journey dialog should be shown again (calls a custom trigger to state the option selected).

#### **Configuration Options:**
- Added a new configuration option "showDoNotShowAgain" (defaults to false), which states if the "Do not show again" checkbox should be shown.
- Added a new configuration option "doNotShowAgainText" (defaults to "Do not show again"), which states the text to use for the "Do not show again" checkbox.

#### **Configuration Options - Custom Triggers:**
- Added a new configuration custom trigger called "onDoNotShowAgainChange", which states an event that should be triggered when the "Do not show again" checkbox is changed (on close).

#### **General Improvements:**
- BREAKING: All ":root" variables now start with "--journey-js-", which will prevent collisions with other libraries.
- Updated project homepage URL.

<br>


## Version 0.8.0:

#### **Binding Options:**
- Added a new binding option called "alignHintToClickPosition", which states if the hint should be shown at the mouse position (defaults to false).

#### **Configuration Options:**
- Added a new configuration option "showProgressDotNumbers" (defaults to false), which states if the progress dots should show the step numbers in them.
- Added a new configuration option "showButtons" (defaults to true), which states if the main buttons should be shown.
- Added a new configuration option "closeButtonToolTipText" (defaults to "Close"), which states the tooltip text to use for the "Close" button.

#### **General Improvements:**
- The progress dots will now show tooltips (which is the title of the step being focused).

#### **CSS:**
- The "Close" button now uses slightly thicker lines for the X.
- Added more default padding around the progress dots area.

#### **Documentation:**
- Added missing binding documentation for "alignTop" and "alignRight".

#### **Fixes:**
- Fixed a fault that allowed the shortcut keys (for journey navigation) to still work when a hint is shown.

<br>


## Version 0.7.0:

#### **New Features:**
- Added hints support! This will draw a small icon in the top left of an element, that can be clicked to show a hint.

#### **Binding Options:**
- Added a new binding option called "isHint", which states if the element should show the dialog as a hint (will not be included in the main journey).

#### **Configuration Options:**
- Renamed the configuration option "previousButtonText" to "backButtonText" (the default text is now "Back").

#### **Public Functions:**
- Added new public function "start()", which is used to start the journey from the beginning.
- Added new public function "addStep()", which is used to add a new step to the current journey.

#### **CSS:**
- Added active progress DOT is now slightly larger in width (makes it a bit more clear).
- Renamed the CSS class "button.previous" to "button.back".

#### **Documentation:**
- Fixed spelling and grammar mistakes across all the documentation.

<br>


## Version 0.6.0:

#### **Binding Options:**
- Added a new binding option called "alignTop", which states if the dialog should be aligned to the top of the element.
- Added a new binding option called "alignRight", which states if the dialog should be aligned to the right of the element.

#### **Binding Options - Custom Triggers:**
- Added a new binding custom trigger called "onOpen", which states an event that should be triggered when the dialog is first opened.

#### **Shortcut Keys:**
- Added a new shortcut key "Up", which will move to the first element in the journey.
- Added a new shortcut key "Down", which will move to the last element in the journey.

#### **Documentation:**
- Added examples to all documentation areas.
- Reorganized the documentation for the project.

<br>


## Version 0.5.0:

#### **New Features:**
- Browser URL parameters support! This will allow you to force Journey.js to open when the page has finished loading and state what step to start on.

#### **Configuration Options:**
- Added a new configuration option "browserUrlParametersEnabled" (defaults to true), which states if browser URL parameter reading support is enabled.

<br>


## Version 0.4.0:

#### **New Features:**
- Progress dots are now shown on the dialog! This allows you to jump to specific areas of the journey!

#### **Configuration Options:**
- Added a new configuration option "showProgressDots" (defaults to true), which states if the progress dots are shown on the dialog.

#### **Binding Options:**
- Added a new binding option called "attach", which states if the dialog should be attached to the element (otherwise, it's centred in the window)  Defaults to true.
- Added a new binding option called "sendClick", which states if the active DOM element should fire any assigned click event (defaults to false).

#### **Binding Options - Custom Triggers:**
- Added a new binding custom trigger called "onFinish", which states an event that should be triggered when the dialog is closed on the final step DOM element.

#### **Documentation:**
- Project description update.

#### **Fixes:**
- Fixed the dialog showing in the wrong position when the element is aligned off the right side of the screen.

<br>


## Version 0.3.0:

#### **New Features:**
- Added shortcut keys "Left", "Right", and "Escape", which move to the previous/next element in the journey, and close the dialog.

#### **Configuration Options:**
- Added a new configuration option "shortcutKeysEnabled" (defaults to true), which states if the shortcut keys (for navigation) are enabled.

#### **CSS:**
- Added CSS ":root" variable "--dialog-close-button-background-color", which states the background color to use for the close button.
- Added CSS ":root" variable "--dialog-close-button-border-color", which states the border color to use for the close button.
- Added CSS ":root" variable "--dialog-close-button-hover-background-color", which states the background color to use for the close button when hovered.
- Renamed one or two of the other ":root" variables for the Close button.

#### **General Improvements:**
- The attribute "data-journey-options" is now removed from all elements after they are processed.

#### **Fixes:**
- Fixed the previous buttons event sometimes allowing a loop back to the end.

<br>


## Version 0.2.1:
- Added Code of Conduct, Contributing, and Security Policy.

<br>


## Version 0.2.0:

#### **Binding Options:**
- A "title" or "description" must be set for the binding options for a DOM element to be accepted.

#### **Binding Options - Custom Triggers:**
- Added a new binding custom trigger called "onClose", which states an event that should be triggered when the dialog is closed on a specific DOM element.

#### **Configuration Options:**
- Added a new configuration option "showCloseButton" (defaults to true), which states if the close button is shown on the dialog.
- Calling "setConfiguration()" when the dialog is open will now close it and force the guide back to the start of the journey.

#### **Documentation:**
- Fixed missing configuration documentation, with minor fixes and improvements elsewhere.
- Fixed the testing HTML files referencing the wrong global JS variable.

#### **CSS:**
- Spacing is now applied for the first item in the dialog (to prevent overlaps with the close button).

#### **General Improvements:**
- Internal cleanups of the core JS code.

#### **Fixes:**
- Fixed a fault that caused the CSS class "journey-js-element-focus" to remain on an element when the dialog is closed.

<br>


## Version 0.1.0:
- Everything :)