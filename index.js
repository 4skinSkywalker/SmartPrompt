let calcTextColor = (hexColor) => {
  if (hexColor[0] === "#") {
    hexColor = hexColor.slice(1);
  }
  if (hexColor.length === 3) {
    hexColor = hexColor.split("").join("0") + "0";
  }
  return (parseInt(hexColor, 16) > 0xffffff/2) ? "#1f2d3d" : "#fffdfd";
}

function SmartPrompt(opts = {}) {
  this.uuid = Math.random().toString(36).slice(2); // Yes, this is a valid UUID...
}

SmartPrompt.prototype.init = function (opts) {
  this.title = opts.title || "";
  this.prescription = opts.prescription || "";
  this.postscription = opts.postscription || "";
  this.template = opts.template;

  if (!this.template) {
    throw new Error("You must provide a valid template.");
  }

  this.figureColor = opts.figureColor || "#111";
  this.groundColor = opts.groundColor || "#fffff1";

  // Calculate the best textColor if 1. not provided 2. groundColor is hex
  if (!opts.textColor && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6})$/.test(this.groundColor)) {
    this.textColor = calcTextColor(this.groundColor);
    console.log(this.textColor);
  } else {
    this.textColor = opts.textColor || "#111";
  }

  this.BGGradientFrom = opts.BGGradientFrom || "#0008";
  this.BGGradientTo = opts.BGGradientTo || "#fff8";

  this.width = opts.width || "90vw";
  this.maxWidth = opts.maxWidth || "480px";

  this.excludeConfirmation = opts.excludeConfirmation || false;
};

SmartPrompt.prototype.spawn = function () {

  // Return a promise and extract resolve and reject
  return new Promise((res, rej) => {

    // Open the modal
    let el = document.createElement("DIV");
    el.innerHTML = this.getBoilerPlate();

    // Setup so that clicking outside dismisses the dialog
    el.firstElementChild.addEventListener("click", (e) => {
      if (e.target.classList[0] === ("modal-wrapper" + this.uuid)) {
        this.cancel();
      }
    });

    document.body.appendChild(el.firstElementChild);

    this.fade(1);

    window["prompt" + this.uuid] = this; // "this" is SmartPrompt

    this.resolve = res;
    this.reject = rej;
  });
};

SmartPrompt.prototype.fade = function (value, callback = () => { }) {
  let modalWrapper = document.querySelector(".modal-wrapper" + this.uuid);
  let modalContent = modalWrapper.querySelector(".modal-content");
  modalContent.style.opacity = value;
  setTimeout(() => {
    modalWrapper.style.opacity = value;
    callback();
  }, 300);
};

SmartPrompt.prototype.getForm = function () {
  let modalWrapper = document.querySelector(".modal-wrapper" + this.uuid);
  return modalWrapper.querySelector("form");
}

SmartPrompt.prototype.parseResult = function () {
  let formData = new FormData(this.getForm());
  return [...formData.entries()]
    .reduce((result, tuple) => (result[tuple[0]] = tuple[1], result), {});
};

SmartPrompt.prototype.removeModal = function () {
  this.fade(0, () => {
    document.body.removeChild(document.querySelector(".modal-wrapper" + this.uuid));
  });

  delete window["prompt" + this.uuid];
};

SmartPrompt.prototype.submit = function (override) {

  // Override is when you decide to manually handle submission via the template
  if (override !== undefined) {
    this.resolve(override);
    this.removeModal();
    return;
  }

  if (this.getForm().checkValidity()) {
    this.resolve(this.parseResult());
    this.removeModal();
  } else {
    let modalWrapper = document.querySelector(".modal-wrapper" + this.uuid);
    let modalContent = modalWrapper.querySelector(".modal-content");
    modalContent.classList.add("error-animation");
    setTimeout(() => {
      modalContent.classList.remove("error-animation");
    }, 300);
  }
};

SmartPrompt.prototype.cancel = function () {
  this.removeModal();
  this.reject("Aborted by the user.");
};

SmartPrompt.prototype.getBoilerPlate = function () {
  return `<div class="modal-wrapper${this.uuid}">
    <style>
      body {
        overflow: hidden;
      }
  
      .modal-wrapper${this.uuid} ::-webkit-scrollbar {
        width: 1rem;
      }
  
      .modal-wrapper${this.uuid} ::-webkit-scrollbar-track {
        background-color: ${this.groundColor};
        background-image: linear-gradient(
          90deg,
          #ddd,
          10%,
          ${this.groundColor}
        );
      }
  
      .error-animation {
        animation: ErrorAnimation .3s;
      }
  
      @keyframes ErrorAnimation {
        0% { transform: rotateZ(0); }
        25% { transform: rotateZ(-3deg); }
        50% { transform: rotateZ(3deg); }
        75% { transform: rotateZ(-3deg); }
        100% { transform: rotateZ(0); }
      }
  
      .modal-wrapper${this.uuid} ::-webkit-scrollbar-thumb {
        border-radius: 1rem;
        background-color: ${this.figureColor};
        background-image: linear-gradient(
          90deg,
          #ddd,
          10%,
          ${this.figureColor}
        );
      }
  
      .modal-wrapper${this.uuid} input[type="number"],
      .modal-wrapper${this.uuid} input[type="text"],
      .modal-wrapper${this.uuid} select,
      .modal-wrapper${this.uuid} textarea {
        width: 100%;
        padding: .5rem;
        border: 2px solid ${this.figureColor};
        border-radius: 1rem;
        color: ${this.textColor};
        background-color: #0000;
      }

      .modal-wrapper${this.uuid} textarea {
        resize: vertical;
      }

      .modal-wrapper${this.uuid} button {
        padding: 1rem;
        border: 0;
        border-radius: 1rem;
        color: ${this.groundColor};
        background-color: ${this.figureColor};
        transition: all .3s ease;
        cursor: pointer;
      }

      .modal-wrapper${this.uuid} button:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px #0002;
      }
  
      .modal-wrapper${this.uuid} input:invalid,
      .modal-wrapper${this.uuid} select:invalid,
      .modal-wrapper${this.uuid} textarea:invalid {
        box-shadow: 0 0 4px 2px orange
      }
  
      .modal-wrapper${this.uuid} {
        position: fixed;
        top: 0;
        z-index: 999999;
        width: 100vw;
        height: 100vh;
        display: grid;
        justify-items: center;
        align-items: center;
        color: ${this.textColor};
        background-image: linear-gradient(
          135deg,
          ${this.BGGradientFrom},
          ${this.BGGradientTo}
        );
        background-size: 300% 300%;
        opacity: 0;
        animation: MoveBG 30s ease infinite alternate;
        transition: all .3s ease;
      }
  
      @keyframes MoveBG {
        from {
          background-position: 0% 0%;
        }
        to {
          background-position: 100% 100%;
        }
      }
  
      .modal-wrapper${this.uuid} .modal-content  {
        width: ${this.width};
        max-width: ${this.maxWidth};
        max-height: 90vh;
        padding: 1rem;
        overflow: auto;
        background-color: ${this.groundColor};
        border-radius: 1rem;
        box-shadow: 0 10px 20px #0006;
        opacity: 0;
        transition: all .3s ease;
      }
  
      .modal-wrapper${this.uuid} .title {
        color: ${this.figureColor};
      }
  
      .modal-wrapper${this.uuid} .buttons {
        display: flex;
        justify-content: space-around;
        gap: 1rem;
      }
  
      .modal-wrapper${this.uuid} .submit ,
      .modal-wrapper${this.uuid} .cancel {
        width: 100%;
      }
  
      .modal-wrapper${this.uuid} .submit {
        border: 0;
        color: ${this.groundColor};
        background-color: ${this.figureColor};
      }
  
      .modal-wrapper${this.uuid} .cancel {
        border: 2px solid;
        color: ${this.figureColor};
        background-color: ${this.groundColor};
      }
    </style>
    <div class="modal-content">
      <form onsubmit="return false;">
        <h3 class="title">${this.title}</h3>
        <div style="margin: 1.5rem 0;">${this.prescription}</div>
        ${this.template}
        <div style="margin: 1.5rem 0;">${this.postscription}</div>
        <div ${this.excludeConfirmation ? 'style="display: none;"' : ''} class="buttons">
          <button type="button" class="submit" onclick="prompt${this.uuid}.submit()">Submit</button>
          <button type="button" class="cancel" onclick="prompt${this.uuid}.cancel()">Cancel</button>
        </div>
      </form>
    </div>
  </div>`;
};

module.exports = SmartPrompt;
