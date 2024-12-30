import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText, layout }) => {
  return (
    <section className="px-10 py-10 w-screen">
      <div className="bg-card border border-border rounded-lg">
        <div className="mx-auto container">
          <div
            className={`flex flex-col gap-8 py-16 ${
              layout === 'center'
                ? 'md:flex-col md:items-center md:justify-center'
                : 'md:flex-row md:justify-between md:items-center'
            }`}
          >
            <div
              className={`${layout === 'center' ? 'text-center max-w-[48rem] mx-auto' : ''}  flex items-center`}
            >
              {richText && (
                <RichText className="mb-0 [&_h2]:text-2xl" data={richText} enableGutter={false} />
              )}
            </div>
            <div
              className={`flex  ${layout === 'center' ? 'items-center gap-4' : 'flex-col gap-8'}`}
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
