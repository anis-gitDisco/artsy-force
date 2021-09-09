import {
  Link,
  Pill,
  Spacer,
  themeProps,
  Swiper,
  SwiperCell,
  SwiperRail,
  SwiperCellProps,
  SwiperRailProps,
} from "@artsy/palette"
import FrameAnimator from "desktop/components/frame_animator"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"
import { extractNodes } from "v2/Utils/extractNodes"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { StickyNav_geneFamiliesConnection } from "v2/__generated__/StickyNav_geneFamiliesConnection.graphql"
interface StickyNavProps {
  geneFamiliesConnection: StickyNav_geneFamiliesConnection
}

const StickyNav: React.FC<StickyNavProps> = props => {
  const { geneFamiliesConnection } = props
  const geneFamilies = extractNodes(geneFamiliesConnection)
  const { mobile, desktop } = useNavBarHeight()
  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)
  const navBarHeight = isMobile ? mobile : desktop
  const stickyNavHeight = 50

  const handleClick = e => {
    e.preventDefault()
    const id = e.currentTarget.hash
    const section = document.querySelector(id)
    console.log(section.offsetTop)
    const scroller = new FrameAnimator(
      val => {
        window.scrollTo(0, val)
      },
      {
        duration: 600,
        startValue: window.scrollY,
        endValue: section.offsetTop - navBarHeight - stickyNavHeight - 20,
        easing: "cubicInOut",
      }
    )
    scroller.start()
  }

  return (
    <>
      <Spacer pb={1} />
      <Swiper Cell={Cell} Rail={Rail}>
        {geneFamilies.map(geneFamily => {
          return (
            <Link
              href={`#${geneFamily.slug}`}
              noUnderline={true}
              onClick={handleClick}
              key={geneFamily.slug}
            >
              <Pill>{geneFamily.name}</Pill>
            </Link>
          )
        })}
      </Swiper>
      <Spacer pb={1} />
    </>
  )
}

const Cell: React.ForwardRefExoticComponent<SwiperCellProps> = React.forwardRef(
  (props, ref) => {
    return (
      <SwiperCell
        {...props}
        ref={ref as any}
        display="inline-flex"
        verticalAlign="top"
        pr={1}
      />
    )
  }
)

const Rail: React.FC<SwiperRailProps> = props => {
  return <SwiperRail {...props} display="block" />
}

export const StickyNavFragmentContainer = createFragmentContainer(StickyNav, {
  geneFamiliesConnection: graphql`
    fragment StickyNav_geneFamiliesConnection on GeneFamilyConnection {
      edges {
        node {
          internalID
          slug
          name
        }
      }
    }
  `,
})
