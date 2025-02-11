/*
  远程读取 github 仓库中 package.json 文件中的 version 版本号
  方式一：
  读取规则：https://api.github.com/repos/<username>/<repo>/contents/<file>?ref=<branch 可选，默认main>
  return fetch('https://api.github.com/repos/themusecatcher/vue-amazing-ui/contents/package.json?ref=main', {
    headers: {
      // See https://docs.github.com/en/rest/overview/media-types
      Accept: 'application/vnd.github.v3.raw',
      // See https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#authentication
      // Authorization: 'token ${GITHUB_TOKEN}',
    }
  })
  方式二：
  读取规则：https://raw.githubusercontent.com/<username>/<repo>/<branch>/<file>
  return fetch('https://raw.githubusercontent.com/themusecatcher/vue-amazing-ui/main/package.json')
*/
export function fetchVersion() {
  return fetch('https://api.github.com/repos/themusecatcher/vue-amazing-ui/contents/package.json?ref=main', {
    headers: {
      // See https://docs.github.com/en/rest/overview/media-types
      Accept: 'application/vnd.github.v3.raw'
      // See https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#authentication
      // Authorization: 'token ${GITHUB_TOKEN}',
    }
  })
    .then((res) => res.json())
    .then((json) => json.version ?? '')
    .then((version) => {
      if (!version) return
      setLabel(version)
    })
}
export function setLabel(version: string) {
  const tagLineParagragh = document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline')
  const docsVersionSpan = document.createElement('samp')
  docsVersionSpan.classList.add('tag-version')
  docsVersionSpan.innerText = version
  tagLineParagragh?.appendChild(docsVersionSpan)
}