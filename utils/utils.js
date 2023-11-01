export function formatTime(time) {
    const minutes = String(Math.floor(time/60)).padStart(1, '0')
    const seconds = String(Math.floor(time % 60)).padStart(2, '0')
    const formattedTime = `${minutes}:${seconds}`
    return formattedTime
  }

export function calculateCSS(twoHundredTime, fourHundredTime) {
    const twoHundredConversion = twoHundredTime.split(':').reduce((min, sec) => min * 60 + +sec, 0);
    const fourHundredConversion = fourHundredTime.split(':').reduce((min, sec) => min * 60 + +sec, 0);
    const calculatedCSS = ((fourHundredConversion - twoHundredConversion) / 2);
    return calculatedCSS
}

export function createPaces(rawCSS, scaler) {
    const paces = []
    for (let i=0; i<9; i+=2) {
      const paceMin = rawCSS*scaler[i]
      const paceMax = rawCSS*scaler[i+1]
      paces.push(`${formatTime(paceMin)}-${formatTime(paceMax)}`)
    }
    return paces
  }

export function createTableData(descriptions, paces) {
    const tableData = []
    for (let i=0; i< descriptions.length; i++) {
      tableData.push({
        zone: i+1,
        description: descriptions[i],
        pace: paces[i],
      })
    }
    return tableData
  }