import { AuthContextModule, clickedArtworkGroup } from "@artsy/cohesion"
import { Box, Shelf, Spacer, Sup, Text } from "@artsy/palette"
import { graphql } from "lib/graphql"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { useTracking } from "react-tracking"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { useAnalyticsContext } from "v2/System"
import { extractNodes } from "v2/Utils/extractNodes"
import { StandoutLots_viewer } from "v2/__generated__/StandoutLots_viewer.graphql"
import { tabTypeToContextModuleMap } from "../../Utils/tabTypeToContextModuleMap"

export interface StandoutLotsProps {
  viewer: StandoutLots_viewer
}

const StandoutLots: React.FC<StandoutLotsProps> = ({ viewer }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()
  const contextModule = tabTypeToContextModuleMap.standoutLots as AuthContextModule

  const nodes = extractNodes(viewer.standoutLotsConnection)

  if (nodes.length === 0) {
    return (
      <Box>
        <Text
          as="h3"
          color="black60"
          mb={12}
          mt={6}
          textAlign="center"
          variant="mediumText"
        >
          No Works To Show
        </Text>
      </Box>
    )
  }

  return (
    <>
      <Text as="h3" variant="lg" color="black100" mt={6}>
        Standout Lots{" "}
        <Sup color="brand">{viewer.standoutLotsConnection?.edges?.length}</Sup>
      </Text>

      <Text as="h3" variant="lg" color="black60">
        Works that Artsy curators love
      </Text>

      <Spacer mb={4} />

      <Shelf>
        {nodes.map((node, index) => {
          return (
            <ShelfArtworkFragmentContainer
              artwork={node}
              key={node.slug}
              contextModule={contextModule}
              hidePartnerName
              lazyLoad
              onClick={() => {
                trackEvent(
                  clickedArtworkGroup({
                    contextModule,
                    contextPageOwnerType: contextPageOwnerType!,
                    artworkID: node.internalID,
                    artworkSlug: node.slug,
                    horizontalSlidePosition: index,
                  })
                )
              }}
            />
          )
        })}
      </Shelf>
    </>
  )
}

export const StandoutLotsFragmentContainer = createFragmentContainer(
  StandoutLots,
  {
    viewer: graphql`
      fragment StandoutLots_viewer on Viewer {
        standoutLotsConnection: saleArtworksConnection(
          first: 50
          geneIDs: "highlights-at-auction"
        ) {
          edges {
            node {
              internalID
              slug
              ...ShelfArtwork_artwork @arguments(width: 325)
            }
          }
        }
      }
    `,
  }
)
