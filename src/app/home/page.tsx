import ResponsiveLayout from '@/components/layout/responsive-layout'
import HomeDesktop from '@/components/desktop/home-desktop'
import HomeMobile from '@/components/mobile/home-mobile'

export default function HomePage() {
  return (
    <ResponsiveLayout
      mobileComponent={<HomeMobile />}
      desktopComponent={<HomeDesktop />}
    />
  )
}