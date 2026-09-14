import Carousel from './Carousel.vue'
export type {
  Props as CarouselProps,
  Image as CarouselImage,
  EasingPreset as CarouselEasingPreset
} from './Carousel.vue'
import { withInstall } from '../utils/type'

export default withInstall(Carousel)
