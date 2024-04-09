# Journey.js v1.5.0

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Journey.js%2C%20a%20free%20JavaScript%journey%builder&url=https://github.com/williamtroup/Journey.js&hashtags=javascript,html,journey,guide)
[![npm](https://img.shields.io/badge/npmjs-v1.5.0-blue)](https://www.npmjs.com/package/jjourney.js)
[![nuget](https://img.shields.io/badge/nuget-v1.5.0-purple)](https://www.nuget.org/packages/jJourney.js/)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/williamtroup/Journey.js/blob/main/LICENSE.txt)
[![discussions Welcome](https://img.shields.io/badge/discussions-Welcome-red)](https://github.com/williamtroup/Journey.js/discussions)
[![coded by William Troup](https://img.shields.io/badge/coded_by-William_Troup-yellow)](https://www.william-troup.com/)

> 🚶 A lightweight, easy-to-use JavaScript library to create interactive, customizable, accessible guided tours across your websites or web apps!


## What features does Journey.js have?

- Zero-dependencies and extremely lightweight!
- Full API available via public functions.
- Fully styled in CSS/SASS and compatible with the Bootstrap library.
- Full CSS theme support (using :root variables, with a default dark-mode theme).
- Custom triggers for actions (when the dialog is shown for an element, or hidden, etc).
- Shortcut keys (click [here](https://www.william-troup.com/journey-js/documentation/shortcut-keys.html) to see the full list).
- Browser URL parameters support (click [here](https://www.william-troup.com/journey-js/documentation/browser-parameters.html) to see the full list).
- Hints support (not included in the main journey).
- 51 language translations available!
- Customizable tooltips.
- Show progress dots, or a progress bar, or both!


## Where can I find the documentation?

All the documentation can be found [here](https://www.william-troup.com/journey-js/documentation/index.html):  
<br>
<br>


## What browsers are supported?

All modern browsers (such as Google Chrome, FireFox, and Opera) are fully supported.


## What languages are supported?

- `af` Afrikaans
- `ar` Arabic
- `hy` Armenian
- `be` Belarusian
- `bn` Bengali
- `bg` Bulgarian
- `ca` Catalan
- `zh` Chinese (simplified)
- `da` Danish
- `nl` Dutch
- `en` English (default)
- `eo` Esperanto
- `et` Estonian
- `fa` Farsi
- `fi` Finnish
- `fr` French
- `fy` Frisian
- `gl` Galician
- `ka` Georgian
- `de` German
- `el` Greek
- `he` Hebrew
- `hi` Hindi
- `hu` Hungarian
- `is` Icelandic
- `id` Indonesian
- `ga` Irish
- `it` Italian
- `ja` Japanese
- `ko` Korean
- `lv` Latvian
- `lt` Lithuanian
- `lb` Luxembourgish
- `ms` Malay
- `ne` Nepali
- `no` Norwegian
- `pl` Polish
- `pt` Portuguese
- `ro` Romanian
- `si` Sinhalese
- `sk` Slovak
- `sl` Slovenian
- `es` Spanish
- `sv` Swedish
- `tl` Tagalog
- `ta` Tamil
- `zh-tw` Taiwanese
- `te` Telugu
- `th` Thai
- `tr` Turkish
- `uk` Ukrainian


## What are the most recent changes?

To see a list of all the most recent changes, click [here](https://www.william-troup.com/journey-js/documentation/recent-changes.html).


## How do I install Journey.js?

You can install the library with npm into your local modules directory using the following command:

```markdown
npm install jjourney.js
```

Or, you can download the latest zipped up version [here](https://www.william-troup.com/journey-js/download.html).


## How do I get started?

To get started using Journey.js, do the following steps:

### 1. Prerequisites:

Make sure you include the "DOCTYPE html" tag at the top of your HTML, as follows:

```markdown
<!DOCTYPE html>
```

### 2. Include Files:

```markdown
<link rel="stylesheet" href="dist/Journey.js.css">
<script src="dist/Journey.js"></script>
```

### 3. DOM Element Binding:

```markdown
<button data-journey-js="{ 'title': 'Get Version', 'description': 'Logs the current version of Journey.js to the developers console.', 'order': 6 }" onclick="console.log( $journey.getVersion() );">Get Version</button>
```

To see a list of all the available binding options you can use for "data-journey-js", click [here](https://www.william-troup.com/journey-js/documentation/binding-options.html).

To see a list of all the available custom triggers you can use for "data-journey-js", click [here](https://www.william-troup.com/journey-js/documentation/binding-options-custom-triggers.html).


### 4. Finishing Up:

To start the journey, call the following public function:

```markdown
<script> 
  $journey.start();
</script>
```

That's it! Nice and simple. Please refer to the code if you need more help (fully documented).


## How do I go about customizing Journey.js?

To customize, and get more out of Journey.js, please read through the following documentation.


### 1. Public Functions:

To see a list of all the public functions available, click [here](https://www.william-troup.com/journey-js/documentation/public-functions.html).


### 2. Configuration:

Configuration options allow you to customize how Journey.js will function.  You can set them as follows:

```markdown
<script> 
  $journey.setConfiguration( {
      safeMode: false
  } );
</script>
```

To see a list of all the available configuration options you can use, click [here](https://www.william-troup.com/journey-js/documentation/options.html).

To see a list of all the available configuration option custom triggers you can use, click [here](https://www.william-troup.com/journey-js/documentation/custom-triggers.html).