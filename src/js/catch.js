export function fishCatch(fishType, bulletType) {
  let bulletRandom = Math.random()
  let fishRandom = Math.random()
  let bulletOk = bulletRandom < bulletType.chance
  let fishOk = fishRandom < fishType.chance
  let ifHiton = bulletOk || fishOk
  return ifHiton
}