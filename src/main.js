import TextDemo from "./lib/components/TextDemo.svelte"

import "../node_modules/svelte-lib/src/lib/static/styles/root.css"
import "../node_modules/svelte-lib/src/lib/static/styles/app.css"

let div = document.createElement("div")
div.classList.add("text-demo")

let script = document.currentScript
script.parentNode.insertBefore(div, script)

new TextDemo({
  target: div,
})
