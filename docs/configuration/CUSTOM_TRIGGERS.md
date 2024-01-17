# Journey.js - Configuration Options - Custom Triggers:

Below are all the configuration option custom triggers that can be passed to the "setConfiguration()" public function.
<br>
<br>


## For Changes:

### options.onDoNotShowAgainChange( *flag* ):
Fires when the dialog is closed and the "Do not show again" checkbox state has changed.
<br>
***Parameter:*** flag: '*boolean*' - States if the "Do not show again" is checked.

<br/>


## Binding Example:

```markdown
<script> 
  $journey.setConfiguration( {
      onDoNotShowAgainChange: yourJsFunction
  } );
</script>
```