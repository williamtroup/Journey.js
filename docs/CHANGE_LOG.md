# Journey.js - Change Log:

## Version 0.6.0:
-

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