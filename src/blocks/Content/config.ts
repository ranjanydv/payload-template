import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
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
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]
const twoSectionFields: Field[] = [
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
  {
    type: 'row',
    fields: [
      {
        name: 'imagePosition',
        label: 'Image Position',
        type: 'select',
        defaultValue: 'left',
        required: true,
        options: [
          {
            label: 'Left',
            value: 'left',
          },
          {
            label: 'Right',
            value: 'right',
          },
        ],
      },
    ],
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'sectionType',
          type: 'select',
          defaultValue: 'columnLayout',
          options: [
            { label: 'Column Layout', value: 'columnLayout' },
            { label: 'Two Section', value: 'twoSection' },
          ],
          admin: {
            width: '33%',
          },
        },
        {
          name: 'sectionWidth',
          label: 'Section Width',
          type: 'select',
          defaultValue: 'fullWidth',
          required: true,
          options: [
            {
              label: 'Full Width',
              value: 'fullWidth',
            },
            {
              label: 'Container',
              value: 'container',
            },
          ],
          admin: {
            width: '33%',
          },
        },
        {
          name: 'colorVariant',
          type: 'select',
          defaultValue: 'white',
          options: [
            { label: 'White', value: 'white' },
            { label: 'Grey', value: 'grey' },
            { label: 'Black', value: 'black' },
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
          ],
          admin: {
            width: '33%',
          },
        },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
        condition: (_, { sectionType }) => sectionType === 'columnLayout',
      },
      fields: columnFields,
    },
    {
      name: 'twoSection',
      type: 'group',
      label: 'Section Contents',
      admin: {
        condition: (_, { sectionType }) => sectionType === 'twoSection',
      },
      fields: twoSectionFields,
    },
  ],
}
