import PropertyMobileClient from '@/components/property-mobile-client'

interface PropertyMobilePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PropertyMobilePage({ params }: PropertyMobilePageProps) {
  const resolvedParams = await params
  
  return <PropertyMobileClient propertyId={resolvedParams.id} />
}