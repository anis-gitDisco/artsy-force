import { Button, Skeleton, SkeletonText, Spacer, Text } from "@artsy/palette"
import React, { useState, useEffect } from "react"
import { useInquiryContext } from "../Hooks/useInquiryContext"
import { resetPassword } from "v2/Utils/auth"
import { useInquiryAccountContext, Screen } from "./InquiryAccount"
import { useTracking } from "v2/System"
import {
  ActionType,
  AuthModalType,
  Intent,
  ResetYourPassword,
} from "@artsy/cohesion"

enum Mode {
  Resetting,
  Error,
  Done,
}

export const InquiryResetPassword: React.FC = () => {
  const { inquiry } = useInquiryContext()
  const { navigateTo } = useInquiryAccountContext()

  const [mode, setMode] = useState<Mode>(Mode.Resetting)

  const { trackEvent } = useTracking()

  useEffect(() => {
    const init = async () => {
      try {
        await resetPassword({ email: inquiry.email! })
        setMode(Mode.Done)

        // @ts-ignore
        const options: ResetYourPassword = {
          action: ActionType.resetYourPassword,
          // auth_redirect: string, // TODO: Should be optional
          // context_module: ContextModule.inquiry, // TODO: Needs to be added to ContextModule/AuthContextModule
          intent: Intent.inquire,
          service: "email",
          trigger: "click",
          type: AuthModalType.forgot,
        }

        trackEvent(options)
      } catch (err) {
        setMode(Mode.Error)
      }
    }

    init()
  }, [inquiry.email])

  const handleClick = () => {
    navigateTo(Screen.Login)
  }

  const message = {
    [Mode.Resetting]: `Please check your email (${inquiry.email}) for instructions on how to reset your password.`,
    [Mode.Done]: `Please check your email (${inquiry.email}) for instructions on how to reset your password.`,
    [Mode.Error]: "There was an error resetting your password.",
  }[mode]

  return (
    <>
      {mode === Mode.Resetting ? (
        <Skeleton>
          <SkeletonText variant="lg" mr={4}>
            {message}
          </SkeletonText>
        </Skeleton>
      ) : (
        <Text variant="lg" mr={4}>
          {message}
        </Text>
      )}

      <Spacer mt={2} />

      <Button
        display="block"
        width="100%"
        variant="secondaryOutline"
        onClick={handleClick}
      >
        Login
      </Button>
    </>
  )
}
