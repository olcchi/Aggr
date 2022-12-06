<script setup lang="ts">
import { getEngineObj, getEngineSymbol, getQuery } from '../utils/search'
import { searchEngineMap } from '../utils/searchEngine'
import { isMac, isWin } from '~/utils/checkTargetSystem'
const { t } = useI18n()
const inputDom = ref<HTMLInputElement | null>(null)
const recent = ref<HTMLDivElement | null>(null)
const inputValue = ref('')
const searchHistory = ref(false)
const selextnum = ref(0)
const listIndex = ref(1)
const filterKey = ref<any[]>([])
const SearchKey = ref<any[]>([])
const Norecent = ref(true)
// onClickOutside(recent, () => searchHistory.value = false)
// search history
const dynamicPlaceHolder = computed(() => {
  if (isMac())
    return t('prompt.prompt-Mac')
  if (isWin())
    return t('prompt.prompt-Win')
  if (!(isMac() || isWin()))
    return t('prompt.prompt-mobile')
})
// 初始化列表
const initIndex = () => {
  if (SearchKey.value.length === 1)
    SearchKey.value[0].selectNum = 1
  if (SearchKey.value.length === 2) {
    SearchKey.value[0].selectNum = 1
    SearchKey.value[1].selectNum = 2
  }
  if (SearchKey.value.length === 3) {
    SearchKey.value[0].selectNum = 1
    SearchKey.value[1].selectNum = 2
    SearchKey.value[2].selectNum = 3
  }
}
// handle input focus and blur
const inputFocus = () => {
  initIndex()
  inputDom.value!.placeholder = ''
  if (inputValue.value) {
    searchHistory.value = true
    listIndex.value = 1
  }
}
const historySearch = (item: any) => {
  window.open(`${item.searchUrl}${item.query}`)
}
const inputBlur = () => {
  if (isMac())
    inputDom.value!.placeholder = t('prompt.prompt-Mac')
  if (isWin())
    inputDom.value!.placeholder = t('prompt.prompt-Win')
  if (!(isMac() || isWin()))
    inputDom.value!.placeholder = t('prompt.prompt-mobile')
}
const getItem = () => {
  if (!localStorage.getItem('Key'))
    localStorage.setItem('Key', '[]')
  SearchKey.value = JSON.parse(localStorage.getItem('Key') as string)
}
onMounted(() => {
  getItem()
})
// handle search
const query = ref('')
const engineName = ref('bing')
const searchUrl = ref('https://www.bing.com/search?q=')
// handle input
const handleInput = () => {
  const engineAbbr = getEngineSymbol(inputValue.value)
  const engine = getEngineObj(engineAbbr)

  if (engine) {
    // search engine & icon
    searchUrl.value = engine.searchUrl
    engineName.value = engine.name
  }
  // get query
  query.value = getQuery(inputValue.value, engineAbbr)
}
// handle search
const handleSearch = () => {
  if (query.value) {
    window.open(`${searchUrl.value}${query.value}`)
    // localStorage
    filterKey.value = SearchKey.value.filter((el) => {
      return !el.query.includes(query.value)
    })
    filterKey.value.unshift({ engine: engineName.value, query: query.value, selectNum: selextnum, searchUrl: searchUrl.value })
    localStorage.setItem('Key', JSON.stringify(filterKey.value) as string)
  }
}
watchArray(filterKey, () => {
  getItem()
}, { deep: true })
watchArray(SearchKey, () => {
  if (SearchKey.value.length)
    Norecent.value = false
  if (SearchKey.value.length > 3)
    SearchKey.value.length = 3
}, { deep: true })
// focus input when press keyboard
useEventListener(window, 'keydown', () => {
  inputDom.value?.focus()
})
// listen Esc key
const { Escape } = useMagicKeys()
watch(Escape, () => {
  inputDom.value?.blur()
  searchHistory.value = false
  listIndex.value = 1
})
// listen tab key
const { tab } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'Tab' && e.type === 'keydown')
      e.preventDefault()
  },
})
const i = ref(0)
const shortcutsHandleEngine = () => {
  if (i.value <= searchEngineMap.length - 1) {
    engineName.value = searchEngineMap[i.value].name
    searchUrl.value = searchEngineMap[i.value].searchUrl
    i.value++
  }
  else {
    i.value = 0
    engineName.value = searchEngineMap[i.value].name
    searchUrl.value = searchEngineMap[i.value].searchUrl
    i.value++
  }
}

// mete+k or ctrl + k
whenever(tab, shortcutsHandleEngine)
// up and down
const { arrowdown } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'down' && e.type === 'keydown')
      e.preventDefault()
  },
})
whenever(arrowdown, () => {
  if (SearchKey.value.length)
    listIndex.value++
})
const { arrowup } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'up' && e.type === 'keydown')
      e.preventDefault()
  },
})
whenever(arrowup, () => {
  if (SearchKey.value.length)
    listIndex.value--
})
const { arrowright } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'right' && e.type === 'keydown')
      e.preventDefault()
  },
})
whenever(arrowright, () => {
  if (listIndex.value)
    window.open(`${SearchKey.value[listIndex.value - 1].searchUrl}${SearchKey.value[listIndex.value - 1].query}`)
})
const mouseIn = (item: any) => {
  listIndex.value = item.selectNum
}
watch(inputValue, () => {
  if (inputValue.value) {
    searchHistory.value = true
    // listIndex.value = 1
  }
  else {
    searchHistory.value = false
    listIndex.value = 1
  }
})
watch(listIndex, () => {
  if (listIndex.value > SearchKey.value.length)
    listIndex.value = 1
  if (listIndex.value < 1)
    listIndex.value = SearchKey.value.length
})
const clearRecent = () => {
  localStorage.clear()
  getItem()
  Norecent.value = true
}
const closeSearch = () => {
  searchHistory.value = false
}
</script>

<template>
  <section flex flex-col justify-center items-center class="h-1/3">
    <div w-full text-4xl font-bold font-mono mx-auto text-center dark:text-gray-200>
      <p pb-2 text-4xl md:text-4xl font-serif select-none>
        Aggr
      </p>
    </div>
    <section ref="recent" class="relative w-5/6 md:w-1/2 lg:w-2/5 2xl:w-1/4 " mb-20 mt-5>
      <div mx-auto>
        <div class="transition-all relative w-full flex flex-col justify-center">
          <i :class="engineName" />
          <input ref="inputDom" v-model="inputValue" class="pl-10 pr-10 rounded-lg focus:outline-none  focus:ring-2 focus:ring-black dark:focus:ring-gray-400 " transition-all ease-in-out dark:text-gray-200 dark:border-gray-400 dark:bg-dark-400 border-black w-full h-full p-2 border-2 tran type="text" :placeholder="dynamicPlaceHolder" @input="handleInput" @keyup.enter="handleSearch" @focus="inputFocus" @blur="inputBlur">
          <i v-show="inputValue" i-jam-chevron-right class="absolute translate-x-0 hover:translate-x-0.5 cursor-pointer right-2 text-2xl" dark:bg-gray-300 transition-all ease-in-out @click="handleSearch" />
          <i v-show="!inputValue" i-jam-chevron-right class="absolute bg-gray-300 right-2 text-2xl" dark:bg-gray-500 transition-all ease-in-out />
        </div>
      </div>
      <section v-show="searchHistory" class="transition-all w-5/6 md:w-1/2 lg:w-2/5 2xl:w-1/4 ">
        <div absolute mt-2 w-full border rounded-lg border-gray-200 dark:border-dark-100 transition-all ease-in-out>
          <div p-2 flex items-center justify-between ___>
            <span text-dark-100 dark:text-gray-200 text-xs transition-all ease-in-out>
              {{ t('recent.recent-title') }}
            </span>
            <i md:hidden cursor-pointer text-xs dark:text-gray-200 i-carbon-close @click="closeSearch" />
          </div>
          <hr ml-2 mr-2 dark:border-dark-100 transition-all ease-in-out>
          <div v-show="Norecent" flex justify-center text-xs items-center w-full h-24 dark:text-gray-200 transition-all ease-in-out>
            {{ t('recent.recent-noRecent') }}
          </div>
          <div v-for="item in SearchKey" :key="item.engine" p-2>
            <p transition-all ease-in-out overflow-x-hidden flex items-center text-sm text-dark-100 dark:text-gray-200 rounded :class="{ active: listIndex === item.selectNum }" cursor-pointer p-1 @mouseover="mouseIn(item)" @click="historySearch(item)">
              <i pr-4 pl-2 text-sm :class="item.engine" /> <span ml-5 mr-2>{{ item.query }}</span>
              <i :class="{ arrowActive: listIndex === item.selectNum }" />
            </p>
          </div>
          <hr mr-2 ml-2 dark:border-dark-100 transition-all ease-in-out>
          <div flex items-center justify-between pl-2 pr-2 dark:text-gray-200 transition-all ease-in-out>
            <div p-2 items-center justify-between hidden md:flex>
              <div flex items-center pr-2>
                <i border-black text-xs i-carbon-arrow-up />
                <i border-black text-xs i-carbon-arrow-down />
                <span text-xs pl-2>
                  {{ t('recent.recent-navigate') }}
                </span>
              </div>
              <div flex items-center pl-2 pr-2>
                <i border-black text-xs i-carbon-arrow-right />
                <span text-xs pl-2>
                  {{ t('recent.recent-open') }}
                </span>
              </div>
              <div flex items-center text-xs pl-2 pr-2>
                <p pt-0.5 pb-0.5 pr-1 pl-1 rounded-sm text-xs border border-black dark:border-gray-200>
                  Esc
                </p>
                <p pl-2>
                  {{ t('recent.recent-Close') }}
                </p>
              </div>
            </div>
            <div flex items-center>
              <span pt-2 pb-2 md:p-0 cursor-pointer text-dark-100 dark:text-gray-200 text-xs @click="clearRecent">
                {{ t('recent.recent-clear') }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<style lang="postcss">
.url{
@apply absolute left-2 text-xl dark:bg-gray-200 i-carbon-earth
}
.github{
@apply absolute left-2 text-2xl dark:bg-gray-200 i-jam-github
}
.bing{
@apply absolute left-2 text-2xl dark:bg-gray-200 i-jam-bing
}
.baidu{
@apply absolute left-2 text-2xl dark:bg-gray-200 i-jam-baidu
}
.google{
@apply absolute left-2 text-2xl dark:bg-gray-200 i-jam-google
}
.npm{
@apply absolute left-2 text-2xl dark:bg-gray-200 i-jam-npm
}
.youtube{
@apply absolute left-2 text-2xl dark:bg-gray-200 i-jam-youtube
}
.yahoo{
@apply absolute left-2 text-2xl dark:bg-gray-200 i-jam-yahoo
}
.stackoverflow{
@apply absolute left-2 text-2xl dark:bg-gray-200 i-jam-stackoverflow
}
.google{
@apply absolute left-2 text-2xl dark:bg-gray-200 i-jam-google
}
.codepen{
@apply absolute left-2 text-2xl dark:bg-gray-200 i-jam-codepen
}
.instagram{
@apply absolute left-2 text-2xl dark:bg-gray-200 i-jam-instagram
  }
.active{
@apply transition-all ease-in-out md:bg-gray-200 md:dark:bg-dark-100 !important

}
.arrowActive{
@apply transition-all  absolute right-5 i-carbon-arrow-right
}
</style>
