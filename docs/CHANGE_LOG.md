# Journey.js - Change Log:

## Version 0.2.1:
-

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