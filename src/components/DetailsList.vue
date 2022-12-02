<script setup lang="ts">
const { t } = useI18n()
const DetailActiveNum = ref(1)
const SearchDetailsDom = ref<HTMLDetailsElement | null>(null)
const ToolDetailsDom = ref<HTMLDetailsElement | null>(null)
const MediaDetailsDom = ref<HTMLDetailsElement | null>(null)

const SearchDetailControl = () => {
  if (DetailActiveNum.value === 1)
    DetailActiveNum.value = 0
  else
    DetailActiveNum.value = 1
}
const ToolDetailControl = () => {
  if (DetailActiveNum.value === 2)
    DetailActiveNum.value = 0
  else
    DetailActiveNum.value = 2
}
const MediaDetailControl = () => {
  if (DetailActiveNum.value === 3)
    DetailActiveNum.value = 0
  else
    DetailActiveNum.value = 3
}
watch(DetailActiveNum, () => {
  if (DetailActiveNum.value === 1) {
    MediaDetailsDom.value!.open = false
    ToolDetailsDom.value!.open = false
  }
  if (DetailActiveNum.value === 2) {
    SearchDetailsDom.value!.open = false
    MediaDetailsDom.value!.open = false
  }
  if (DetailActiveNum.value === 3) {
    ToolDetailsDom.value!.open = false
    SearchDetailsDom.value!.open = false
  }
})
onMounted(() => {
  SearchDetailsDom.value!.open = true
})
</script>

<template>
  <details ref="SearchDetailsDom" text-xs @click="SearchDetailControl">
    <summary list-none flex items-center>
      <i v-show="(DetailActiveNum !== 1)" bg-black dark:bg-gray-200 i-jam-chevron-right text-center />
      <i v-show="(DetailActiveNum === 1)" bg-black dark:bg-gray-200 i-jam-chevron-down text-center />
      <p dark:text-gray-200 text-black text-xs font-bold leading-8 cursor-pointer>
        {{ t('helper.Index-List-Search') }}
      </p>
    </summary>
    <section flex>
      <div flex flex-col md:flex-row justify-center>
        <li list-none md:mt-2 md:mb-2>
          <p flex items-center transition-all dark:text-gray-200 text-black text-xs p-1>
            <i m-1 i-jam-google text-sm /><span transition-all dark:text-gray-200 text-black text-xs bg-gray-200 dark:bg-dark-100 p-1 rounded>google / gg</span>
          </p>
        </li>
        <li list-none md:mt-2 md:mb-2>
          <p flex items-center transition-all dark:text-gray-200 text-black text-xs p-1>
            <i m-1 i-jam-bing text-sm /><span transition-all dark:text-gray-200 text-black text-xs bg-gray-200 dark:bg-dark-100 p-1 rounded>bing / bi</span>
          </p>
        </li>
      </div>
      <div flex flex-col md:flex-row justify-center>
        <li list-none md:mt-2 md:mb-2>
          <p flex items-center transition-all dark:text-gray-200 text-black text-xs p-1>
            <i m-1 i-jam-baidu text-sm /><span transition-all dark:text-gray-200 text-black text-xs bg-gray-200 dark:bg-dark-100 p-1 rounded>baidu / bd</span>
          </p>
        </li>
        <li list-none md:mt-2 md:mb-2>
          <p flex items-center transition-all dark:text-gray-200 text-black text-xs p-1>
            <i m-1 i-jam-yahoo text-sm /><span transition-all dark:text-gray-200 text-black text-xs bg-gray-200 dark:bg-dark-100 p-1 rounded>yahoo / yh</span>
          </p>
        </li>
      </div>
    </section>
  </details>
  <details ref="ToolDetailsDom" text-xs @click="ToolDetailControl">
    <summary list-none flex items-center>
      <i v-show="(DetailActiveNum !== 2)" bg-black dark:bg-gray-200 i-jam-chevron-right text-center />
      <i v-show="(DetailActiveNum === 2)" bg-black dark:bg-gray-200 i-jam-chevron-down text-center />
      <p dark:text-gray-200 text-black text-xs font-bold leading-8 cursor-pointer>
        {{ t('helper.Index-List-Tool') }}
      </p>
    </summary>
    <section flex>
      <div flex flex-col md:flex-row justify-center>
        <li list-none md:mt-2 md:mb-2>
          <p flex items-center transition-all dark:text-gray-200 text-black text-xs p-1>
            <i m-1 i-jam-github text-sm /><span transition-all dark:text-gray-200 text-black text-xs bg-gray-200 dark:bg-dark-100 p-1 rounded>github / gh</span>
          </p>
        </li>
        <li list-none md:mt-2 md:mb-2>
          <p flex items-center transition-all dark:text-gray-200 text-black text-xs p-1>
            <i m-1 i-jam-stackoverflow text-sm /><span transition-all dark:text-gray-200 text-black text-xs bg-gray-200 dark:bg-dark-100 p-1 rounded>sof / so</span>
          </p>
        </li>
      </div>
      <div flex flex-col md:flex-row justify-center>
        <li list-none md:mt-2 md:mb-2>
          <p flex items-center transition-all dark:text-gray-200 text-black text-xs p-1>
            <i m-1 i-jam-npm text-sm /><span transition-all dark:text-gray-200 text-black text-xs bg-gray-200 dark:bg-dark-100 p-1 rounded>npm / n</span>
          </p>
        </li>
        <li list-none md:mt-2 md:mb-2>
          <p flex items-center transition-all dark:text-gray-200 text-black text-xs p-1>
            <i m-1 i-jam-codepen text-sm /><span transition-all dark:text-gray-200 text-black text-xs bg-gray-200 dark:bg-dark-100 p-1 rounded>codepen / cp</span>
          </p>
        </li>
      </div>
    </section>
  </details>
  <details ref="MediaDetailsDom" text-xs @click="MediaDetailControl">
    <summary list-none flex items-center>
      <i v-show="(DetailActiveNum !== 3)" bg-black dark:bg-gray-200 i-jam-chevron-right text-center />
      <i v-show="(DetailActiveNum === 3)" bg-black dark:bg-gray-200 i-jam-chevron-down text-center />
      <p dark:text-gray-200 text-black text-xs font-bold leading-8 cursor-pointer>
        {{ t('helper.Index-List-Media') }}
      </p>
    </summary>
    <section flex>
      <div flex flex-col md:flex-row justify-center>
        <li list-none md:mt-2 md:mb-2>
          <p flex items-center transition-all dark:text-gray-200 text-black text-xs p-1>
            <i m-1 i-jam-youtube text-sm /><span transition-all dark:text-gray-200 text-black text-xs bg-gray-200 dark:bg-dark-100 p-1 rounded>youtube / yt</span>
          </p>
        </li>
        <li list-none md:mt-2 md:mb-2>
          <p flex items-center transition-all dark:text-gray-200 text-black text-xs p-1>
            <i m-1 i-jam-instagram text-sm /><span transition-all dark:text-gray-200 text-black text-xs bg-gray-200 dark:bg-dark-100 p-1 rounded>instagram / ins</span>
          </p>
        </li>
      </div>
    </section>
  </details>
  <p p-1 text-xs dark:text-gray-200 text-dark-100 leading-8>
    {{ t('helper.Index-List-URL') }}
    <i text-xs p-2 m-1 i-carbon-earth-filled /> <span font-normal><span transition-all dark:text-gray-200 text-black text-xs bg-gray-200 dark:bg-dark-100 p-1 rounded>url / u</span></span>
  </p>
</template>
