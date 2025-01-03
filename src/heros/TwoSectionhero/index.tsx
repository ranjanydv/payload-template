import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'
import { CheckCheckIcon } from 'lucide-react'

export const TwoSectionHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  colorVariant,
  features = {
    alignment: 'column',
    variant: 'default',
    feature: [{ feature: 'Feature 1' }, { feature: 'Feature 2' }],
  },
}) => {
  return (
    <section
      className={cn(
        'flex justify-center items-center my-auto py-10 w-screen min-h-[65vh]',
        getColorClass(colorVariant),
      )}
    >
      <div className="flex-grow h-full container">
        <div className="flex md:flex-row flex-col md:gap-8 h-full">
          <div className="flex flex-col justify-center mb-8 md:mb-0 md:pr-[10%] w-full md:w-[55%]">
            {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex gap-4">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
            {Array.isArray(features.feature) && features.feature.length > 0 && (
              <ul
                className={cn(
                  'gap-4 mt-4',
                  features.alignment === 'row' ? 'grid grid-cols-2' : 'flex flex-col',
                )}
              >
                {features.feature.map(({ feature }, i) => {
                  return (
                    <li
                      key={i}
                      className={cn('flex items-center gap-2', {
                        'text-blue-500': features.variant === 'blue',
                        'text-green-500': features.variant === 'green',
                        'text-primary': features.variant === 'default',
                        'text-white': features.variant === 'white',
                      })}
                    >
                      <CheckCheckIcon
                        className={cn('w-4 h-4', {
                          'text-blue-500': features.variant === 'blue',
                          'text-green-500': features.variant === 'green',
                          'text-primary': features.variant === 'default',
                          'text-white': features.variant === 'white',
                        })}
                      />
                      {feature}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <div className="relative w-full md:w-[45%] h-full">
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
        </div>
      </div>
    </section>
  )

  function getColorClass(colorVariant: string) {
    switch (colorVariant) {
      case 'light':
        return 'bg-white text-primary'
      case 'dark':
        return 'bg-primary text-white'
      case 'gray':
        return 'bg-gradient-to-b from-gray-200 via-gray-100 to-gray-50 text-primary'
      case 'green':
        return 'bg-gradient-to-br from-green-950 via-green-800 to-green-700 text-white'
      case 'blue':
        return 'bg-gradient-to-br from-primary via-blue-800 to-blue-900 text-white'
    }
  }
}
