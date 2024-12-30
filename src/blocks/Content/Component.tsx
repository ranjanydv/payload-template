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
    <div className="gap-x-16 gap-y-8 grid grid-cols-4 lg:grid-cols-12 py-6 lg:py-16">
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
  )
}

// Two Section Layout Component
const TwoSectionLayout: React.FC<{
  twoSection: NonNullable<ContentBlockProps['twoSection']>
}> = ({ twoSection }) => {
  const { richText, media, imagePosition, enableLink, link } = twoSection

  return (
    <div className="flex md:flex-row flex-col gap-4 md:gap-8 py-2 h-full">
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
  )
}

// Main Content Block Component
export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { sectionType, columns, twoSection, colorVariant, sectionWidth } = props

  return (
    <section
      className={cn(sectionWidth === 'fullWidth' ? 'w-screen' : 'container my-16  px-4 lg:px-0')}
    >
      <div
        className={cn(
          sectionWidth === 'fullWidth' ? 'container ' : 'w-full px-4 lg:px-8 rounded-xl',
          'min-h-[45vh] flex items-center justify-center',
          getColorClass(colorVariant),
        )}
      >
        {sectionType === 'twoSection' && twoSection && <TwoSectionLayout twoSection={twoSection} />}
        {sectionType === 'columnLayout' && columns && <ColumnLayout columns={columns} />}
      </div>
    </section>
  )
}

// Utility function for color variants
function getColorClass(colorVariant: ContentBlockProps['colorVariant']) {
  switch (colorVariant) {
    case 'white':
      return 'bg-white text-primary dark:text-primary'
    case 'black':
      return 'bg-primary text-white dark:text-white'
    case 'grey':
      return 'bg-gradient-to-b from-gray-200 via-gray-100 to-gray-50 text-primary dark:text-primary'
    case 'green':
      return 'bg-gradient-to-br from-green-950 via-green-800 to-green-600 text-white dark:text-white'
    case 'blue':
      return 'bg-gradient-to-br from-primary via-blue-800 to-blue-900 text-white dark:text-white'
    default:
      return 'bg-white text-primary dark:text-primary'
  }
}
