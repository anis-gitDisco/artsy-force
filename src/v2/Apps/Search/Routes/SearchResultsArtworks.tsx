import React from "react"
import { SearchResultsArtworks_viewer } from "v2/__generated__/SearchResultsArtworks_viewer.graphql"
import { ZeroState } from "v2/Apps/Search/Components/ZeroState"
import { ArtworkFilter } from "v2/Components/ArtworkFilter"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "v2/System/Router/useRouter"
import {
  Counts,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"

interface SearchResultsRouteProps {
  viewer: SearchResultsArtworks_viewer
}

export const SearchResultsArtworksRoute: React.FC<SearchResultsRouteProps> = props => {
  const { match } = useRouter()
  const { viewer } = props
  const { sidebar } = viewer

  return (
    <ArtworkFilter
      mt={[0, "-1px"]}
      viewer={viewer}
      filters={match.location.query}
      onChange={updateUrl}
      ZeroState={ZeroState}
      aggregations={
        sidebar?.aggregations as SharedArtworkFilterContextProps["aggregations"]
      }
      counts={sidebar?.counts as Counts}
    />
  )
}

export const SearchResultsArtworksRouteFragmentContainer = createFragmentContainer(
  SearchResultsArtworksRoute,
  {
    viewer: graphql`
      fragment SearchResultsArtworks_viewer on Viewer
        @argumentDefinitions(
          input: { type: "FilterArtworksInput" }
          sidebarInput: { type: "FilterArtworksInput" }
          shouldFetchCounts: { type: "Boolean!", defaultValue: false }
        ) {
        sidebar: artworksConnection(first: 1, input: $sidebarInput) {
          counts @include(if: $shouldFetchCounts) {
            followedArtists
          }
          aggregations {
            slice
            counts {
              name
              value
              count
            }
          }
        }
        ...ArtworkFilter_viewer @arguments(input: $input)
      }
    `,
  }
)
