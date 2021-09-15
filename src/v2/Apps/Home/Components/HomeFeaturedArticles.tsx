import {
  Box,
  Image,
  Text,
  Spacer,
  Flex,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  GridColumns,
  Column,
  ResponsiveBox,
} from "@artsy/palette"
import { compact, take } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Masonry } from "v2/Components/Masonry"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useLazyLoadComponent } from "v2/Utils/Hooks/useLazyLoadComponent"
import { Media } from "v2/Utils/Responsive"
import { HomeFeaturedArticlesQuery } from "v2/__generated__/HomeFeaturedArticlesQuery.graphql"
import { HomeFeaturedArticles_articles } from "v2/__generated__/HomeFeaturedArticles_articles.graphql"

const ARTICLE_COUNT = 6

interface HomeFeaturedArticlesProps {
  articles: HomeFeaturedArticles_articles
}

const HomeFeaturedArticles: React.FC<HomeFeaturedArticlesProps> = ({
  articles,
}) => {
  const [firstArticle, ...restOfArticles] = articles
  const firstImage = firstArticle.thumbnailImage?.large
  const articlesList = take(restOfArticles, ARTICLE_COUNT)

  return (
    <HomeFeaturedArticlesContainer>
      <GridColumns>
        <Column span={[12, 6]} mb={[4, 0]}>
          <RouterLink
            key={firstArticle.internalID}
            to={firstArticle.href ?? ""}
            display="block"
            textDecoration="none"
          >
            {firstImage && (
              <ResponsiveBox
                aspectWidth={firstImage.width}
                aspectHeight={firstImage.height}
                maxWidth={firstImage.width}
              >
                <Image
                  src={firstImage.src}
                  srcSet={firstImage.srcSet}
                  lazyLoad={true}
                />
              </ResponsiveBox>
            )}

            <Text variant="xs" textTransform="uppercase" my={1}>
              {firstArticle.vertical}
            </Text>

            <Text variant="xl">{firstArticle.title}</Text>

            <Text variant="lg" mt={1}>
              By {firstArticle.author?.name}
            </Text>
          </RouterLink>
        </Column>

        <Column span={[12, 6]}>
          <Masonry columnCount={2}>
            {articlesList.map(article => {
              const image = article.thumbnailImage?.small

              return (
                <RouterLink
                  key={article.internalID}
                  to={article.href ?? ""}
                  display="block"
                  textDecoration="none"
                >
                  <Box mb={4}>
                    {image && (
                      <ResponsiveBox
                        aspectWidth={image.width}
                        aspectHeight={image.height}
                        maxWidth={image.width}
                      >
                        <Image
                          width="100%"
                          height="100%"
                          src={image.src}
                          srcSet={image.srcSet}
                          lazyLoad={true}
                        />
                      </ResponsiveBox>
                    )}

                    <Text variant="xs" textTransform="uppercase" my={1}>
                      {article.vertical}
                    </Text>

                    <Text variant="lg">{article.title}</Text>

                    <Text variant="md" mt={1}>
                      By {article.author?.name}
                    </Text>
                  </Box>
                </RouterLink>
              )
            })}
          </Masonry>
        </Column>
      </GridColumns>
    </HomeFeaturedArticlesContainer>
  )
}

const HomeFeaturedArticlesContainer: React.FC = ({ children }) => {
  return (
    <>
      <Flex justifyContent="space-between">
        <Text variant="xl">Market News</Text>

        <Text
          variant="sm"
          as={RouterLink}
          // @ts-ignore
          to="/articles"
        >
          Explore Editorial
        </Text>
      </Flex>

      <Spacer mt={4} />

      {children}
    </>
  )
}

export const HomeFeaturedArticlesFragmentContainer = createFragmentContainer(
  HomeFeaturedArticles,
  {
    articles: graphql`
      fragment HomeFeaturedArticles_articles on Article @relay(plural: true) {
        internalID
        href
        title
        publishedAt(format: "MMM D YYYY")
        vertical
        thumbnailTitle
        thumbnailImage {
          large: cropped(width: 670, height: 720) {
            width
            height
            src
            srcSet
          }

          small: cropped(width: 325, height: 240) {
            width
            height
            src
            srcSet
          }
        }
        author {
          name
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <Skeleton>
    <HomeFeaturedArticlesContainer>
      <GridColumns>
        <Column span={6}>
          <Media greaterThan="xs">
            <SkeletonBox bg="black30" height={720} mb={2} />
            <SkeletonText variant="xs" textTransform="uppercase" my={1}>
              Art Fairs
            </SkeletonText>

            <SkeletonText variant="xl">
              Essential Tips for Collecting Work by Anni and Josef Albers
            </SkeletonText>

            <SkeletonText variant="lg" mt={1}>
              By Artsy Editorial
            </SkeletonText>
          </Media>
        </Column>

        <Column span={[12, 6]}>
          <Masonry columnCount={[1, 2]}>
            {[...new Array(8)].map((_, i) => {
              return (
                <React.Fragment key={i}>
                  <Box mb={4}>
                    <Media at="xs">
                      <SkeletonBox
                        bg="black30"
                        width="100%"
                        height={300}
                        mb={1}
                      />
                    </Media>
                    <Media greaterThan="xs">
                      <ResponsiveBox
                        aspectWidth={325}
                        aspectHeight={280}
                        maxWidth={325}
                      >
                        <SkeletonBox
                          bg="black30"
                          height="100%"
                          width="100%"
                          mb={1}
                        />
                      </ResponsiveBox>
                    </Media>

                    <SkeletonText variant="xs" textTransform="uppercase" my={1}>
                      Art Fairs
                    </SkeletonText>

                    <SkeletonText variant="lg">
                      Essential Tips for Collecting Work by Anni and Josef
                      Albers
                    </SkeletonText>

                    <SkeletonText variant="md" mt={1}>
                      By Artsy Editorial
                    </SkeletonText>
                  </Box>
                </React.Fragment>
              )
            })}
          </Masonry>
        </Column>
      </GridColumns>
    </HomeFeaturedArticlesContainer>
  </Skeleton>
)

export const HomeFeaturedArticlesQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeFeaturedArticlesQuery>
      environment={relayEnvironment}
      query={graphql`
        query HomeFeaturedArticlesQuery {
          articles(featured: true, published: true, sort: PUBLISHED_AT_DESC) {
            ...HomeFeaturedArticles_articles
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        if (props.articles) {
          return (
            <HomeFeaturedArticlesFragmentContainer
              articles={compact(props.articles)}
            />
          )
        }

        return null
      }}
    />
  )
}

export const HomeFeaturedArticlesLazyQueryRenderer: React.FC = () => {
  const { Waypoint, isEnteredView } = useLazyLoadComponent()

  return (
    <>
      <Waypoint />

      {isEnteredView ? <HomeFeaturedArticlesQueryRenderer /> : PLACEHOLDER}
    </>
  )
}
