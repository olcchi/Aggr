export const isWin = () => /Win32|Windows /i.test(navigator.userAgent)

export const isMac = () => /Macintosh|MacIntel/i.test(navigator.userAgent)

// const userAgentData = navigator
// const { platform } = userAgentData
// const isWin = (platform === 'Win32') || (platform === 'Windows')
// const isMac = (platform === 'Mac68K') || (platform === 'MacPPC') || (platform === 'Macintosh') || (platform === 'MacIntel')
