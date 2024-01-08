# Journey.js - Configuration Options:

Below are all the configuration options that can be passed to the "setConfiguration()" public function.
<br>
<br>


| Type: | Name: | Description: |
| --- | --- | --- |
| *boolean* | safeMode | States if safe-mode is enabled (errors will be ignored and logged only. Defaults to true). |
| *Object* | domElementTypes | The DOM element types to lookup (can be either an array of strings, or a space-separated string, and defaults to "*"). |
| *string* | backButtonText | States the text that should be used for the Back button (defaults to "Back"). |
| *string* | nextButtonText | States the text that should be used for the Next button (defaults to "Next"). |
| *string* | finishButtonText | States the text that should be used for the Finish button (defaults to "Finish"). |
| *boolean* | showCloseButton | States if the Close button is visible on the dialog (defaults to true). |
| *boolean* | shortcutKeysEnabled | States if the shortcut keys are enabled (defaults to true). |
| *boolean* | showProgressDots | States if the progress dots are visible on the dialog (defaults to true). |
| *boolean* | browserUrlParametersEnabled | States if the browser URL parameters are enabled (defaults to true). |
| *boolean* | showProgressDotNumbers | States if the progress dots should show the step numbers in them (defaults to false). |
| *boolean* | showButtons | States if the buttons are visible on the dialog (defaults to true). |
| *string* | closeButtonToolTipText | States the tooltip text that should be used for the "Close" button (defaults to "Close"). |

<br/>


## Example:

```markdown
<script> 
  $journey.setConfiguration( {
      safeMode: false
  } );
</script>
```