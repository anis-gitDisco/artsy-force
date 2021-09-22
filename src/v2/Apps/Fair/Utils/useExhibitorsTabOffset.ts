import { themeProps } from "@artsy/palette"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"

export const useExhibitorsTabOffset = () => {
  const {
    height: [mobileNavBarHeight, desktopNavBarHeight],
  } = useNavBarHeight()

  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)
  const stickyTabsHeight = 150

  const offset =
    (isMobile ? mobileNavBarHeight : desktopNavBarHeight) + stickyTabsHeight

  return offset
}
