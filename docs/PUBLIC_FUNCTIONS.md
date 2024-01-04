# Journey.js - Functions:

Below is a list of all the public functions that can be called from the Journey.js instance.
<br>
<br>


## Show/Hide:

### **show()**:
Shows the Journey.js dialog for the element in the last known position (defaults to the start).
<br>
***Returns***: '*Object*' - The Journey.js class instance.

### **hide()**:
Hides the Journey.js dialog.
<br>
***Returns***: '*Object*' - The Journey.js class instance.

### **isOpen()**:
Returns a flag that states if the dialog is opened.
<br>
***Returns***: '*boolean*' - The flag that states if the dialog is open.

### **isComplete()**:
Returns a flag that states if the full journey has been completed.
<br>
***Returns***: '*boolean*' - The flag that states if the full journey has been completed.
<br>


## Configuration:

### **setConfiguration( *newOptions* )**:
Sets the specific configuration options that should be used.
<br>
***Parameter: newOptions***: '*Options*' - All the configuration options that should be set (refer to ["Configuration Options"](configuration/OPTIONS.md) documentation for properties).
<br>
***Returns***: '*Object*' - The Journey.js class instance.
<br>


## Additional Data:

### **getVersion()**:
Returns the version of Journey.js.
<br>
***Returns***: '*string*' - The version number.