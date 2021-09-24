import { commitMutation, graphql } from "relay-runtime"
import { useTracking } from "v2/System"
import {
  SubmitInquiryRequestMutationInput,
  useArtworkInquiryRequestMutation,
} from "v2/__generated__/useArtworkInquiryRequestMutation.graphql"
import { useInquiryContext } from "./useInquiryContext"

type UseArtworkInquiryRequestInput = Omit<
  SubmitInquiryRequestMutationInput,
  "inquireableID" | "inquireableType" | "message"
> & {
  artworkID: string
  message: string
  contactGallery?: boolean | null
}

export const useArtworkInquiryRequest = () => {
  const { relayEnvironment } = useInquiryContext()

  const { trackEvent } = useTracking()

  const submitArtworkInquiryRequest = ({
    artworkID,
    ...rest
  }: UseArtworkInquiryRequestInput) => {
    return new Promise((resolve, reject) => {
      commitMutation<useArtworkInquiryRequestMutation>(
        relayEnvironment.current!,
        {
          onCompleted: (res, errors) => {
            if (errors !== null) {
              reject(errors)
              return
            }

            resolve(res)

            const inquiry = res.submitInquiryRequestMutation?.inquiryRequest!
            const artwork = inquiry.inquireable!

            // TODO: https://github.com/artsy/cohesion/pull/238
            const options = {
              artwork_id: artwork.internalID,
              artwork_slug: artwork.slug,
              inquiry_id: inquiry.internalID,
              products: [
                {
                  price: artwork.price,
                  product_id: artwork.internalID,
                  quantity: 1,
                },
              ],
            }

            trackEvent(options)
          },
          mutation: graphql`
            mutation useArtworkInquiryRequestMutation(
              $input: SubmitInquiryRequestMutationInput!
            ) {
              submitInquiryRequestMutation(input: $input) {
                clientMutationId
                inquiryRequest {
                  internalID
                  inquireable {
                    ... on Artwork {
                      internalID
                      slug
                      price
                    }
                  }
                }
              }
            }
          `,
          variables: {
            input: {
              inquireableID: artworkID,
              inquireableType: "Artwork",
              ...rest,
            },
          },
        }
      )
    })
  }

  return { submitArtworkInquiryRequest }
}
