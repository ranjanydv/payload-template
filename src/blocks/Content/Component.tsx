import React from 'react'
import { cn } from 'src/utilities/cn'
import RichText from '@/components/RichText'
import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'

// Column Layout Component
const ColumnLayout: React.FC<{
  columns: ContentBlockProps['columns']
}> = ({ columns }) => {
  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className={cn(' container')}>
      <div className="gap-x-16 gap-y-8 grid grid-cols-4 lg:grid-cols-12">
        {columns?.map((col, index) => {
          const { enableLink, link, richText, size } = col

          return (
            <div
              className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                'md:col-span-2': size !== 'full',
              })}
              key={index}
            >
              {richText && <RichText data={richText} enableGutter={false} />}
              {enableLink && link && <CMSLink {...link} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Two Section Layout Component
const TwoSectionLayout: React.FC<{
  twoSection: NonNullable<ContentBlockProps['twoSection']>
  sectionWidth: ContentBlockProps['sectionWidth']
}> = ({ twoSection, sectionWidth }) => {
  const { richText, media, imagePosition, enableLink, link } = twoSection

  return (
    <div className={cn(sectionWidth === 'fullWidth' ? 'container' : 'w-full px-1')}>
      <div className="flex md:flex-row flex-col md:gap-8 h-full">
        <div
          className={cn(
            'relative w-full md:w-[45%] h-full',
            imagePosition === 'right' ? 'lg:order-2 order-1' : 'order-1',
          )}
        >
          {media && typeof media === 'object' && (
            <div className="h-full aspect-[4/3] md:aspect-auto">
              <Media
                className="w-full h-full"
                imgClassName="w-full h-full object-cover object-center"
                priority
                resource={media}
              />
            </div>
          )}
        </div>
        <div
          className={cn(
            'flex flex-col justify-center mb-8 md:mb-0 md:pr-[10%] w-full md:w-[55%]',
            imagePosition === 'right' ? 'lg:order-1 order-1' : 'order-1',
          )}
        >
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {enableLink && link && (
            <div className="">
              <CMSLink {...link} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Main Content Block Component
export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { sectionType, columns, twoSection, colorVariant, sectionWidth } = props

  return (
    <section
      className={cn(
        sectionWidth === 'fullWidth' ? 'w-screen' : 'container my-16 rounded-xl shadow-sm',
        'min-h-[45vh] flex items-center justify-center',
        getColorClass(colorVariant),
      )}
    >
      {sectionType === 'twoSection' && twoSection && (
        <TwoSectionLayout twoSection={twoSection} sectionWidth={sectionWidth} />
      )}
      {sectionType === 'columnLayout' && columns && <ColumnLayout columns={columns} />}
    </section>
  )
}

// Utility function for color variants
function getColorClass(colorVariant: ContentBlockProps['colorVariant']) {
  switch (colorVariant) {
    case 'white':
      return 'bg-white text-primary'
    case 'black':
      return 'bg-primary text-white'
    case 'grey':
      return 'bg-gradient-to-b from-gray-200 via-gray-100 to-gray-50 text-primary'
    case 'green':
      return 'bg-gradient-to-br from-green-950 via-green-800 to-green-700 text-white'
    case 'blue':
      return 'bg-gradient-to-br from-primary via-blue-800 to-blue-900 text-white'
    default:
      return 'bg-white text-primary'
  }
}
