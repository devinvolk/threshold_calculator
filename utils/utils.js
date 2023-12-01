export function formatTime(time) {
    const minutes = String(Math.floor(time/60)).padStart(1, '0')
    const seconds = String(Math.floor(time % 60)).padStart(2, '0')
    const formattedTime = `${minutes}:${seconds}`
    return formattedTime
  }

export function formatRunTime(time) {
  const totalSeconds = Math.floor(time * 60)
  const minutesPart = Math.floor(totalSeconds / 60)
  const secondsPart = totalSeconds % 60
  const formattedMinutes = minutesPart.toString().padStart(2, '0')
  const formattedSeconds = secondsPart.toString().padStart(2, '0')
  return `${formattedMinutes}:${formattedSeconds}`
}

export function velocityConversion(criticalVelocity) {
  const milesPerSecond = criticalVelocity/1609.34
  const minPerMile = 1/(milesPerSecond*60)
  return minPerMile
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

export function createRunningPaces(criticalVelocity, scaler) {
  const paces = []
  for (let i = 0; i<9; i+=2) {
    const paceMin = velocityConversion(criticalVelocity*scaler[i])
    const paceMax = velocityConversion(criticalVelocity*scaler[i+1])
    paces.push(`${formatRunTime(paceMin)}-${formatRunTime(paceMax)}`)
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

export function createZones(cp, scaler) {
  const zones = []
  for (let i=0; i<11; i+=2){
    const zoneMin = cp*scaler[i]
    const zoneMax = cp*scaler[i+1]
    zones.push(`${zoneMin.toFixed(0)}-${zoneMax.toFixed(0)}`)
  }
  return zones
}