var SmartPrompt;(()=>{var t={10:t=>{function n(t={}){this.uuid=Math.random().toString(36).slice(2)}n.prototype.init=function(t){if(this.title=t.title||"",this.prescription=t.prescription||"",this.postscription=t.postscription||"",this.template=t.template,!this.template)throw new Error("You must provide a valid template.");if(this.figureColor=t.figureColor||"#111",this.groundColor=t.groundColor||"#fffff1",this.textColor=t.textColor||"#111",this.BGGradientFrom=t.BGGradientFrom||"#0008",this.BGGradientTo=t.BGGradientTo||"#fff8",this.width=t.width||"90vw",this.maxWidth=t.maxWidth||"480px",this.excludeConfirmation=t.excludeConfirmation||!1,!this.isValidTemplate(this.template))throw console.error(this.template),new Error('Template provided is invalid. The syntax is invalid, or it\'s a missing a name on an input or required is not specified as required="true"')},n.prototype.spawn=function(){return new Promise(((t,n)=>{let e=document.createElement("DIV");e.innerHTML=this.getBoilerPlate(),e.firstElementChild.addEventListener("click",(t=>{t.target.classList[0]==="modal-wrapper"+this.uuid&&this.cancel()})),document.body.appendChild(e.firstElementChild),this.fade(1),window["prompt"+this.uuid]=this,this.resolve=t,this.reject=n}))},n.prototype.fade=function(t,n=(()=>{})){let e=document.querySelector(".modal-wrapper"+this.uuid);e.querySelector(".modal-content").style.opacity=t,setTimeout((()=>{e.style.opacity=t,n()}),300)},n.prototype.getForm=function(){return document.querySelector(".modal-wrapper"+this.uuid).querySelector("form")},n.prototype.parseResult=function(){return[...new FormData(this.getForm()).entries()].reduce(((t,n)=>(t[n[0]]=n[1],t)),{})},n.prototype.removeModal=function(){this.fade(0,(()=>{document.body.removeChild(document.querySelector(".modal-wrapper"+this.uuid))})),delete window["prompt"+this.uuid]},n.prototype.isValidTemplate=function(t){let n=document.createElement("DIV");return n.innerHTML=t,n.innerHTML===t&&[...n.querySelectorAll("input"),...n.querySelectorAll("select")].every((t=>t.getAttribute("name")))},n.prototype.submit=function(t){if(void 0!==t)return this.resolve(t),void this.removeModal();if(this.getForm().checkValidity())this.resolve(this.parseResult()),this.removeModal();else{let t=document.querySelector(".modal-wrapper"+this.uuid).querySelector(".modal-content");t.classList.add("error-animation"),setTimeout((()=>{t.classList.remove("error-animation")}),300)}},n.prototype.cancel=function(){this.removeModal(),this.reject("Aborted by the user.")},n.prototype.getBoilerPlate=function(){return`<div class="modal-wrapper${this.uuid}">\n    <style>\n      body {\n        overflow: hidden;\n      }\n  \n      .modal-wrapper${this.uuid} ::-webkit-scrollbar {\n        width: 1rem;\n      }\n  \n      .modal-wrapper${this.uuid} ::-webkit-scrollbar-track {\n        background-color: ${this.groundColor};\n        background-image: linear-gradient(\n          90deg,\n          #ddd,\n          10%,\n          ${this.groundColor}\n        );\n      }\n  \n      .error-animation {\n        animation: ErrorAnimation .3s;\n      }\n  \n      @keyframes ErrorAnimation {\n        0% { transform: rotateZ(0); }\n        25% { transform: rotateZ(-3deg); }\n        50% { transform: rotateZ(3deg); }\n        75% { transform: rotateZ(-3deg); }\n        100% { transform: rotateZ(0); }\n      }\n  \n      .modal-wrapper${this.uuid} ::-webkit-scrollbar-thumb {\n        border-radius: 1rem;\n        background-color: ${this.figureColor};\n        background-image: linear-gradient(\n          90deg,\n          #ddd,\n          10%,\n          ${this.figureColor}\n        );\n      }\n  \n      .modal-wrapper${this.uuid} input[type="number"],\n      .modal-wrapper${this.uuid} input[type="text"],\n      .modal-wrapper${this.uuid} select {\n        width: 100%;\n        padding: .5rem;\n        border: 2px solid ${this.figureColor};\n        border-radius: 1rem;\n        color: ${this.textColor};\n        background-color: #0000;\n      }\n\n      .modal-wrapper${this.uuid} button {\n        padding: 1rem;\n        border: 0;\n        border-radius: 1rem;\n        color: ${this.groundColor};\n        background-color: ${this.figureColor};\n        transition: all .3s ease;\n        cursor: pointer;\n      }\n\n      .modal-wrapper${this.uuid} button:hover {\n        transform: translateY(-5px);\n        box-shadow: 0 10px 20px #0002;\n      }\n  \n      .modal-wrapper${this.uuid} input:invalid,\n      .modal-wrapper${this.uuid} select:invalid {\n        box-shadow: 0 0 4px 2px orange\n      }\n  \n      .modal-wrapper${this.uuid} {\n        position: fixed;\n        top: 0;\n        z-index: 999999;\n        width: 100vw;\n        height: 100vh;\n        display: grid;\n        justify-items: center;\n        align-items: center;\n        color: ${this.textColor};\n        background-image: linear-gradient(\n          135deg,\n          ${this.BGGradientFrom},\n          ${this.BGGradientTo}\n        );\n        background-size: 300% 300%;\n        opacity: 0;\n        animation: MoveBG 30s ease infinite alternate;\n        transition: all .3s ease;\n      }\n  \n      @keyframes MoveBG {\n        from {\n          background-position: 0% 0%;\n        }\n        to {\n          background-position: 100% 100%;\n        }\n      }\n  \n      .modal-wrapper${this.uuid} .modal-content  {\n        width: ${this.width};\n        max-width: ${this.maxWidth};\n        max-height: 90vh;\n        padding: 1rem;\n        overflow: auto;\n        background-color: ${this.groundColor};\n        border-radius: 1rem;\n        box-shadow: 0 10px 20px #0006;\n        opacity: 0;\n        transition: all .3s ease;\n      }\n  \n      .modal-wrapper${this.uuid} .title {\n        color: ${this.figureColor};\n      }\n  \n      .modal-wrapper${this.uuid} .buttons {\n        display: flex;\n        justify-content: space-around;\n        gap: 1rem;\n      }\n  \n      .modal-wrapper${this.uuid} .submit ,\n      .modal-wrapper${this.uuid} .cancel {\n        width: 100%;\n      }\n  \n      .modal-wrapper${this.uuid} .submit {\n        border: 0;\n        color: ${this.groundColor};\n        background-color: ${this.figureColor};\n      }\n  \n      .modal-wrapper${this.uuid} .cancel {\n        border: 2px solid;\n        color: ${this.figureColor};\n        background-color: ${this.groundColor};\n      }\n    </style>\n    <div class="modal-content">\n      <form onsubmit="return false;">\n        <h3 class="title">${this.title}</h3>\n        <div style="margin: 1.5rem 0;">${this.prescription}</div>\n        ${this.template}\n        <div style="margin: 1.5rem 0;">${this.postscription}</div>\n        <div ${this.excludeConfirmation?'style="display: none;"':""} class="buttons">\n          <button type="button" class="submit" onclick="prompt${this.uuid}.submit()">Submit</button>\n          <button type="button" class="cancel" onclick="prompt${this.uuid}.cancel()">Cancel</button>\n        </div>\n      </form>\n    </div>\n  </div>`},t.exports=n}},n={},e=function e(r){var o=n[r];if(void 0!==o)return o.exports;var i=n[r]={exports:{}};return t[r](i,i.exports,e),i.exports}(10);SmartPrompt=e})();