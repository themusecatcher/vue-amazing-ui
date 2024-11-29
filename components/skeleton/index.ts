import type { App } from 'vue'
import Skeleton from './Skeleton.vue'
export type {
  Props,
  SkeletonParagraphProps,
  SkeletonTitleProps,
  SkeletonInputProps,
  SkeletonAvatarProps,
  SkeletonButtonProps
} from './Skeleton.vue'

// 使用 install 方法，在 app.use 挂载
Skeleton.install = (app: App) => {
  app.component(Skeleton.__name as string, Skeleton)
  return app
}

export default Skeleton
