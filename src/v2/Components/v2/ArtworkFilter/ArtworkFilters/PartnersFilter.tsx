import { Checkbox, Flex, Toggle } from "@artsy/palette"
import { sortBy } from "lodash"
import React, { FC } from "react"

import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"
import { FacetAutosuggest } from "./FacetAutosuggest"
import { ShowMore } from "./ShowMore"

const PartnerOption: React.FC<{ name: string; slug: string }> = ({
  name,
  slug,
}) => {
  const { currentlySelectedFilters, setFilter } = useArtworkFilterContext()

  const togglePartnerSelection = (selected, slug) => {
    let partnerIDs = currentlySelectedFilters().partnerIDs.slice()
    if (selected) {
      partnerIDs.push(slug)
    } else {
      partnerIDs = partnerIDs.filter(item => item !== slug)
    }
    setFilter("partnerIDs", partnerIDs)
  }
  const selected = currentlySelectedFilters().partnerIDs.includes(slug)
  const props = {
    onSelect: selected => {
      togglePartnerSelection(selected, slug)
    },
    selected,
    key: name,
  }

  return (
    <Checkbox {...props}>
      <OptionText>{name}</OptionText>
    </Checkbox>
  )
}

export const PartnersFilter: FC = () => {
  const { aggregations } = useArtworkFilterContext()
  const partners = aggregations.find(agg => agg.slice === "PARTNER")

  if (!(partners && partners.counts)) {
    return null
  }

  const partnersSorted = sortBy(partners.counts, ["count"]).reverse()

  return (
    <Toggle label="Galleries and institutions" expanded>
      <Flex flexDirection="column">
        <FacetAutosuggest
          facetName="partnerIDs"
          placeholder="Enter a gallery"
          facets={partners.counts}
        />
        <ShowMore>
          {partnersSorted.map(({ name, value }) => {
            return <PartnerOption slug={value} key={name} name={name} />
          })}
        </ShowMore>
      </Flex>
    </Toggle>
  )
}
