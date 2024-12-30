import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'center',
          options: [
            {
              label: 'Center',
              value: 'center',
            },
            {
              label: 'Left',
              value: 'left',
            },
          ],
          admin: {
            width: '50%',
          },
        },
        {
          name: 'width',
          type: 'select',
          defaultValue: 'inline',
          options: [
            {
              label: 'Full Width',
              value: 'full-width',
            },
            {
              label: 'Inline',
              value: 'inline',
            },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },

    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 3,
      },
    }),
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
