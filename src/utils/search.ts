import { searchEngineMap } from './searchEngine'
import type { SearchEngine } from './searchEngine'

export const getEngineSymbol = (str: string): string => {
  const firstSpacePos = str.replace(/(^\s*)/g, '').indexOf(' ')
  return str.substring(0, firstSpacePos)
}

export const getEngineObj = (abbr: string): SearchEngine | undefined => {
  return searchEngineMap.find(item => item.abbr.includes(abbr) || item.name === abbr)
}

export const getQuery = (str: string, abbr: string): string => {
  return str.substring(abbr.length).trim().replace(/\s+/g, '+')
}
