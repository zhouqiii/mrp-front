const reqIsSucceed = (res: any) => {
  const passCodes = [200, 800] // 800 谷神接口正确状态
  return passCodes.includes(Number(res.code))
}
export { reqIsSucceed }
