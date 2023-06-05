export function fetchReleaseTag() {
  // vite中文版远程获取 github release tag
  // return fetch('https://api.github.com/repos/vitejs/docs-cn/releases/latest')
  // 远程读取 github 仓库中 package.json 文件中的 version 版本号
  // 方式一：
  // 读取规则：https://api.github.com/repos/<username>/<repo>/contents/<file>?ref=<branch 可选，默认master>
  // return fetch('https://api.github.com/repos/themusecatcher/vue-amazing-ui/contents/package.json?ref=master', {
  //   headers: {
  //     // See https://docs.github.com/en/rest/overview/media-types
  //     Accept: 'application/vnd.github.v3.raw',
  //     // See https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#authentication
  //     // Authorization: 'token ${GITHUB_TOKEN}',
  //   }
  // })
  // 方式二：
  // 读取规则：https://raw.githubusercontent.com/<username>>/<repo>/<branch>/<file>
  return fetch('https://raw.githubusercontent.com/themusecatcher/vue-amazing-ui/master/package.json')
    .then(res => res.json())
    .then(json => json.version ?? '')
    .then(releaseTag => {
      if (!releaseTag) return
      const tagLineParagragh = document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline')
      const docsReleaseTagSpan = document.createElement('samp')
      docsReleaseTagSpan.classList.add('release-tag')
      docsReleaseTagSpan.innerText = releaseTag
      tagLineParagragh?.appendChild(docsReleaseTagSpan)
    })
}
