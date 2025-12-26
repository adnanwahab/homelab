'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

const navigation = [
//   { name: 'Projects', href: '#', icon: FolderIcon, current: false },
//   { name: 'Deployments', href: '#', icon: ServerIcon, current: false },
//   { name: 'Activity', href: '#', icon: SignalIcon, current: false },
//   { name: 'Domains', href: '#', icon: GlobeAltIcon, current: false },
//   { name: 'Usage', href: '#', icon: ChartBarSquareIcon, current: false },
//   { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: true },
]
const teams = [
//   { id: 1, name: 'Planetaria', href: '#', initial: 'P', current: false },
//   { id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
//   { id: 3, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
]
const secondaryNavigation = [
//   { name: 'Account', href: '#', current: true },
//   { name: 'Notifications', href: '#', current: false },
//   { name: 'Billing', href: '#', current: false },
//   { name: 'Teams', href: '#', current: false },
//   { name: 'Integrations', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white dark:bg-gray-900">
        <body class="h-full">
        ```
      */}
        <div>Settings page</div>
    </>
  )
}