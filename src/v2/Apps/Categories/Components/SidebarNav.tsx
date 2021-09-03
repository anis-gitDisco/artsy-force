import { Box, Link, Spacer, Text, themeProps } from "@artsy/palette"
import FrameAnimator from "desktop/components/frame_animator"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"
import { extractNodes } from "v2/Utils/extractNodes"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { SidebarNav_geneFamiliesConnection } from "v2/__generated__/SidebarNav_geneFamiliesConnection.graphql"

interface SidebarNavProps {
  geneFamiliesConnection: SidebarNav_geneFamiliesConnection
}

const SidebarNav: React.FC<SidebarNavProps> = props => {
  const { geneFamiliesConnection } = props
  const geneFamilies = extractNodes(geneFamiliesConnection)
  const { mobile, desktop } = useNavBarHeight()
  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)
  const navBarHeight = isMobile ? mobile : desktop

  const handleClick = e => {
    e.preventDefault()
    const id = e.currentTarget.hash
    const section = document.querySelector(id)
    const scroller = new FrameAnimator(
      val => {
        window.scrollTo(0, val)
      },
      {
        duration: 600,
        startValue: window.scrollY,
        endValue: section.offsetTop - navBarHeight,
        easing: "cubicInOut",
      }
    )
    scroller.start()
  }

  return (
    <Box>
      {geneFamilies.map(geneFamily => {
        return (
          <>
            <Link
              href={`#${geneFamily.slug}`}
              noUnderline={true}
              onClick={handleClick}
            >
              <Text variant="md">{geneFamily.name}</Text>
            </Link>
            <Spacer mt={1} />
          </>
        )
      })}
    </Box>
  )
}

export const SidebarNavFragmentContainer = createFragmentContainer(SidebarNav, {
  geneFamiliesConnection: graphql`
    fragment SidebarNav_geneFamiliesConnection on GeneFamilyConnection {
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
