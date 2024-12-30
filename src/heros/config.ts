import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          defaultValue: 'twoSection',
          label: 'Type',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'High Impact',
              value: 'highImpact',
            },
            {
              label: 'Medium Impact',
              value: 'mediumImpact',
            },
            {
              label: 'Low Impact',
              value: 'lowImpact',
            },
            {
              label: 'Two Section Hero',
              value: 'twoSection',
            },
          ],
          required: true,
          admin: {
            width: '50%',
            style: {
              alignSelf: 'flex-start',
            },
          },
        },
        {
          name: 'colorVariant',
          type: 'select',
          defaultValue: 'light',
          label: 'Color Variant',
          options: [
            {
              label: 'Light',
              value: 'light',
            },
            {
              label: 'Dark',
              value: 'dark',
            },
            {
              label: 'Gray',
              value: 'gray',
            },
            {
              label: 'Blue',
              value: 'blue',
            },
            {
              label: 'Green',
              value: 'green',
            },
          ],
          required: true,
          admin: {
            width: '50%',
            style: {
              alignSelf: 'flex-start',
            },
          },
        },
        {
          name: 'animation',
          type: 'checkbox',
          defaultValue: false,
          label: 'Animation',
        },
      ],
    },
    // {
    //   name: 'heading',
    //   type: 'text',
    //   label: 'Heading Text',
    //   required: true,
    //   admin: {
    //     placeholder: 'Enter your heading text here',
    //     condition: (_, siblingData) => siblingData.type === 'twoSectionHero',
    //   },
    // },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'twoSection'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
