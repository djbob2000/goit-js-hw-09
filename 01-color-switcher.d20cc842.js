!function(){var t=null;ref={startButton:document.querySelector("button[data-start]"),stopButton:document.querySelector("button[data-stop]"),elementWithChangedBg:document.querySelector("body")},ref.startButton.addEventListener("click",(function(){t=setInterval((function(){ref.elementWithChangedBg.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),ref.stopButton.addEventListener("click",(function(){clearInterval(t)}))}();
//# sourceMappingURL=01-color-switcher.d20cc842.js.map