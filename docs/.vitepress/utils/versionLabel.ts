/*
  文档站首页 tagline 的版本徽标：把 package.json 的 version 追加成 <samp class="tag-version">
  版本号由 docs/index.md 在构建期静态传入。早期实现另外走 GitHub API 远程拉取，首屏会多一次请求，
  离线或被限流时徽标直接消失，该分支已移除；徽标版本号与 package.json 的一致性由 `pnpm verify:docs` 守护
*/
export function setLabel(version: string) {
  const tagLineParagraph = document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline')
  const docsVersionSpan = document.createElement('samp')
  docsVersionSpan.classList.add('tag-version')
  docsVersionSpan.innerText = version
  tagLineParagraph?.appendChild(docsVersionSpan)
}
