import { uniqueId } from 'lodash'

export interface ChildItem {
  id?: number | string
  name?: string
  icon?: any
  children?: ChildItem[]
  item?: any
  url?: any
  color?: string
}
export interface MenuItem {
  heading?: string
  name?: string
  icon?: any
  id?: number
  to?: string
  items?: MenuItem[]
  children?: ChildItem[]
  url?: any
}

const SidebarContent: MenuItem[] = [
  {
    heading: 'HOME',
    children: [
      {
        name: 'Dashboard',
        icon: 'lucide:layout-dashboard', 
        id: uniqueId(),
        url: '/'
      },
      {
        name: 'Trade (coming soon!!)',
        icon: 'lucide:trending-up', 
        id: uniqueId(),
        url: '/#'
      }
    ]
  },
  {
    heading: 'Info Stock',
    children: [
      {
        name: 'Seed',
        icon: 'mdi:seed-outline', // ikon biji-bijian
        id: uniqueId(),
        url: '/InfoStock/seeds'
      },
      {
        name: 'Event Shop',
        icon: 'mdi:party-popper', // ikon event
        id: uniqueId(),
        url: '/InfoStock/eventshop'
      },
      {
        name: 'Egg',
        icon: 'mdi:egg-outline', // ikon telur
        id: uniqueId(),
        url: '/InfoStock/eggs'
      },
      {
        name: 'Gear Shop',
        icon: 'mdi:tools', // ikon peralatan
        id: uniqueId(),
        url: '/InfoStock/gear'
      },
      {
        name: 'Cosmetics',
        icon: 'mdi:lipstick', // ikon kosmetik
        id: uniqueId(),
        url: '/InfoStock/cosmetics'
      },
      {
        name: 'Last Seen (Coming soon!!)',
        icon: 'mdi:history', // ikon histori
        id: uniqueId(),
        url: '#'
      }
    ]
  }
]

export default SidebarContent
