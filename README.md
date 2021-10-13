# SmartPrompt

A neat dialog prompter to get inputs from the user.

## What I wanted to achieve

I want to be able to provide the developer with simplest API possible to gather inputs from the user, with beatiful prompts.

The promp is able to:
- Be awaited (async/await style)
- Be discarded (with outside click or cancel button click)
- Provide any complex template containing inputs
- Spit an error if the template is not valid HTML
- Have validation for inputs (with a lil animation)
- Have overflow scroll if there is too much content
- Two buttons, one to confirm and on to dismiss

## Install

`npm i smartprompt`

## Try it

Head over [TODO](TODO) and try the example there.

## Simple example

You can emulate a normal prompt (but with a better look) with the following code:

```js
// Get the handle of a SmartPrompt instance
let prompt = new SmartPrompt();

// Initialize the prompt
prompt.init(
  {
    title: "Simple prompt",
    template: `<div style="margin-bottom: .5rem;">How old are you?</div><input name="age" autocomplete="false" type="number">`
  }
);

// Spawn and await the prompt
let { age } = await prompt.spawn();
alert("You are " + age + "yo");
```

Once the user is done and clicks on submit prompt will be valorized to an object containing key value pairs.

## Advanced example

It's possible to have multiple inputs with validation and custom color schemes:

```js
// Get the handle of a SmartPrompt instance
let prompt = new SmartPrompt();

// Initialize the prompt
prompt.init(
  {
    figureColor: "#bada55", // Optional
    groundColor: "#fafae9", // Optional
    textColor: "#111", // Optional

    BGGradientFrom: "#0008", // Optional
    BGGradientTo: "#fff8", // Optional

    width: "90vw", // Optional
    maxWidth: "480px", // Optional

    title: "This is a title",
    prescription: "This is the text under the title", // Optional
    postscription: "This is the text at the bottom before the buttons", // Optional

    template: `<div style="display: grid; grid-gap: 1rem;">
    <input name="myNumber" autocomplete="false" type="number" min="0" max="99" placeholder="Age">
    <input name="myText" autocomplete="false" type="text" minlength="3" maxlength="10" placeholder="Username" required="true">
    <div>
      <input name="myCheck" type="checkbox" required="true">
      <label>Check</label>
    </div>
    <div>
      <input name="myRadio" type="radio" value="0">
      <label>Radio 1</label>
    </div>
    <div>
      <input name="myRadio" type="radio" value="1">
      <label>Radio 2</label>
    </div>
    <div>
      <input name="myRadio" type="radio" value="2">
      <label>Radio 3</label>
    </div>
    <select name="mySelect">
      <option value="0">Default</option>
      <option value="1">Another option</option>
    </select>
</div>`
  }
);

// Spawn and await the prompt
let obj = await prompt.spawn();
alert(JSON.stringify(obj, null, 2));
```


## Extreme example

It's possible to remove the confirm and cancel buttons with `excludeConfirmation: true` in the initialization setting, and consequently handle everything by hand.
To trigger confimation (1.) and cancellation (2.) from the template you can use:
1. `prompt${yourPromptInstance.uuid}.submit('your custom data')`
2. `prompt${yourPromptInstance.uuid}.cancel()`

The example below shows a list items, you can filter them with a search input and by clicking on any one of them you will get it's underlying object:

```js
// Get the handle of a SmartPrompt instance
let prompt = new SmartPrompt();

// Make some options procedurally
let tokenList = [
    {
      name: "Ethereum",
      symbol: "ETH",
      thumb: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
      address: "0x0000000000000000000000000000000000000000",
      decimals: "18"
    },
    // Imagine many more tokens here
    {
      name: "Crypto.com Coin",
      symbol: "cro",
      thumb: "https://assets.coingecko.com/coins/images/7310/thumb/cypto.png",
      address: "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b",
      decimals: "8"
    }
];

// Let's build the markup!
let optionsMarkup = tokenList.map((d, i) => {
  return `<div class="option" onclick="prompt${prompt.uuid}.submit(${i});">
  <img class="option-img" src="${d.thumb}">
  <div class="option-title">${d.name}</div>
  <div class="option-descr">${d.address}</div>
</div>`;
  })
  .join("");

// Initialize the prompt
prompt.init(
  {
    excludeConfirmation: true,

    figureColor: "coral",
    groundColor: "cornsilk",
    textColor: "darkslategrey",

    BGGradientFrom: "#f198",
    BGGradientTo: "#19f8",

    title: "Choose one option",
    prescription: "Tap on a choice to proceed with a selection",

    template: `<div style="display: grid; grid-gap: 1rem;">
    <style>
      .select {
        display: grid;
        grid-gap: .5rem;
      }
      .option {
        display: grid;
        grid-gap: .5rem;
        grid-template-areas: "img title"
                             "img descr";
        grid-template-columns: max-content auto;
        align-items: center;
        padding: 1rem;
        border-radius: 1rem;
        color: #fffff1;
        background-color: #111;
        background-image: linear-gradient(135deg, #f758, #ffd8);
        cursor: pointer;
      }
      .option-img {
        grid-area: img;
        height: 32px;
      }
      .option-title {
        grid-area: title;
        font-size: 1.33rem;
        font-weight: bold;
      }
      .option-descr {
        grid-area: descr;
        word-break: break-all;
      }
    </style>
    <button type="button" onclick="addNewCustomToken();">Add custom token</button>
    <input type="text" autocomplete="off" name="search" placeholder="Search" oninput="[...document.querySelectorAll('.option-title')].forEach(opt => { opt.parentElement.style.display = (opt.innerText.toLowerCase().includes(this.value)) ? 'grid' : 'none' });">
    <div class="select" id="token-list">
      ${optionsMarkup}
    </div>
</div>`
    }
);

// Spawn and await the prompt
let index = await prompt.spawn();
alert(JSON.stringify(tokenList[index], null, 2));
```

## Demo

[SmartPrompt on Codepen](https://codepen.io/eternalsunshineofspotlessmind/pen/WNOVdyQ?editors=0010)
