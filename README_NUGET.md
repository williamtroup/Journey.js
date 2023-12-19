# Journey.js v0.2.0

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Journey.js%2C%20a%20free%20JavaScript%journey%builder&url=https://github.com/williamtroup/Journey.js&hashtags=javascript,html,journey,guide)
[![npm](https://img.shields.io/badge/npmjs-v0.2.0-blue)](https://www.npmjs.com/package/jjourney.js)
[![nuget](https://img.shields.io/badge/nuget-v0.2.0-purple)](https://www.nuget.org/packages/jJourney.js/)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/williamtroup/Journey.js/blob/main/LICENSE.txt)
[![discussions Welcome](https://img.shields.io/badge/discussions-Welcome-red)](https://github.com/williamtroup/Journey.js/discussions)
[![coded by William Troup](https://img.shields.io/badge/coded_by-William_Troup-yellow)](https://github.com/williamtroup)

> 🚶 A lightweight, and easy-to-use, JavaScript library for building a website walk-through guide!


## What features does Journey.js have?

- Zero-dependencies and extremely lightweight!
- Full API available via public functions.
- Fully styled in CSS/SASS and compatible with the Bootstrap library.
- Full CSS theme support (using :root variables, with a default dark-mode theme).
- Custom triggers for actions (when the dialog is shown for an element, or hidden, etc).


## What browsers are supported?

All modern browsers (such as Google Chrome, FireFox, and Opera) are fully supported.


## What are the most recent changes?

To see a list of all the most recent changes, click [here](https://github.com/williamtroup/Journey.js/blob/main/docs/CHANGE_LOG.md).


## How do I get started?

To get started using Journey.js, do the following steps:

### 1. Prerequisites:

Make sure you include the "DOCTYPE html" tag at the top of your HTML, as follows:

```markdown
<!DOCTYPE html>
```

### 2. Include Files:

```markdown
<link rel="stylesheet" href="dist/Journey.js.css" />
<script src="dist/Journey.js"></script>
```

### 3. DOM Element Binding:

```markdown
<button data-journey-options="{ 'title': 'Get Version', 'description': 'Logs the current version of Journey.js to the developers console.', 'order': 6 }" onclick="console.log( $journey.getVersion() );">Get Version</button>
```

To see a list of all the available binding options you can use for "data-journey-options", click [here](https://github.com/williamtroup/Journey.js/blob/main/docs/BINDING_OPTIONS.md).

To see a list of all the available custom triggers you can use for "data-journey-options", click [here](https://github.com/williamtroup/Journey.js/blob/main/docs/BINDING_OPTIONS_CUSTOM_TRIGGERS.md).


### 4. Finishing Up:

To start the journey, call the following public function:

```markdown
<script> 
  $journey.show();
</script>
```

That's it! Nice and simple. Please refer to the code if you need more help (fully documented).


## How do I go about customizing Journey.js?

To customize, and get more out of Journey.js, please read through the following documentation.


### 1. Public Functions:

To see a list of all the public functions available, click [here](https://github.com/williamtroup/Journey.js/blob/main/docs/PUBLIC_FUNCTIONS.md).


### 2. Configuration:

Configuration options allow you to customize how Journey.js will function.  You can set them as follows:

```markdown
<script> 
  $journey.setConfiguration( {
      safeMode: false
  } );
</script>
```

To see a list of all the available configuration options you can use, click [here](https://github.com/williamtroup/Journey.js/blob/main/docs/CONFIGURATION_OPTIONS.md).