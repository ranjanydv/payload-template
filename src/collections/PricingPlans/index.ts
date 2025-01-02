import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const PricingPlans: CollectionConfig = {
  slug: 'pricing-plans',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    group: 'Services',
    description: 'Pricing plans are the different pricing options for the services.',
    defaultColumns: ['title'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link',
      _sanitized: true,
      validate: (value: string) => {
        try {
          new URL(value)
          return true
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          return 'Please enter a valid URL'
        }
      },
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: false,
      required: true,
    },
    {
      name: 'price',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'monthlyPrice',
              type: 'number',
              required: true,
              admin: {
                width: '33%',
              },
            },
            {
              name: 'annualPrice',
              type: 'number',
              required: true,
              admin: {
                width: '33%',
              },
            },
            {
              name: 'triAnnualPrice',
              type: 'number',
              required: true,
              admin: {
                width: '33%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'features',
      label: 'Feature Category',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'feature',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'prefix',
              type: 'text',
              required: true,
            },
            {
              name: 'suffix',
              type: 'text',
              required: true,
            },
            {
              name: 'tooltip',
              type: 'textarea',
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
