import { mount } from "enzyme"
import React from "react"
import { InquiryLogin } from "../../Views/InquiryLogin"
import { login } from "v2/Utils/auth"
import { useArtworkInquiryRequest } from "../../Hooks/useArtworkInquiryRequest"
import { flushPromiseQueue } from "v2/DevTools"
import { useInquiryContext } from "../../Hooks/useInquiryContext"
import { fill } from "../util"

jest.mock("v2/Utils/auth")
jest.mock("../../Hooks/useArtworkInquiryRequest")
jest.mock("../../Hooks/useInquiryContext")
jest.mock("v2/Utils/wait", () => ({ wait: () => Promise.resolve() }))

describe("InquiryLogin", () => {
  const next = jest.fn()
  const submitArtworkInquiryRequest = jest.fn()

  beforeEach(() => {
    ;(useArtworkInquiryRequest as jest.Mock).mockImplementation(() => ({
      submitArtworkInquiryRequest,
    }))
    ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
      next,
      artworkID: "example",
      inquiry: { email: "example@example.com", message: "Hello world" },
      setRelayEnvironment: jest.fn(),
      engine: { decide: jest.fn().mockReturnValue(false) },
    }))
  })

  afterEach(() => {
    next.mockReset()
    submitArtworkInquiryRequest.mockReset()
  })

  it("renders correctly", () => {
    const wrapper = mount(<InquiryLogin />)

    expect(wrapper.html()).toContain(
      "We found an Artsy account associated with example@example.com."
    )
  })

  describe("without two-factor auth", () => {
    beforeEach(() => {
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.resolve({ user: { id: "id", access_token: "token" } })
      )
    })

    it("logs in and sends the message", async () => {
      const wrapper = mount(<InquiryLogin />)

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()

      // Enter password
      fill(wrapper, "password", "secret")

      // Submit form
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()

      expect(submitArtworkInquiryRequest).toBeCalledWith({
        artworkID: "example",
        contactGallery: true,
        message: "Hello world",
      })
      expect(next).toBeCalled()
    })
  })

  describe("with two-factor auth", () => {
    it("logs in and sends the message", async () => {
      const wrapper = mount(<InquiryLogin />)

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()

      // Enter password
      fill(wrapper, "password", "secret")

      // Login will error asking for 2fa code
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error("missing two-factor authentication code"))
      )

      // Submit form
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()
      wrapper.update()

      // Input two factor auth code
      fill(wrapper, "authenticationCode", "code")

      // Login works now
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.resolve({ user: { id: "id", access_token: "token" } })
      )

      // Submit form again
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()

      expect(submitArtworkInquiryRequest).toBeCalled()
      expect(next).toBeCalled()
    })
  })
})
