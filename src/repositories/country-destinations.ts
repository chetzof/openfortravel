import {
  destinationDefaults,
  DestinationStatus,
  getOriginDestinations,
  PlainDestination,
  PlainDestinationCollection,
} from 'src/api/destinations'
import { getCountryCodes as getAllCountryCodes } from 'src/misc/i18n-country-list'

export type GroupedDestinations<T = PlainDestination> = {
  [key in DestinationStatus]?: T[]
}

function generateFallbackDestinations(
  realDestinations: PlainDestination[],
  originCode: string,
): PlainDestination[] {
  const realCountryCodes = getCountryCodes(realDestinations)
  const fallbackDestinations: PlainDestination[] = []

  for (const countryCode of getAllCountryCodes()) {
    if (realCountryCodes.includes(countryCode) || originCode === countryCode) {
      continue
    }

    fallbackDestinations.push(
      Object.assign({}, destinationDefaults, { countryCode }),
    )
  }
  return fallbackDestinations
}

function getCountryCodes(destinations: PlainDestinationCollection): string[] {
  return destinations.map((destination) => destination.countryCode)
}

function groupByStatus<T extends PlainDestination>(
  destinations: T[],
): GroupedDestinations<T> {
  const allStatuses = Object.values(DestinationStatus)
  return Object.assign(
    {},
    ...allStatuses.map((status) => ({
      [status]: destinations.filter(
        (destination) => destination.status === status,
      ),
    })),
  ) as GroupedDestinations<T>
}

export async function generateDestinationList(
  countryCode: string,
): Promise<PlainDestination[]> {
  const realDestinations = await getOriginDestinations(countryCode)
  const fallbackDestinations = generateFallbackDestinations(
    realDestinations,
    countryCode,
  )
  return realDestinations.concat(fallbackDestinations)
}

export async function generateGroupedDestinationList(
  countryCode: string,
): Promise<GroupedDestinations> {
  const allDestinations = await generateDestinationList(countryCode)
  return groupByStatus(allDestinations)
}