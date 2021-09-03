import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "v2/Components/MetaTags"
import { CategoriesIntro } from "./Components/CategoriesIntro"
import { GeneFamiliesFragmentContainer } from "./Components/GeneFamilies"
import { CategoriesApp_geneFamiliesConnection } from "v2/__generated__/CategoriesApp_geneFamiliesConnection.graphql"
import { SidebarNavFragmentContainer } from "./Components/SidebarNav"
import { Flex } from "@artsy/palette"

interface CategoriesAppProps {
  geneFamiliesConnection: CategoriesApp_geneFamiliesConnection
}

const CategoriesApp: React.FC<CategoriesAppProps> = props => {
  const { geneFamiliesConnection } = props
  return (
    <>
      <MetaTags pathname="categories" />
      <CategoriesIntro />
      <Flex flexDirection="row">
        <SidebarNavFragmentContainer
          geneFamiliesConnection={geneFamiliesConnection}
        />
        <GeneFamiliesFragmentContainer
          geneFamiliesConnection={geneFamiliesConnection}
        />
      </Flex>
    </>
  )
}

export const CategoriesAppFragmentContainer = createFragmentContainer(
  CategoriesApp,
  {
    geneFamiliesConnection: graphql`
      fragment CategoriesApp_geneFamiliesConnection on GeneFamilyConnection {
        ...SidebarNav_geneFamiliesConnection
        ...GeneFamilies_geneFamiliesConnection
      }
    `,
  }
)
