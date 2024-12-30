import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/cn'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText, layout, width }) => {
  return (
    <section
      className={cn(
        width === 'full-width' ? 'w-screen px-4 lg:px-10' : 'container px-4 lg:px-0',
        'py-10',
      )}
    >
      <div className="flex justify-center items-center bg-card px-4 lg:px-10 py-10 border border-border rounded-lg min-h-[25vh]">
        <div className="mx-auto container">
          <div
            className={`flex flex-col gap-8 py-6 lg:py-16 ${
              layout === 'center'
                ? 'md:flex-col md:items-center md:justify-center'
                : 'md:flex-row md:justify-between md:items-center'
            }`}
          >
            <div
              className={`${layout === 'center' ? 'text-center max-w-[48rem] mx-auto' : 'lg:max-w-[70%] text-center lg:text-left'}  flex items-center `}
            >
              {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
            </div>
            <div
              className={`flex gap-4 ${layout === 'center' ? 'items-center justify-center' : 'flex-row lg:flex-col items-center justify-center'} flex-wrap`}
            >
              {(links || []).map(({ link }, i) => {
                return <CMSLink key={i} size="lg" {...link} />
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
