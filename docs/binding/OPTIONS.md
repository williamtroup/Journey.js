# Journey.js - Binding Options:

Below are all the JSON properties that can be passed in the "data-journey-options" binding attribute for a DOM element.


## Standard Options:
<br/>

| Type: | Name: | Description: |
| --- | --- | --- |
| *number* | order | States the order that this journey's step should be shown (required). |
| *boolean* | attach | States the dialog should be attached to the element (only if not a hint.  If false, the dialog is centred in the window. Defaults to true). |
| *boolean* | sendClick | States if the active DOM element should fire any assigned click event (defaults to false). |
| *boolean* | isHint | States if this item should only be shown as a hint (not included in the main journey, defaults to false). |
<br/>


## String Options:
<br/>

| Type: | Name: | Description: |
| --- | --- | --- |
| *string* | title | The title that should be shown in the dialog (defaults to null). |
| *string* | description | The description that should be shown in the dialog (defaults to null). |

<br/>


## Binding Example:

```markdown
<button data-journey-options="{ 'order': 6 }"></button>
```