// 获取静态资源地址
export function getImageUrl(name: any): string {
  return new URL(`../assets/images/${name}.jpg`, import.meta.url).href
}
