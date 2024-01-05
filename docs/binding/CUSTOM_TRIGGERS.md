# Journey.js - Binding Options - Custom Triggers:

Below is a list of all the custom triggers supported in the "data-journey-options" binding attribute for DOM elements.
<br>
<br>


## For Viewing:

### options.onEnter( *element* ):
Fires when the dialog is shown for a specific DOM element.
<br>
***Parameter:*** element: '*object*' - The DOM element that the dialog is being shown for.

### options.onLeave( *element* ):
Fires when the dialogue is hidden for a specific DOM element.
<br>
***Parameter:*** element: '*object*' - The DOM element that the dialog is being hidden for.

### options.onClose( *element* ):
Fires when the the dialogue is closed on a specific DOM element.
<br>
***Parameter:*** element: '*object*' - The DOM element that the dialog was closed on.

### options.onFinish( *element* ):
Fires when the dialog is closed on the final step.
<br>
***Parameter:*** element: '*object*' - The DOM element that the dialog was closed on.

### options.onOpen( *element* ):
Fires when the dialogue is first opened.
<br>
***Parameter:*** element: '*object*' - The DOM element that the dialog was opened on.

<br/>


## Binding Example:

```markdown
<button data-journey-options="{ 'onFinish': yourJsFunction }"></button>
```