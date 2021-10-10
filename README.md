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

## Getting started

```js
let prompt = await new SmartPrompt(
  {
    figureColor: "#bada55",
    groundColor: "#fafae9",
    title: "This is a title",
    prescription: "This is the text under the title",
    postscription: "This is the text at the bottom befor the buttons",
    template: `<div style="display: grid; grid-gap: 1rem;">
  <input name="myNumber" type="number" min="0" max="10" placeholder="Age">
  <input name="myText" type="text" minlength="3" maxlength="10" placeholder="Username" required="true">
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
```

Once the user is done and clicks on submit prompt will be valorized to an object containing key value pairs.

## Demo

[SmartPrompt on Codepen](https://codepen.io/eternalsunshineofspotlessmind/pen/WNOVdyQ?editors=0010)
