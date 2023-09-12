<script>
  import { getCSSCustomProperty, moveable, tooltip } from "svelte-lib/functions"
  import { mounted } from "svelte-lib/stores/utils"
  import { Select, Slider, Text } from "svelte-lib/components"

  export let route
  export let data

  let textWidth
  let textHeight
  let items = {
    textInput: [
      {
        value: "Testing the SVG Text component, which formats text elements within SVG objects.",
        label: "Testing the SVG Text component, which formats text elements within SVG objects.",
      },
    ],
    textInputClasses: [
      { category: "Font Family", value: "font-mono", label: "font-mono" },
      { category: "Font Family", value: "font-sans", label: "font-sans" },
      { category: "Font Family", value: "font-serif", label: "font-serif" },
      { category: "Font Size", value: "text-xs", label: "text-xs" },
      { category: "Font Size", value: "text-sm", label: "text-sm" },
      { category: "Font Size", value: "text-base", label: "text-base" },
      { category: "Font Size", value: "text-lg", label: "text-lg" },
      { category: "Font Size", value: "text-xl", label: "text-xl" },
      { category: "Font Smoothing", value: "antialiased", label: "antialiased" },
      { category: "Font Smoothing", value: "subpixel-antialiased", label: "subpixel-antialiased" },
      { category: "Font Style", value: "italic", label: "italic" },
      { category: "Font Style", value: "not-italic", label: "not-italic" },
      { category: "Font Weight", value: "font-thin", label: "font-thin" },
      { category: "Font Weight", value: "font-extralight", label: "font-extralight" },
      { category: "Font Weight", value: "font-light", label: "font-light" },
      { category: "Font Weight", value: "font-normal", label: "font-normal" },
      { category: "Font Weight", value: "font-medium", label: "font-medium" },
      { category: "Font Weight", value: "font-semibold", label: "font-semibold" },
      { category: "Font Weight", value: "font-bold", label: "font-bold" },
      { category: "Font Weight", value: "font-extrabold", label: "font-extrabold" },
      { category: "Text Align", value: "text-left", label: "text-left" },
      { category: "Text Align", value: "text-center", label: "text-center" },
      { category: "Text Align", value: "text-right", label: "text-right" },
      { category: "Letter Spacing", value: "tracking-tighter", label: "tracking-tighter" },
      { category: "Letter Spacing", value: "tracking-tight", label: "tracking-tight" },
      { category: "Letter Spacing", value: "tracking-normal", label: "tracking-normal" },
      { category: "Letter Spacing", value: "tracking-wide", label: "tracking-wide" },
      { category: "Letter Spacing", value: "tracking-wider", label: "tracking-wider" },
      { category: "Letter Spacing", value: "tracking-widest", label: "tracking-widest" },
      { category: "Line Height", value: "leading-none", label: "leading-none" },
      { category: "Line Height", value: "leading-tight", label: "leading-tight" },
      { category: "Line Height", value: "leading-snug", label: "leading-snug" },
      { category: "Line Height", value: "leading-normal", label: "leading-normal" },
      { category: "Line Height", value: "leading-relaxed", label: "leading-relaxed" },
      { category: "Line Height", value: "leading-loose", label: "leading-loose" },
      { category: "Text Decoration", value: "line-through", label: "line-through" },
      { category: "Text Decoration", value: "overline", label: "overline" },
      { category: "Text Decoration", value: "underline", label: "underline" },
      { category: "Text Decoration Style", value: "decoration-dashed", label: "decoration-dashed" },
      { category: "Text Decoration Style", value: "decoration-dotted", label: "decoration-dotted" },
      { category: "Text Decoration Style", value: "decoration-double", label: "decoration-double" },
      { category: "Text Decoration Style", value: "decoration-solid", label: "decoration-solid" },
      { category: "Text Decoration Style", value: "decoration-wavy", label: "decoration-wavy" },
      { category: "Text Transform", value: "capitalize", label: "capitalize" },
      { category: "Text Transform", value: "lowercase", label: "lowercase" },
      { category: "Text Transform", value: "uppercase", label: "uppercase" },
    ],
    overflowBody: [
      { value: true, label: "True" },
      { value: false, label: "False" },
    ],
    wrapBody: [
      { value: true, label: "True" },
      { value: false, label: "False" },
    ],
  }

  let value = {
    textInput: items.textInput[0],
    textInputClasses: [{ value: "text-lg", label: "text-lg" }],
    overflowBody: items.overflowBody[0],
    wrapBody: items.wrapBody[0],
    textBodyPadding: 10,
  }

  let classes = []
  $: {
    classes = [value.overflowBody.value ? "overflow-scroll" : "overflow-hidden"]
    classes = value.wrapBody.value
      ? classes.concat(["whitespace-pre-wrap"])
      : classes.concat(["whitespace-nowrap", "text-ellipsis"])
    classes = classes.concat(value.textInputClasses.map(v => v.value))
  }
</script>

<div class="rounded-md bg-indigo-500 w-full h-full">
  <div class="no-highlight absolute text-dmedgray-2 text-xl top-4 left-4">SVG Text Component</div>
  <div class="flex flex-col items-center">
    <div class="w-full grid grid-cols-3 mt-12">
      <div class="no-highlight flex flex-col items-start text-dmedgray-2 ml-4">
        <div class="text-lg mt-2">
          Classes obtained from <a
            class="highlight cursor-pointer text-purple-300 font-medium [text-decoration:none] hover:[text-decoration:underline]"
            href="https://tailwindcss.com/docs/installation"
            target="_blank"
            rel="noreferrer">Tailwind CSS</a
          >.
        </div>
        <br />
        Classes: {classes.length ? classes.join(", ") : ""}<br />
        Width: {textWidth ? textWidth.toLocaleString() + "px" : ""}<br />
        Height: {textHeight ? textHeight.toLocaleString() + "px" : ""}<br />
        Padding: {value.textBodyPadding.toLocaleString()}px
      </div>
      <div class="flex flex-col">
        <Select
          wrapperClasses="self-center w-96"
          value={value.textInput}
          items={items.textInput}
          creatable={true}
          wrapValue={false}
          wrapItems={true}
          placeholder="Enter text to test the component."
          on:valueChange={({ detail: e }) => (value.textInput = e.d)}
          on:itemsChange={({ detail: e }) => (items.textInput = e.d)}
        />
        <Select
          wrapperClasses="self-center w-96 mt-3"
          value={value.textInputClasses}
          items={items.textInputClasses}
          groupBy="category"
          multiple={true}
          creatable={true}
          placeholder="Choose classes for the text selection."
          on:valueChange={({ detail: e }) => (value.textInputClasses = e.d)}
          on:itemsChange={({ detail: e }) => (items.textInputClasses = e.d)}
        />
      </div>
      <div class="flex flex-col grid grid-cols-2 mr-12">
        {#if $mounted}
          <Slider
            wrapperClasses="text-dmedgray-2 w-64 pr-2"
            title="Padding"
            value={value.textBodyPadding}
            step={1}
            min={0}
            max={100}
            middle={false}
            suffix="px"
            tickColor={getCSSCustomProperty("--dmedgray-8")}
            labelColor={getCSSCustomProperty("--dmedgray-2")}
            floatBackgroundColorFocus={getCSSCustomProperty("--dmed-9")}
            on:valueChange={({ detail: e }) => (value.textBodyPadding = e.d)}
          />
        {/if}
        <div class="flex flex-col items-end min-w-max">
          <div class="flex">
            <span
              class="no-highlight text-dmedgray-2 mt-3 mr-3"
              title="Applies the Tailwind class <span class='font-medium'>overflow-scroll</span> when <code class='bg-red-50 text-red-500'>True</code>, and <span class='font-medium'>overflow-hidden</span> when <code class='bg-red-50 text-red-500'>False</code>."
              use:tooltip>Overflow Scroll:</span
            >
            <Select
              wrapperClasses="w-24"
              value={value.overflowBody}
              items={items.overflowBody}
              clearable={false}
              centeredValue={true}
              centeredItems={true}
              on:valueChange={({ detail: e }) => (value.overflowBody = e.d)}
            />
          </div>
          <div class="flex mt-6">
            <span
              class="no-highlight text-dmedgray-2 mt-3 mr-3"
              title="Applies Tailwind classes <span class='font-medium'>whitespace-nowrap</span>, and <span class='font-medium'>text-ellipsis</span> when <code class='bg-red-50 text-red-500'>False</code>."
              use:tooltip>Wrap Text:</span
            >
            <Select
              wrapperClasses="w-24"
              value={value.wrapBody}
              items={items.wrapBody}
              clearable={false}
              centeredValue={true}
              centeredItems={true}
              on:valueChange={({ detail: e }) => (value.wrapBody = e.d)}
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex w-64 max-w-2xl h-min max-h-60 mt-10"
      bind:clientWidth={textWidth}
      bind:clientHeight={textHeight}
      use:moveable
    >
      <svg
        class={value.textInput && value.textInput.value ? "" : "bg-white rounded-xl"}
        width={textWidth}
        height={textHeight}
      >
        <Text
          classes="border border-solid [border-width:1.5px] rounded-xl border-gray-400"
          bodyClasses={value.textInputClasses.length ? value.textInputClasses.map(v => v.value).join(" ") : ""}
          width={textWidth}
          height={textHeight}
          overflowBody={value.overflowBody.value}
          wrapBody={value.wrapBody.value}
          bodyText={value.textInput && value.textInput.value ? value.textInput.value : ""}
          bodyPadding={{
            top: value.textBodyPadding,
            right: value.textBodyPadding,
            bottom: value.textBodyPadding,
            left: value.textBodyPadding,
          }}
          backgroundColor="white"
        />
      </svg>
    </div>
  </div>
</div>
