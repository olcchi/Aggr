export interface SearchEngine {
  name: string
  abbr: string[]
  type: 'default' | 'engine' | 'website' | 'video'
  searchUrl: string
}
export const searchEngineMap: SearchEngine[] = [
  {
    name: 'url',
    abbr: ['u', 'url'],
    type: 'default',
    searchUrl: 'https://',
  },
  {
    name: 'baidu',
    abbr: ['bd'],
    type: 'engine',
    searchUrl: 'https://baidu.com/s?wd=',
  },
  {
    name: 'google',
    abbr: ['gg'],
    type: 'engine',
    searchUrl: 'https://google.com/search?q=',
  },
  {
    name: 'bing',
    abbr: ['bi'],
    type: 'engine',
    searchUrl: 'https://www.bing.com/search?q=',
  },
  {
    name: 'yahoo',
    abbr: ['yh'],
    type: 'engine',
    searchUrl: 'https://search.yahoo.com/search?q=',
  },
  {
    name: 'github',
    abbr: ['gh'],
    type: 'website',
    searchUrl: 'https://github.com/search?q=',
  },
  {
    name: 'stackoverflow',
    abbr: ['so', 'sof'],
    type: 'website',
    searchUrl: 'https://stackoverflow.com/search?q=',
  },
  {
    name: 'npm',
    abbr: ['n'],
    type: 'website',
    searchUrl: 'https://www.npmjs.com/search?q=',
  },
  // {
  //   name: 'caniuse',
  //   abbr: ['c', 'ciu'],
  //   type: 'website',
  //   searchUrl: 'https://caniuse.com/?search=',
  // },
  {
    name: 'codepen',
    abbr: ['cp'],
    type: 'website',
    searchUrl: 'https://codepen.io/search/pens?q=',
  },
  {
    name: 'youtube',
    abbr: ['yt'],
    type: 'video',
    searchUrl: 'https://www.youtube.com/results?search_query=v',
  },
  // {
  //   name: 'bilibili',
  //   abbr: ['bb'],
  //   type: 'video',
  //   searchUrl: 'https://search.bilibili.com/all?keyword=',
  // },
  {
    name: 'instagram',
    abbr: ['ins'],
    type: 'video',
    searchUrl: 'https://www.instagram.com/',
  },
]
