<script setup lang='ts'>
const { t, availableLocales, locale } = useI18n()
const locales = availableLocales
locale.value = locales[2]
const toggleLocales = () => {
  // change to some real logic
  if (locale.value === locales[15])
    locale.value = locales[2]
  else
    locale.value = locales[15]
}
// handle modal
const modalActive = ref(false)
const handleModal = () => {
  modalActive.value = !modalActive.value
}
const { Escape } = useMagicKeys()
const { meta_k, control_k } = useMagicKeys({
  passive: false,
  onEventFired(e: any) {
    if (((e.ctrlKey || e.metaKey) && e.key === 'k') && e.type === 'keydown')
      e.preventDefault()
  },
})
const shortcutsHandleModal = () => {
  modalActive.value = true
}
// mete+k or ctrl + k
whenever(meta_k, shortcutsHandleModal)
whenever(control_k, shortcutsHandleModal)
// Esc
watch(Escape, () => {
  modalActive.value = false
})
</script>

<template>
  <header relative w-full flex justify-end items-center pr-4 pt-4>
    <button
      transition-all
      mr-2
      ml-2
      dark:text-white text-lg op75 hover:op100 i-carbon-language
      @click="toggleLocales()"
    />
    <button v-show="isDark" transition-all op75 hover:op100 ml-2 mr-2 dark:text-white text-lg i-jam-moon @click="toggleDark()" />
    <button v-show="!isDark" transition-all op75 hover:op100 ml-2 mr-2 dark:text-white text-lg i-jam-sun @click="toggleDark()" />
    <button op75 hover:op100 text-xs ml-2 mr-2 w-24 border-2 rounded-lg p-1 hover:border-black border-dark-200 dark:border-gray-400 text-black dark:text-white trans ease-in-out duration-300 @click="handleModal">
      {{ t('help.how-to-use') }}
    </button>
  </header>
  <div v-show="modalActive" w-full h-full absolute z-20 dark:bg-dark-700 bg-gray-50 op75 />
  <div v-show="modalActive" w-full h-full absolute flex justify-center items-center>
    <div class="overflow-hidden transition-all ease-in-out w-full select-none lg:w-3/5 xl:w-1/2  2xl:w-1/3  md:w-3/4  md:h-3/4 h-full " border-1 border-gray-200 dark:border-dark-200 md:rounded-lg z-24 bg-gray-100 dark:bg-dark-400 p-5 md:p-5>
      <div w-full>
        <div flex items-center justify-between mb-3 pl-2 pr-2>
          <p font-sans font-extrabold text-dark-100 dark:text-gray-200 text-center flex items-center>
            {{ t('helper.title') }}
          </p>
          <div flex items-center>
            <p hidden md:flex text-white text-xs pl-1 pr-1 border-2 font-bold border-dark-100 dark:border-gray-200 rounded text-black dark:text-gray-200>
              Esc
            </p>
            <p hidden md:flex ml-2 dark:text-gray-200 text-black>
              Or
            </p>
            <i text-white m-1 text-xl text-dark-200 dark:text-gray-200 cursor-pointer class="i-carbon-close" @click="handleModal" />
          </div>
        </div>
        <hr dark:border-dark-100 border-gray-200 transition-all ease-in-out duration-300>
        <div mt-2 pr-2 pl-2>
          <p dark:text-gray-200 text-black text-sm font-bold leading-8>
            {{ t('helper.what-is-aggr') }}
          </p>
          <p dark:text-gray-200 text-black text-xs leading-8>
            -<span transition-all text-xs bg-gray-200 dark:bg-dark-100 p-1 ml-1 mr-1 rounded>Aggr</span>{{ t('helper.About-aggr-name') }}<br>- {{ t('helper.About-aggr-content') }}
          </p>
          <p mt-2 dark:text-gray-200 text-black text-sm font-bold leading-8>
            {{ t('helper.htu-title') }}
          </p>
          <p dark:text-gray-200 text-black text-xs leading-8>
            - {{ t('helper.htu-start') }}<span transition-all text-xs bg-gray-200 dark:bg-dark-100 p-1 ml-1 rounded>{{ t('helper.htu-formula') }}</span>{{ t('helper.htu-content-cn') }}
            {{ t('helper.htu-tab') }} <span transition-all text-xs bg-gray-200 dark:bg-dark-100 p-1 rounded mr-1 ml-1>tab</span>{{ t('helper.htu-tab-end') }}
          </p>
          <p dark:text-gray-200 text-black text-xs leading-8>
            - {{ t('helper.htu-example') }}<span text-xs transition-all bg-gray-200 dark:bg-dark-100 p-1 ml-1 mr-1 rounded>{{ t('helper.htu-formula-example') }}</span>{{ t('helper.htu-like') }}<span text-xs transition-all bg-gray-200 dark:bg-dark-100 p-1 ml-1 mr-1 rounded>{{ t('helper.htu-bing-cn') }}</span>{{ t('helper.htu-in-en') }}<span text-xs transition-all bg-gray-200 dark:bg-dark-100 p-1 ml-1 mr-1 rounded>{{}}{{ t('helper.htu-weather-cn') }}</span>
          </p>
        </div>
        <section mt-2 pr-2 pl-2>
          <p dark:text-gray-200 text-black text-sm font-bold leading-8>
            {{ t('helper.Index-List') }} <span text-xs op30>{{ t('helper.Index-List-formula') }}</span>
          </p>
          <DetailsList />
        </section>
      </div>
    </div>
  </div>
</template>

<style>
</style>
