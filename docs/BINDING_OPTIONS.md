# Journey.js - Binding Options:

Below are all the JSON properties that can be passed in the "data-journey-options" binding attribute for a DOM element.


## Standard Options:
<br/>

| Type: | Name: | Description: |
| --- | --- | --- |
| *number* | order | States the order that this journey help should be shown (required). |
| *boolean* | attach | States the dialog should be attached to the element (if not, the dialog is centered in the window. Defaults to true). |
| *boolean* | sendClick | States if the active DOM element should fire any assigned click event (defaults to false). |
<br/>


## Translatable String Options:
<br/>

| Type: | Name: | Description: |
| --- | --- | --- |
| *string* | title | The title that should be shown in the dialog (defaults to null). |
| *string* | description | The description that should be shown in the dialog (defaults to null). |