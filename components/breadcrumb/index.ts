import Breadcrumb from './Breadcrumb.vue'
export type {
  Props as BreadcrumbProps,
  Route as BreadcrumbRoute,
  Query as BreadcrumbRouteQuery
} from './Breadcrumb.vue'
import { withInstall } from '../utils/type'

export default withInstall(Breadcrumb)
