import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    group: 'Services',
    description: 'Services are the main offerings of the company.',
    defaultColumns: ['title'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
  timestamps: true,
}
