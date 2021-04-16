import {
  PurchaseAppTestQueryRawResponse,
  PurchaseAppTestQueryResponse,
} from "v2/__generated__/PurchaseAppTestQuery.graphql"
import { UntouchedBuyOrder } from "v2/Apps/__tests__/Fixtures/Order"
import { SystemContextProvider } from "v2/Artsy"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import { HeadProvider } from "react-head"
import { graphql } from "react-relay"
import { PurchaseHistoryProps } from "../Components/PurchaseHistory"
import { PurchaseAppFragmentContainer } from "../PurchaseApp"
import { Pagination } from "@artsy/palette"

jest.unmock("react-relay")
jest.mock("v2/Components/Pagination/useComputeHref")

const pageInfo: PurchaseAppTestQueryRawResponse["me"]["orders"]["pageInfo"] = {
  endCursor: "MQ",
  hasNextPage: true,
  hasPreviousPage: false,
  startCursor: "NQ",
}

const pageCursors: PurchaseAppTestQueryRawResponse["me"]["orders"]["pageCursors"] = {
  around: [
    {
      cursor: "",
      isCurrent: true,
      page: 1,
    },
    {
      cursor: "NQ",
      isCurrent: false,
      page: 2,
    },
    {
      cursor: "MTA",
      isCurrent: false,
      page: 3,
    },
    {
      cursor: "MTU",
      isCurrent: false,
      page: 4,
    },
  ],
  first: null,
  last: {
    cursor: "MzA",
    isCurrent: false,
    page: 7,
  },
  previous: null,
}

const render = (me: PurchaseAppTestQueryRawResponse["me"], user: User) =>
  renderRelayTree({
    Component: (props: PurchaseAppTestQueryResponse) => (
      <PurchaseAppFragmentContainer
        me={{
          ...me,
        }}
        {...props}
      />
    ),
    mockData: {
      me,
    } as PurchaseAppTestQueryRawResponse,
    query: graphql`
      query PurchaseAppTestQuery @raw_response_type {
        me {
          ...PurchaseApp_me
        }
      }
    `,
    wrapper: children => (
      <MockBoot>
        <HeadProvider>
          <SystemContextProvider user={user}>{children}</SystemContextProvider>
        </HeadProvider>
      </MockBoot>
    ),
  })

describe("Purchase app", () => {
  const userType = { type: "User" }
  describe("A logged in use", () => {
    describe("having previous orders", () => {
      it("renders orders", async () => {
        // TODO: revisit mocking and remove `artist_names` alias from PurchseHistory
        const mockMe = {
          id: "34343267",
          name: "Moira Rose",
          orders: {
            edges: [{ node: UntouchedBuyOrder }],
            pageCursors,
            pageInfo,
          },
        }
        const component = await render(mockMe, userType)
        const text = component.text()
        expect(text).toContain(
          "pending•Track orderLisa BreslowGramercy Park SouthA Gallery New York, NYOrder No.abcdefgTotal$12,000Payment MethodN/AFulfillmentPickupMore infoNeed Help? Contact Us."
        )
      })
    })
    describe("with around pages", () => {
      it("renders pagination component", async () => {
        const mockMe = {
          id: "111",
          name: "Moira Rose",
          orders: {
            edges: [{ node: UntouchedBuyOrder }],
            pageCursors,
            pageInfo,
          },
        }
        const component = await render(mockMe, userType)

        const refetchSpy = jest.spyOn(
          (component.find("PurchaseHistory").props() as PurchaseHistoryProps)
            .relay,
          "refetch"
        )

        const pagination = component.find(Pagination)
        expect(pagination.length).toBe(1)
        expect(pagination.text()).toContain("1234…7")
        pagination.find("a").at(1).simulate("click")
        expect(refetchSpy).toHaveBeenCalledTimes(1)
        expect(refetchSpy.mock.calls[0][0]).toEqual(
          expect.objectContaining({ after: "NQ", first: 10 })
        )
      })
    })
    describe("without previous orders", () => {
      it("shows No orders", async () => {
        const mockMe = {
          id: "111",
          name: "Moira Rose",
          orders: { edges: [], pageCursors, pageInfo },
        }
        const component = await render(mockMe, userType)
        const text = component.text()
        expect(text).toContain("No Orders")
        const btn = component.find("Button")
        expect(btn.length).toBe(0)
      })
    })
  })
})
