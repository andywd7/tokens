export const removePx = str => {
  return str.replace(new RegExp("px", "gi"), "")
}

export const rems = (px, base = 16) => {
  const value = removePx(px) / base + "rem"
  return value
}
